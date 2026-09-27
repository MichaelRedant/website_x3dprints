from pathlib import Path
import json, zipfile, posixpath, xml.etree.ElementTree as ET
import numpy as np
import trimesh
from pypdf import PdfReader

ROOT=Path(r'C:\Users\donmi\Downloads\STL\Tysha')
OUT=Path(__file__).parent
NS={'m':'http://schemas.microsoft.com/3dmanufacturing/core/2015/02'}
meshes={}

def stats(mesh):
    parts=mesh.split(only_watertight=False)
    return dict(bounds=np.round(mesh.bounds,4).tolist(), size=np.round(mesh.extents,4).tolist(),
                faces=len(mesh.faces),watertight=bool(mesh.is_watertight),volume=round(mesh.volume,2),
                components=len(parts), component_volumes=[round(p.volume,2) for p in parts],
                z_levels=np.unique(np.round(mesh.vertices[:,2],4)).tolist())

def transform(s):
    mat=np.eye(4)
    if s:
        a=np.array([float(v) for v in s.split()]).reshape(4,3)
        mat[:3,:]=a.T
    return mat

def load_3mf(path):
    with zipfile.ZipFile(path) as z:
        roots={n:ET.fromstring(z.read(n)) for n in z.namelist() if n.endswith('.model')}
        objects={(n,o.attrib['id']):o for n,r in roots.items() for o in r.findall('m:resources/m:object',NS)}
        config=ET.fromstring(z.read('Metadata/model_settings.config')) if 'Metadata/model_settings.config' in z.namelist() else None
        names={o.attrib['id']:{m.attrib.get('key'):m.attrib.get('value') for m in o.findall('metadata')} for o in config.findall('object')} if config is not None else {}
        metadata={}
        if 'Metadata/project_settings.config' in z.namelist():
            settings=json.loads(z.read('Metadata/project_settings.config'))
            keys=['printer_model','printer_settings_id','filament_type','filament_colour','filament_settings_id','layer_height','wall_loops','sparse_infill_density','top_shell_layers','bottom_shell_layers','enable_support','nozzle_diameter','filament_diameter']
            metadata['settings']={k:settings[k] for k in keys if k in settings}
        metadata['color_changes']=[n for n in z.namelist() if any(v in n.lower() for v in ['custom_gcode','layer_height','layer_config'])]
        if config is not None:
            metadata['object_settings']={o.attrib['id']:ET.tostring(o,encoding='unicode') for o in config.findall('object')}
        def resolve(name,oid,seen=()):
            if (name,oid) in seen: raise RuntimeError('Component cycle')
            o=objects[name,oid]
            m=o.find('m:mesh',NS)
            parts=[]
            if m is not None:
                vertices=np.array([[float(v.attrib[k]) for k in ['x','y','z']] for v in m.findall('m:vertices/m:vertex',NS)])
                faces=np.array([[int(v.attrib[k]) for k in ['v1','v2','v3']] for v in m.findall('m:triangles/m:triangle',NS)])
                parts.append(trimesh.Trimesh(vertices,faces,process=True))
            for c in o.findall('m:components/m:component',NS):
                ref=next((v for k,v in c.attrib.items() if k.endswith('}path')),None)
                other=ref.lstrip('/') if ref else name
                if other not in roots: other=posixpath.normpath(posixpath.join(posixpath.dirname(name),ref))
                part=resolve(other,c.attrib['objectid'],seen+((name,oid),))
                part.apply_transform(transform(c.attrib.get('transform')))
                parts.append(part)
            return trimesh.util.concatenate(parts)
        main='3D/3dmodel.model'
        outputs=[]
        for it in roots[main].findall('m:build/m:item',NS):
            oid=it.attrib['objectid']
            m=resolve(main,oid)
            b=transform(it.attrib.get('transform'))
            placed=m.copy();placed.apply_transform(b)
            label=names.get(oid,{}).get('name',objects[main,oid].attrib.get('name',oid))
            key=f'{path.relative_to(ROOT)}::{oid}::{label}'
            meshes[key]=m
            outputs.append(dict(id=oid,name=label,extruder=names.get(oid,{}).get('extruder'),local=stats(m),build_transform=b.tolist(),placed_size=np.round(placed.extents,3).tolist()))
        # Render saved slicer thumbnails to inspect only as data, not application state.
        for n in z.namelist():
            if n.startswith('Metadata/plate_') and n.endswith('.png') and 'small' not in n and 'no_light' not in n:
                (OUT/(path.stem+'_'+Path(n).name)).write_bytes(z.read(n))
        return dict(objects=outputs,metadata=metadata)

def main():
    report={'stl':{},'3mf':{}}
    for p in sorted(ROOT.rglob('*.stl')):
        m=trimesh.load_mesh(p,process=True)
        meshes[str(p.relative_to(ROOT))]=m
        report['stl'][str(p.relative_to(ROOT))]=stats(m)
    for p in sorted(ROOT.rglob('*.3mf')):
        report['3mf'][str(p.relative_to(ROOT))]=load_3mf(p)
    report['pdf_fonts']=[]
    page=PdfReader(r'C:\Users\donmi\Downloads\Prof pecat  (1).pdf').pages[0]
    for name,v in page['/Resources']['/Font'].items():
        f=v.get_object();report['pdf_fonts'].append([name,str(f.get('/BaseFont')),str(f.get('/Subtype'))])
    (OUT/'inventory.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
    for k,v in report['stl'].items():print(k,v['size'],'closed',v['watertight'],'parts',v['components'],'z',v['z_levels'])
    for k,v in report['3mf'].items():
        print('\n',k)
        for o in v['objects']:print(o['id'],o['name'],o['local']['size'],'placed',o['placed_size'],'closed',o['local']['watertight'],'parts',o['local']['components'])
        print('settings',v['metadata'].get('settings'), 'color_changes',v['metadata']['color_changes'])
    print('PDF FONTS',report['pdf_fonts'])

if __name__=='__main__':main()
