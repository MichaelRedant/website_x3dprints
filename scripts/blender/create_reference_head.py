from __future__ import annotations

import math
import random
from pathlib import Path

import bpy
from mathutils import Vector


OUTPUT_DIR = Path(r"C:\Users\donmi\Documents\ComfyUI\output\qwen_edit")
BLEND_PATH = OUTPUT_DIR / "reference_head_model.blend"
GLB_PATH = OUTPUT_DIR / "reference_head_model.glb"
RENDER_PATH = OUTPUT_DIR / "reference_head_preview.png"


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (
        bpy.data.meshes,
        bpy.data.curves,
        bpy.data.materials,
        bpy.data.cameras,
        bpy.data.lights,
    ):
        for datablock in list(datablocks):
            if datablock.users == 0:
                datablocks.remove(datablock)


def material(
    name: str,
    color: tuple[float, float, float, float],
    roughness: float = 0.45,
    metallic: float = 0.0,
) -> bpy.types.Material:
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = color
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = color
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Metallic"].default_value = metallic
    return mat


def smooth(obj: bpy.types.Object) -> bpy.types.Object:
    if obj.type == "MESH":
        for poly in obj.data.polygons:
            poly.use_smooth = True
    return obj


def uv_sphere(
    name: str,
    location: tuple[float, float, float],
    scale: tuple[float, float, float],
    mat: bpy.types.Material,
    segments: int = 48,
    rings: int = 32,
) -> bpy.types.Object:
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=segments,
        ring_count=rings,
        location=location,
    )
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    return smooth(obj)


def curve_object(
    name: str,
    points: list[tuple[float, float, float]],
    bevel: float,
    mat: bpy.types.Material,
    cyclic: bool = False,
) -> bpy.types.Object:
    data = bpy.data.curves.new(name, type="CURVE")
    data.dimensions = "3D"
    data.resolution_u = 10
    data.bevel_depth = bevel
    data.bevel_resolution = 5
    spline = data.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for point, coordinate in zip(spline.bezier_points, points):
        point.co = coordinate
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"
    spline.use_cyclic_u = cyclic
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    data.materials.append(mat)
    return obj


def look_at(obj: bpy.types.Object, target: tuple[float, float, float]) -> None:
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


clear_scene()
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
random.seed(24)

skin = material("Warm freckled skin", (0.67, 0.36, 0.27, 1.0), 0.53)
skin_light = material("Nose highlight", (0.78, 0.48, 0.38, 1.0), 0.5)
hair = material("Dark brown hair", (0.045, 0.018, 0.012, 1.0), 0.34)
hair_highlight = material("Warm hair highlights", (0.12, 0.045, 0.025, 1.0), 0.4)
white = material("Eye white", (0.92, 0.88, 0.82, 1.0), 0.3)
iris = material("Hazel iris", (0.16, 0.075, 0.028, 1.0), 0.28)
pupil = material("Pupils", (0.006, 0.004, 0.003, 1.0), 0.2)
brow = material("Brows and lashes", (0.035, 0.012, 0.008, 1.0), 0.48)
lip = material("Rose lips", (0.48, 0.12, 0.13, 1.0), 0.38)
freckle = material("Freckles", (0.22, 0.075, 0.035, 1.0), 0.58)
silver = material("Silver nose ring", (0.55, 0.58, 0.62, 1.0), 0.2, 0.85)

# Head mesh with a tapered jaw and slightly elongated chin.
head = uv_sphere("Head", (0.0, 0.0, 0.25), (1.12, 0.96, 1.46), skin, 96, 64)
for vertex in head.data.vertices:
    world_z = vertex.co.z
    normalized_z = (world_z - 0.25) / 1.46
    if normalized_z < 0.0:
        taper = 1.0 - 0.24 * min(1.0, abs(normalized_z))
        vertex.co.x *= taper
    if normalized_z < -0.68:
        vertex.co.z -= 0.08 * (abs(normalized_z) - 0.68) / 0.32

# Short neutral neck so the head reads as a finished bust asset.
bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=0.52, depth=0.82, location=(0.0, 0.18, -1.32))
neck = bpy.context.object
neck.name = "Short neck"
neck.scale = (1.0, 0.86, 1.0)
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
neck.data.materials.append(skin)
smooth(neck)

