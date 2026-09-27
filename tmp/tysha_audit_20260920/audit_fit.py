import json
from PIL import Image,ImageDraw,ImageFont
import audit_inventory as inv
import audit_channels as audit

def get(path):
    inv.load_3mf(path)
    return audit.normalized(inv.meshes[next(k for k in inv.meshes if k.startswith(str(path.relative_to(inv.ROOT))+'::'))])

out={}
im=Image.new('RGB',(1500,1150),'white'); d=ImageDraw.Draw(im)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',20)
title=ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf',28)
d.text((25,20),'Passing 3MF-front in bijbehorende bak',font=title,fill='#182C35')
d.text((25,65),'Grijs: bakwand | blauw: insteekdeel front | rood: overlap van kunststof bij contour-uitlijning',font=font,fill='#182C35')
pairs=[('S',inv.ROOT/'stl/TYSHA_S_bak_H2S.3mf',inv.ROOT/'stl/TYSHA_S_front_H2S.3mf')]+[(f'Lijn{n}',inv.ROOT/f'files/TYSHA_lijn{n}_bak_H2S.3mf',inv.ROOT/f'files/TYSHA_lijn{n}_front_H2S.3mf') for n in [1,2,3]]
for (name,bp,fp),(x,y,scale) in zip(pairs,[(25,130,2.6),(650,130,2.1),(650,455,2.1),(650,670,2.1)]):
    b=get(bp);f=get(fp)
    body=audit.section(b,b.extents[2]-.6);lip=audit.section(f,2.4);face=audit.section(f,.9)
    collision=body.intersection(lip)
    out[name]={'body_z_mm':float(b.extents[2]),'face_thickness_mm':1.8,'lip_depth_mm':1.2,'overlap_area_mm2':collision.area,'approx_overlap_volume_mm3':collision.area*1.2,'overlap_components_mm2':sorted([p.area for p in audit.parts(collision)],reverse=True),'face_lip_area_mm2':[face.area,lip.area]}
    origin=(x,y+35);height=face.bounds[3]*scale
    d.text((x,y),f'{name}: overlap {collision.area:.1f} mm2',font=font,fill='#182C35')
    audit.poly_draw(d,body,origin,scale,height,'#526571')
    audit.poly_draw(d,lip,origin,scale,height,'#95C7D7')
    audit.poly_draw(d,collision,origin,scale,height,'#DF4949')
d.text((25,1105),'Geometrische controle; front verondersteld met het 1,2 mm hoge insteekdeel in de opening.',font=font,fill='#182C35')
im.save(audit.OUT/'fit_map.png')
(audit.OUT/'fit.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
print(json.dumps(out,indent=2))
