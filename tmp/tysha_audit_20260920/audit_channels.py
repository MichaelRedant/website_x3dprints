from pathlib import Path
import ast,json
import numpy as np
import trimesh
from shapely.geometry import Polygon,GeometryCollection,LineString
from shapely.ops import unary_union
from shapely import affinity
from PIL import Image,ImageDraw,ImageFont
import audit_inventory as inv

OUT=Path(__file__).parent
ROOT=inv.ROOT

def parts(p):
    return [p] if p.geom_type=='Polygon' else [x for x in getattr(p,'geoms',[]) if x.geom_type=='Polygon']

def section(mesh,z):
    s=mesh.section(plane_origin=[0,0,z],plane_normal=[0,0,1])
    if s is None:return GeometryCollection()
    result=GeometryCollection()
    for d in s.discrete:
        if np.linalg.norm(d[0]-d[-1])>1e-5: raise ValueError('open section')
        poly=Polygon(d[:,:2]).buffer(0)
        result=result.symmetric_difference(poly)
    return result.buffer(0)

def normalized(m):
    m=m.copy();m.apply_translation(-m.bounds[0]);return m

def radius(g):
    lo,hi=0.0,30.0
    for _ in range(18):
        mid=(lo+hi)/2
        if g.buffer(-mid).is_empty:hi=mid
        else:lo=mid
    return lo

def describe(g):
    return [{'area':round(p.area,2),'bounds':list(np.round(p.bounds,3)),
             'largest_circle_d':round(radius(p)*2,3)} for p in sorted(parts(g),key=lambda p:-p.area) if p.area>.02]

def poly_draw(draw,g,origin,scale,height,color):
    def conv(coords):return [(origin[0]+x*scale,origin[1]+height-y*scale) for x,y in coords]
    mask=Image.new('L',draw._image.size,0);md=ImageDraw.Draw(mask)
    for p in parts(g):
        md.polygon(conv(p.exterior.coords),fill=255)
        for h in p.interiors:md.polygon(conv(h.coords),fill=0)
    draw._image.paste(color,mask=mask)

def main():
    report={}; allshapes={}
    for ch in 'TYSHA':
        b=normalized(trimesh.load_mesh(ROOT/'stl'/f'tysha_{ch}_body.stl'))
        f=normalized(trimesh.load_mesh(ROOT/'stl'/f'tysha_{ch}_front.stl'))
        silhouette=section(f,0.9);solid=section(b,10);free=silhouette.difference(solid)
        profiles={}
        for z in [0.5,2,10,21,22.7,23.5,25,27,28.5,29.8]:
            cross=section(b,z);profiles[str(z)]={'solid_area':round(cross.area,3),'free':describe(silhouette.difference(cross))}
        report[ch]={'contour_area':silhouette.area,'free':describe(free),'sections':profiles}
        allshapes[ch]=(silhouette,free)
    for name,path in [('S_3mf',ROOT/'stl/TYSHA_S_bak_H2S.3mf'),('Lijn1',ROOT/'files/TYSHA_lijn1_bak_H2S.3mf'),('Lijn2',ROOT/'files/TYSHA_lijn2_bak_H2S.3mf'),('Lijn3',ROOT/'files/TYSHA_lijn3_bak_H2S.3mf')]:
        info=inv.load_3mf(path)
        key=next(k for k in inv.meshes if k.startswith(str(path.relative_to(ROOT))+'::'))
        b=normalized(inv.meshes[key]);
        if name=='S_3mf': f=normalized(trimesh.load_mesh(ROOT/'stl/tysha_S_front.stl'))
        else:
            i=name[-1]; fp=ROOT/f'files/TYSHA_lijn{i}_front_H2S.3mf'
            inv.load_3mf(fp);f=normalized(inv.meshes[next(k for k in inv.meshes if k.startswith(str(fp.relative_to(ROOT))+'::'))])
        silhouette=section(f,.9); solid=section(b,10);free=silhouette.difference(solid)
        profiles={}
        for z in [.5,1.5,2,10,25,27.9]:
            cross=section(b,z);profiles[str(z)]={'solid_area':round(cross.area,3),'free':describe(silhouette.difference(cross))}
        report[name]={'contour_area':silhouette.area,'free':describe(free),'sections':profiles}
        allshapes[name]=(silhouette,free)
    # Read embedded contour data without executing the supplied generator.
    tree=ast.parse((ROOT/'tysha_letterbak_generator.py').read_text(encoding='utf-8'))
    data=None
    for n in tree.body:
        if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='LETTERDATA' for t in n.targets):
            data=json.loads(ast.literal_eval(n.value.args[0]))
    contours={ch:Polygon(v['exterior'],v['interiors']) for ch,v in data.items()}
    combined=unary_union(list(contours.values()))
    report['word']={'bounds':list(combined.bounds),'size':[combined.bounds[2]-combined.bounds[0],combined.bounds[3]-combined.bounds[1]],'stl_contour_difference':{}}
    for ch,p in contours.items():
        p=affinity.translate(p,xoff=-p.bounds[0],yoff=-p.bounds[1])
        silhouette=allshapes[ch][0]
        report['word']['stl_contour_difference'][ch]=p.symmetric_difference(silhouette).area
    (OUT/'channels.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',21)
    small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',17)
    title=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',30)
    im=Image.new('RGB',(1720,1230),'white');d=ImageDraw.Draw(im)
    d.text((30,20),'TYSHA | Controle vrije ruimte in de bestaande modellen',font=title,fill='#182C35')
    d.text((30,62),'Doorsnede halverwege de bak. Grijs = kunststof, rood = smalle holte, geel = lokaal 5 mm, groen = lokaal 8 mm.',font=small,fill='#283B44')
    d.text((30,90),'Kleuren tonen geometrische ruimte (ronde meetmal), geen bewezen buigroute voor een ledstrip.',font=small,fill='#283B44')
    placements=[('T',30,145,1.6),('Y',540,145,1.6),('S',900,145,1.6),('H',30,630,1.3),('A',575,630,1.6),('S_3mf',920,630,1.6),('Lijn1',1230,150,1.35),('Lijn2',1230,365,1.35),('Lijn3',1230,590,1.35)]
    for name,x,y,s in placements:
        silhouette,free=allshapes[name]; h=silhouette.bounds[3]*s
        d.text((x,y),name+(' (STL)' if len(name)==1 else ''),font=font,fill='#182C35')
        origin=(x,y+35)
        poly_draw(d,silhouette,origin,s,h,'#526571')
        poly_draw(d,free,origin,s,h,'#EAAFAD')
        for width,color in [(5,'#F3CC67'),(8,'#67B695')]:
            valid=free.buffer(-width/2).buffer(width/2).intersection(free)
            poly_draw(d,valid,origin,s,h,color)
        d.text((x,y+h+43),f'{len([p for p in parts(free) if p.area>1])} losse holte(n)',font=small,fill='#283B44')
    d.text((30,1185),'Alle maten in mm. Bestandsonderzoek; lichtbeeld en warmte zijn nog niet fysiek getest.',font=small,fill='#283B44')
    im.save(OUT/'channel_map.png')
    for k,v in report.items():
        if k=='word':print('WORD',v)
        else:print(k,'free:',v['free'])

if __name__=='__main__':main()