# Ears.
for side in (-1, 1):
    ear = uv_sphere(f"Ear {'L' if side < 0 else 'R'}", (side * 1.01, 0.03, 0.22), (0.17, 0.10, 0.36), skin)
    uv_sphere(f"Ear inner {'L' if side < 0 else 'R'}", (side * 1.035, -0.065, 0.22), (0.075, 0.025, 0.19), freckle, 32, 20)

# Eyes, irises and pupils.
for side in (-1, 1):
    x = side * 0.43
    uv_sphere(f"Eye {'L' if side < 0 else 'R'}", (x, -0.825, 0.55), (0.34, 0.105, 0.18), white)
    uv_sphere(f"Iris {'L' if side < 0 else 'R'}", (x + 0.025, -0.922, 0.55), (0.115, 0.022, 0.115), iris, 40, 24)
    uv_sphere(f"Pupil {'L' if side < 0 else 'R'}", (x + 0.025, -0.943, 0.55), (0.046, 0.012, 0.046), pupil, 32, 20)
    uv_sphere(f"Eye glint {'L' if side < 0 else 'R'}", (x - 0.008, -0.957, 0.59), (0.018, 0.006, 0.018), white, 20, 12)

    curve_object(
        f"Upper eyelid {'L' if side < 0 else 'R'}",
        [
            (x - 0.34, -0.954, 0.55),
            (x - 0.18, -0.974, 0.68),
            (x, -0.982, 0.72),
            (x + 0.18, -0.974, 0.68),
            (x + 0.34, -0.954, 0.55),
        ],
        0.028,
        brow,
    )
    curve_object(
        f"Brow {'L' if side < 0 else 'R'}",
        [
            (x - 0.34, -0.865, 0.91),
            (x - 0.12, -0.925, 1.01),
            (x + 0.15, -0.925, 1.01),
            (x + 0.33, -0.885, 0.95),
        ],
        0.045,
        brow,
    )

# Nose bridge, tip and nostril wings.
uv_sphere("Nose bridge", (0.0, -0.84, 0.20), (0.13, 0.17, 0.43), skin_light)
uv_sphere("Nose tip", (0.0, -0.995, -0.03), (0.18, 0.22, 0.16), skin_light)
for side in (-1, 1):
    uv_sphere(f"Nostril wing {side}", (side * 0.145, -0.955, -0.075), (0.11, 0.11, 0.09), skin)

# Nose ring on the subject's left side.
bpy.ops.mesh.primitive_torus_add(
    major_radius=0.105,
    minor_radius=0.014,
    major_segments=48,
    minor_segments=12,
    location=(-0.165, -1.075, -0.055),
    rotation=(math.pi / 2.0, 0.0, 0.0),
)
nose_ring = bpy.context.object
nose_ring.name = "Nose ring"
nose_ring.data.materials.append(silver)
smooth(nose_ring)

# Full, slightly asymmetric lips and mouth line.
curve_object(
    "Upper lip",
    [
        (-0.43, -0.925, -0.34),
        (-0.23, -0.995, -0.28),
        (0.0, -1.025, -0.34),
        (0.22, -1.0, -0.27),
        (0.44, -0.925, -0.33),
    ],
    0.09,
    lip,
)
curve_object(
    "Lower lip",
    [
        (-0.42, -0.94, -0.37),
        (-0.22, -1.0, -0.45),
        (0.02, -1.02, -0.47),
        (0.25, -0.995, -0.44),
        (0.44, -0.93, -0.36),
    ],
    0.105,
    lip,
)
curve_object("Mouth line", [(-0.39, -1.018, -0.355), (0.0, -1.055, -0.37), (0.4, -1.018, -0.35)], 0.018, brow)

# Freckles across the nose and cheeks.
for index in range(58):
    x = random.uniform(-0.76, 0.76)
    z = random.uniform(-0.18, 0.62)
    if abs(x) < 0.23 and z < 0.04:
        z += 0.17
    ellipsoid = 1.0 - (x / 1.12) ** 2 - ((z - 0.25) / 1.46) ** 2
    y = -0.96 * math.sqrt(max(0.14, ellipsoid)) - 0.012
    radius = random.uniform(0.012, 0.027)
    uv_sphere(f"Freckle {index:02d}", (x, y, z), (radius, 0.009, radius), freckle, 16, 8)

