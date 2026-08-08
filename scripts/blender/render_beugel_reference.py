import math
from pathlib import Path

import bpy
from mathutils import Vector


SOURCE = Path(r"C:\Users\donmi\Downloads\STL\beugel.obj")
OUTPUT = Path(r"C:\Users\donmi\Downloads\STL\beugel_reference.png")


def look_at(obj, target=(0.0, 0.0, 0.0)):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()


bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
bpy.ops.wm.obj_import(filepath=str(SOURCE))

mesh_objects = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
for obj in mesh_objects:
    obj.scale = (1000.0, 1000.0, 1000.0)
    bpy.context.view_layer.objects.active = obj
    for poly in obj.data.polygons:
        poly.use_smooth = True

material = bpy.data.materials.new("Reference white")
material.diffuse_color = (0.72, 0.78, 0.85, 1.0)
material.use_nodes = True
shader = material.node_tree.nodes.get("Principled BSDF")
shader.inputs["Base Color"].default_value = (0.42, 0.56, 0.72, 1.0)
shader.inputs["Metallic"].default_value = 0.15
shader.inputs["Roughness"].default_value = 0.3
for obj in mesh_objects:
    obj.data.materials.clear()
    obj.data.materials.append(material)

bpy.ops.object.camera_add(location=(72.0, -92.0, 66.0))
camera = bpy.context.object
camera.data.lens = 62
look_at(camera, (0.0, 12.0, 0.0))
bpy.context.scene.camera = camera

for name, location, energy, size, color in (
    ("Key", (-60.0, -65.0, 85.0), 950.0, 55.0, (1.0, 0.88, 0.76)),
    ("Fill", (70.0, -35.0, 35.0), 700.0, 45.0, (0.66, 0.8, 1.0)),
    ("Rim", (0.0, 55.0, 65.0), 900.0, 35.0, (0.78, 0.86, 1.0)),
):
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.name = name
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    light.data.color = color
    look_at(light, (0.0, 12.0, 0.0))

bpy.ops.mesh.primitive_plane_add(size=300.0, location=(0.0, 10.0, -24.0))
floor = bpy.context.object
floor_mat = bpy.data.materials.new("Floor")
floor_mat.diffuse_color = (0.025, 0.03, 0.04, 1.0)
floor.data.materials.append(floor_mat)

scene = bpy.context.scene
scene.render.engine = "BLENDER_WORKBENCH"
scene.display.shading.light = "STUDIO"
scene.display.shading.color_type = "MATERIAL"
scene.display.shading.show_shadows = True
scene.display.shading.show_cavity = True
scene.display.shading.cavity_type = "WORLD"
scene.display.shading.curvature_ridge_factor = 1.8
scene.display.shading.curvature_valley_factor = 1.3
scene.render.resolution_x = 900
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(OUTPUT)
scene.world.color = (0.012, 0.016, 0.024)
scene.view_settings.look = "AgX - Medium High Contrast"
bpy.ops.render.render(write_still=True)
print(OUTPUT)