# Hair mass set slightly behind the face, followed by flowing front strands.
hair_cap = uv_sphere("Hair volume", (0.0, 0.18, 0.52), (1.19, 0.94, 1.52), hair, 72, 48)
for vertex in hair_cap.data.vertices:
    if vertex.co.z < -0.25:
        vertex.co.z -= 0.18

for index in range(34):
    side = -1 if index % 2 == 0 else 1
    lane = index // 2
    start_x = side * (0.05 + lane * 0.058)
    start_z = 1.77 - 0.018 * lane
    wave = random.uniform(0.08, 0.19)
    end_z = random.uniform(-1.18, -0.56)
    outward = side * random.uniform(1.03, 1.33)
    points = [
        (start_x, -0.10 + random.uniform(-0.03, 0.05), start_z),
        (side * (0.52 + wave), -0.36, 1.25),
        (side * (0.88 - wave), -0.45, 0.62),
        (outward, -0.24, 0.02),
        (side * random.uniform(0.82, 1.18), -0.02, end_z),
    ]
    curve_object(
        f"Hair strand {index:02d}",
        points,
        random.uniform(0.025, 0.052),
        hair_highlight if index % 7 == 0 else hair,
    )

# A soft center part and a few face-framing curls.
curve_object("Center part L", [(-0.025, -0.79, 1.68), (-0.30, -0.83, 1.47), (-0.68, -0.77, 1.13)], 0.042, hair)
curve_object("Center part R", [(0.025, -0.79, 1.68), (0.30, -0.83, 1.47), (0.68, -0.77, 1.13)], 0.042, hair)
curve_object("Face curl L", [(-0.84, -0.76, 0.94), (-1.02, -0.91, 0.48), (-0.87, -0.94, 0.06), (-1.03, -0.72, -0.52)], 0.038, hair_highlight)
curve_object("Face curl R", [(0.85, -0.76, 0.92), (1.03, -0.91, 0.42), (0.89, -0.93, -0.02), (1.05, -0.68, -0.60)], 0.038, hair_highlight)

# Neutral presentation plinth.
bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=0.78, depth=0.12, location=(0.0, 0.12, -1.79))
plinth = bpy.context.object
plinth.name = "Display plinth"
plinth_mat = material("Plinth", (0.035, 0.04, 0.05, 1.0), 0.3, 0.25)
plinth.data.materials.append(plinth_mat)
smooth(plinth)

# Camera and studio lighting.
bpy.ops.object.camera_add(location=(0.0, -7.1, 0.32))
camera = bpy.context.object
camera.name = "Portrait camera"
camera.data.lens = 72
look_at(camera, (0.0, -0.05, 0.18))
bpy.context.scene.camera = camera

def area_light(name: str, location: tuple[float, float, float], energy: float, size: float, color: tuple[float, float, float]) -> None:
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.name = name
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    light.data.color = color
    look_at(light, (0.0, 0.0, 0.25))


area_light("Key light", (-3.2, -4.2, 4.5), 1150, 4.0, (1.0, 0.78, 0.68))
area_light("Fill light", (3.5, -3.0, 2.2), 720, 3.0, (0.64, 0.76, 1.0))
area_light("Hair rim", (0.7, 2.2, 4.0), 1050, 2.6, (1.0, 0.56, 0.32))

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = 700
scene.render.resolution_y = 700
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.film_transparent = False
scene.render.filepath = str(RENDER_PATH)
scene.render.image_settings.color_mode = "RGBA"
scene.view_settings.look = "AgX - Medium High Contrast"
scene.world.color = (0.018, 0.022, 0.03)

scene.render.filepath = str(RENDER_PATH)
bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_PATH))
bpy.ops.export_scene.gltf(filepath=str(GLB_PATH), export_format="GLB")
bpy.ops.render.render(write_still=True)

print(f"BLEND={BLEND_PATH}")
print(f"GLB={GLB_PATH}")
print(f"RENDER={RENDER_PATH}")
