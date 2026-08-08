"""Build the fully printable Gologi doorbell housing from gologi.pdf.

All source dimensions are millimetres. Fusion's API uses centimetres.

Design intent:
- Variant B from the drawing: 100% printed joints and fasteners.
- Largest practical parts: integrated wall/pan base, one-piece shell and one-piece bezel.
- Support-aware FDM geometry; rain cap and TPU parts remain separate by material/orientation.
- Structural parts: PETG or ASA. Flexible seals/washers: TPU 95A.
"""

from __future__ import annotations

import math
import os
import traceback

import adsk.core
import adsk.fusion


OUTPUT_DIR = r"C:\Users\donmi\Downloads\gologi\Gologi_PDF_Printkit"
F3D_PATH = os.path.join(OUTPUT_DIR, "Gologi_PDF_Printkit.f3d")
MM = 0.1

# Drawing parameters - gologi.pdf, variant B.
DOORBELL_W = 46.0
DOORBELL_D = 30.0
DOORBELL_H = 147.0
CLEARANCE = 0.75

PLATE_W = 56.0
PLATE_H = 64.0
PLATE_T = 6.0
PLATE_RADIUS = 8.0
SCREW_HOLE_D = 5.2
SCREW_PATTERN_X = 38.0
SCREW_PATTERN_Y = 46.0
COUNTERBORE_D = 10.4
COUNTERBORE_DEPTH = 1.6
VHB_W = 30.0
VHB_H = 54.0
VHB_RECESS = 1.2

PAN_AXIS_FROM_WALL = 22.0
TILT_AXIS_FROM_WALL = 42.0
PIN_D = 9.0
PIN_BORE = 9.4

SHELL_W = 53.5
SHELL_D = 37.5
SHELL_H = 152.0
SHELL_WALL = 3.0
FRONT_LIP = 10.0
FRONT_OPENING = 33.5

KNUCKLE_W = 22.0
KNUCKLE_H = 32.0
KNUCKLE_D = 24.0
KNUCKLE_HUB_D = 18.0
KNUCKLE_EAR_T = 3.0
KNUCKLE_EAR_GAP = 16.0

CAP_W = 60.0
CAP_D = 50.0
CAP_T = 5.0
CAP_SLOPE_DEG = 6.0
DRIP_W = 60.0
DRIP_D = 8.0
DRIP_H = 3.2

CRADLE_W = 16.0
CRADLE_H = 28.0
CRADLE_D = 8.0
CRADLE_HUB_D = 16.0
CRADLE_HUB_L = 16.0

THREAD_CORE = 9.0
THREAD_MAJOR = 12.3
THREAD_PITCH = 2.5
THREAD_LENGTH = 10.0
HANDWHEEL_D = 28.0
HANDWHEEL_H = 11.0
HANDWHEEL_GRIPS = 12

RATCHET_TEETH = 24
RATCHET_STEP_DEG = 15.0
RATCHET_PITCH_D = 22.0
RATCHET_OUTER_D = 28.0
RATCHET_TOOTH_H = 3.0
RATCHET_BASE_T = 2.0

CLIP_W = 9.0
CLIP_L = 14.0
CLIP_T = 2.4
CLIP_HOOK_L = 3.0
CLIP_HOOK_H = 4.0
TPU_T = 1.5


def point(x: float, y: float, z: float) -> adsk.core.Point3D:
    return adsk.core.Point3D.create(x * MM, y * MM, z * MM)


def vector(x: float, y: float, z: float) -> adsk.core.Vector3D:
    return adsk.core.Vector3D.create(x, y, z)


def placement(x=0.0, y=0.0, z=0.0):
    matrix = adsk.core.Matrix3D.create()
    matrix.translation = vector(x * MM, y * MM, z * MM)
    return matrix


def box(tbm, cx, cy, cz, dx, dy, dz, angle=0.0):
    length_dir = vector(math.cos(angle), math.sin(angle), 0)
    width_dir = vector(-math.sin(angle), math.cos(angle), 0)
    obb = adsk.core.OrientedBoundingBox3D.create(
        point(cx, cy, cz), length_dir, width_dir, dx * MM, dy * MM, dz * MM
    )
    return tbm.createBox(obb)


def oriented_box(tbm, cx, cy, cz, dx, dy, dz, length_dir, width_dir):
    obb = adsk.core.OrientedBoundingBox3D.create(
        point(cx, cy, cz), vector(*length_dir), vector(*width_dir), dx * MM, dy * MM, dz * MM
    )
    return tbm.createBox(obb)


def cylinder(tbm, cx, cy, cz, diameter, length, axis="Z"):
    half = length / 2.0
    if axis == "X":
        p1, p2 = point(cx - half, cy, cz), point(cx + half, cy, cz)
    elif axis == "Y":
        p1, p2 = point(cx, cy - half, cz), point(cx, cy + half, cz)
    else:
        p1, p2 = point(cx, cy, cz - half), point(cx, cy, cz + half)
    radius = diameter * MM / 2.0
    return tbm.createCylinderOrCone(p1, radius, p2, radius)


def boolean(tbm, target, tool, operation):
    if not tbm.booleanOperation(target, tool, operation):
        raise RuntimeError("Temporary BRep boolean failed")
    return target


def rounded_plate(tbm, width, height, depth, radius):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    body = box(tbm, 0, 0, depth / 2.0, width - 2.0 * radius, height, depth)
    boolean(tbm, body, box(tbm, 0, 0, depth / 2.0, width, height - 2.0 * radius, depth), union)
    for x in (-width / 2.0 + radius, width / 2.0 - radius):
        for y in (-height / 2.0 + radius, height / 2.0 - radius):
            boolean(tbm, body, cylinder(tbm, x, y, depth / 2.0, 2.0 * radius, depth, "Z"), union)
    return body


def add_brep_component(design, body, name, xyz=(0.0, 0.0, 0.0), opacity=None):
    occurrence = design.rootComponent.occurrences.addNewComponent(placement(*xyz))
    component = occurrence.component
    component.name = name
    base = component.features.baseFeatures.add()
    base.startEdit()
    persisted = component.bRepBodies.add(body, base)
    persisted.name = name
    if opacity is not None:
        persisted.opacity = opacity
    base.finishEdit()
    return component, occurrence


def add_mesh_component(design, coordinates, indices, name, xyz=(0.0, 0.0, 0.0)):
    occurrence = design.rootComponent.occurrences.addNewComponent(placement(*xyz))
    component = occurrence.component
    component.name = name
    base = component.features.baseFeatures.add()
    base.startEdit()
    mesh = component.meshBodies.addByTriangleMeshData(coordinates, indices, [], [])
    mesh.name = name
    base.finishEdit()
    return component, occurrence


def add_multi_brep_component(design, bodies, name, xyz=(0.0, 0.0, 0.0)):
    occurrence = design.rootComponent.occurrences.addNewComponent(placement(*xyz))
    component = occurrence.component
    component.name = name
    base = component.features.baseFeatures.add()
    base.startEdit()
    for index, body in enumerate(bodies, 1):
        persisted = component.bRepBodies.add(body, base)
        persisted.name = "%s_%02d" % (name, index)
    base.finishEdit()
    return component, occurrence


def add_quad(faces, a, b, c, d):
    faces.extend((a, b, c, a, c, d))


def handwheel_pin_mesh(smooth_length: float, phase=0.0):
    """One-piece 12-grip wheel, 9 mm hinge shank and 12.3x2.5 printed thread."""
    n = 144
    thread_rings = max(48, int(THREAD_LENGTH / THREAD_PITCH * 18))
    coords = []
    faces = []

    def addv(x, y, z):
        coords.extend((x * MM, y * MM, z * MM))
        return len(coords) // 3 - 1

    def wheel_radius(theta):
        return HANDWHEEL_D / 2.0 - 1.25 + 1.25 * (0.5 + 0.5 * math.cos(HANDWHEEL_GRIPS * theta))

    def thread_radius(theta, axial_z):
        local = ((axial_z / THREAD_PITCH) - theta / (2.0 * math.pi) + phase) % 1.0
        ridge = max(0.0, 1.0 - abs(local - 0.5) / 0.28)
        start_fade = min(1.0, axial_z / 1.0)
        end_fade = min(1.0, (THREAD_LENGTH - axial_z) / 1.0)
        return THREAD_CORE / 2.0 + (THREAD_MAJOR - THREAD_CORE) / 2.0 * ridge * max(0.0, min(start_fade, end_fade))

    wheel_bottom, wheel_top = [], []
    shank_bottom, shank_top = [], []
    for i in range(n):
        theta = 2.0 * math.pi * i / n
        c, s = math.cos(theta), math.sin(theta)
        rw = wheel_radius(theta)
        wheel_bottom.append(addv(rw * c, rw * s, 0.0))
        wheel_top.append(addv(rw * c, rw * s, HANDWHEEL_H))
        shank_bottom.append(addv((THREAD_CORE / 2.0) * c, (THREAD_CORE / 2.0) * s, HANDWHEEL_H))
        shank_top.append(addv((THREAD_CORE / 2.0) * c, (THREAD_CORE / 2.0) * s, HANDWHEEL_H + smooth_length))

    thread = []
    for ring_index in range(thread_rings + 1):
        axial = THREAD_LENGTH * ring_index / thread_rings
        ring = []
        for i in range(n):
            theta = 2.0 * math.pi * i / n
            r = thread_radius(theta, axial)
            ring.append(addv(r * math.cos(theta), r * math.sin(theta), HANDWHEEL_H + smooth_length + axial))
        thread.append(ring)

    bottom_center = addv(0, 0, 0)
    top_center = addv(0, 0, HANDWHEEL_H + smooth_length + THREAD_LENGTH)
    for i in range(n):
        j = (i + 1) % n
        faces.extend((bottom_center, wheel_bottom[j], wheel_bottom[i]))
        add_quad(faces, wheel_bottom[i], wheel_bottom[j], wheel_top[j], wheel_top[i])
        add_quad(faces, wheel_top[i], wheel_top[j], shank_bottom[j], shank_bottom[i])
        add_quad(faces, shank_bottom[i], shank_bottom[j], shank_top[j], shank_top[i])
        add_quad(faces, shank_top[i], shank_top[j], thread[0][j], thread[0][i])
        for k in range(thread_rings):
            add_quad(faces, thread[k][i], thread[k][j], thread[k + 1][j], thread[k + 1][i])
        faces.extend((top_center, thread[-1][i], thread[-1][j]))
    return coords, faces


def clamp_nut_mesh(phase=0.0):
    """Large FDM nut matching the custom 12.3 x 2.5 mm printed thread."""
    n = 144
    h = 10.0
    rings = 60
    coords = []
    faces = []

    def addv(x, y, z):
        coords.extend((x * MM, y * MM, z * MM))
        return len(coords) // 3 - 1

    def outer_radius(theta):
        return 10.5 - 0.8 + 0.8 * (0.5 + 0.5 * math.cos(12.0 * theta))

    def bore_radius(theta, axial_z):
        local = ((axial_z / THREAD_PITCH) - theta / (2.0 * math.pi) + phase) % 1.0
        groove = max(0.0, 1.0 - abs(local - 0.5) / 0.30)
        return 4.75 + 1.70 * groove

    outer_bottom, outer_top = [], []
    inner = []
    for i in range(n):
        theta = 2.0 * math.pi * i / n
        r = outer_radius(theta)
        outer_bottom.append(addv(r * math.cos(theta), r * math.sin(theta), 0.0))
        outer_top.append(addv(r * math.cos(theta), r * math.sin(theta), h))
    for ring_index in range(rings + 1):
        axial = h * ring_index / rings
        ring = []
        for i in range(n):
            theta = 2.0 * math.pi * i / n
            r = bore_radius(theta, axial)
            ring.append(addv(r * math.cos(theta), r * math.sin(theta), axial))
        inner.append(ring)

    for i in range(n):
        j = (i + 1) % n
        add_quad(faces, outer_bottom[i], outer_bottom[j], outer_top[j], outer_top[i])
        add_quad(faces, outer_bottom[j], outer_bottom[i], inner[0][i], inner[0][j])
        add_quad(faces, outer_top[i], outer_top[j], inner[-1][j], inner[-1][i])
        for k in range(rings):
            add_quad(faces, inner[k][j], inner[k][i], inner[k + 1][i], inner[k + 1][j])
    return coords, faces


def ratchet_face_mesh(phase=0.0):
    """24-tooth face ratchet, 15 degree index, 22 mm pitch circle and 3 mm teeth."""
    samples_per_tooth = 8
    n = RATCHET_TEETH * samples_per_tooth
    outer_r = RATCHET_OUTER_D / 2.0
    inner_r = PIN_BORE / 2.0
    coords = []
    faces = []

    def addv(x, y, z):
        coords.extend((x * MM, y * MM, z * MM))
        return len(coords) // 3 - 1

    ob, ib, ot, it = [], [], [], []
    for i in range(n):
        theta = 2.0 * math.pi * i / n
        cycle = (i / samples_per_tooth + phase) % 1.0
        ramp = 1.0 - abs(2.0 * cycle - 1.0)
        ztop = RATCHET_BASE_T + RATCHET_TOOTH_H * ramp
        c, s = math.cos(theta), math.sin(theta)
        ob.append(addv(outer_r * c, outer_r * s, 0.0))
        ib.append(addv(inner_r * c, inner_r * s, 0.0))
        ot.append(addv(outer_r * c, outer_r * s, ztop))
        it.append(addv(inner_r * c, inner_r * s, ztop))

    for i in range(n):
        j = (i + 1) % n
        add_quad(faces, ob[i], ob[j], ot[j], ot[i])
        add_quad(faces, ib[j], ib[i], it[i], it[j])
        add_quad(faces, ob[j], ob[i], ib[i], ib[j])
        add_quad(faces, ot[i], ot[j], it[j], it[i])
    return coords, faces


def wall_pan_base(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    body = rounded_plate(tbm, PLATE_W, PLATE_H, PLATE_T, PLATE_RADIUS)

    # Variant B VHB pocket on wall side.
    recess = box(tbm, 0, 0, VHB_RECESS / 2.0 - 0.05, VHB_W, VHB_H, VHB_RECESS + 0.1)
    boolean(tbm, body, recess, diff)

    # Four original holes remain per PDF; front counterbores are support-free when printed wall-side down.
    for x in (-SCREW_PATTERN_X / 2.0, SCREW_PATTERN_X / 2.0):
        for y in (-SCREW_PATTERN_Y / 2.0, SCREW_PATTERN_Y / 2.0):
            boolean(tbm, body, cylinder(tbm, x, y, PLATE_T / 2.0, SCREW_HOLE_D, PLATE_T + 2.0, "Z"), diff)
            boolean(
                tbm,
                body,
                cylinder(tbm, x, y, PLATE_T - COUNTERBORE_DEPTH / 2.0 + 0.05, COUNTERBORE_D, COUNTERBORE_DEPTH + 0.2, "Z"),
                diff,
            )

    # Cross rib on the device side spreads adhesive and joint loads.
    boolean(tbm, body, box(tbm, 0, 0, PLATE_T + 1.0, 4.0, 54.0, 2.0), union)
    boolean(tbm, body, box(tbm, 0, 0, PLATE_T + 1.0, 46.0, 4.0, 2.0), union)

    # Integrated upper/lower pan ears: 26 deep x 7 high x 26 wide; axis 22 from wall.
    for y in (-20.5, 20.5):
        ear = box(tbm, 0, y, (PLATE_T + 32.0) / 2.0, 26.0, 7.0, 32.2 - PLATE_T)
        boolean(tbm, body, ear, union)
    pan_bore = cylinder(tbm, 0, 0, PAN_AXIS_FROM_WALL, PIN_BORE, 55.0, "Y")
    boolean(tbm, body, pan_bore, diff)
    return body


def pan_tilt_knuckle(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType

    # Drawing main block: 22 wide x 32 high x 24 deep, with an 18 mm pan hub.
    pan_axis_z = KNUCKLE_D / 2.0
    tilt_axis_z = pan_axis_z + (TILT_AXIS_FROM_WALL - PAN_AXIS_FROM_WALL)
    body = box(tbm, 0, KNUCKLE_H / 2.0, KNUCKLE_D / 2.0, KNUCKLE_W, KNUCKLE_H, KNUCKLE_D)
    hub = cylinder(tbm, 0, KNUCKLE_H / 2.0, pan_axis_z, KNUCKLE_HUB_D, KNUCKLE_H, "Y")
    boolean(tbm, body, hub, union)

    # Two 3 mm x 24 mm x 14 mm ears leave a 16 mm cradle gap.
    ear_center_x = KNUCKLE_EAR_GAP / 2.0 + KNUCKLE_EAR_T / 2.0
    for x in (-ear_center_x, ear_center_x):
        ear = box(tbm, x, KNUCKLE_H / 2.0, KNUCKLE_D + 7.0 - 0.1, KNUCKLE_EAR_T, 24.0, 14.2)
        boolean(tbm, body, ear, union)

    boolean(tbm, body, cylinder(tbm, 0, KNUCKLE_H / 2.0, pan_axis_z, PIN_BORE, KNUCKLE_H + 2.0, "Y"), diff)
    boolean(tbm, body, cylinder(tbm, 0, KNUCKLE_H / 2.0, tilt_axis_z, PIN_BORE, 26.0, "X"), diff)
    return body


def shell_with_cradle(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType

    # U-shell: 53.5 x 37.5 x 152, wall 3, lips 10, front opening 33.5.
    body = box(tbm, 0, SHELL_WALL / 2.0, SHELL_H / 2.0, SHELL_W, SHELL_WALL, SHELL_H)
    for x in (-SHELL_W / 2.0 + SHELL_WALL / 2.0, SHELL_W / 2.0 - SHELL_WALL / 2.0):
        boolean(tbm, body, box(tbm, x, SHELL_D / 2.0, SHELL_H / 2.0, SHELL_WALL, SHELL_D, SHELL_H), union)
    lip_x = SHELL_W / 2.0 - FRONT_LIP / 2.0
    for x in (-lip_x, lip_x):
        boolean(tbm, body, box(tbm, x, SHELL_D - SHELL_WALL / 2.0, SHELL_H / 2.0, FRONT_LIP, SHELL_WALL, SHELL_H), union)

    # Five bottom drain ribs, 7.5 wide x 3 thick, 10 mm pitch.
    for x in (-20.0, -10.0, 0.0, 10.0, 20.0):
        rib = box(tbm, x, SHELL_D / 2.0, 1.5, 7.5, SHELL_D - 5.8, 3.0)
        boolean(tbm, body, rib, union)

    # Integrated cradle boss and hub at shell mid-height.
    boss = box(tbm, 0, -CRADLE_D / 2.0 + 0.1, SHELL_H / 2.0, CRADLE_W, CRADLE_D + 0.2, CRADLE_H)
    boolean(tbm, body, boss, union)
    hub = cylinder(tbm, 0, -CRADLE_HUB_D / 2.0, SHELL_H / 2.0, CRADLE_HUB_D, CRADLE_HUB_L, "X")
    boolean(tbm, body, hub, union)

    # 45-degree stepped sacrificial-free gusset below the boss.
    for step in range(1, 5):
        depth = step * 2.0
        z0 = SHELL_H / 2.0 - CRADLE_H / 2.0 - 8.0 + (step - 1) * 2.0
        gusset = box(tbm, 0, -depth / 2.0 + 0.1, z0 + 1.1, CRADLE_W, depth + 0.2, 2.2)
        boolean(tbm, body, gusset, union)

    boolean(tbm, body, cylinder(tbm, 0, -CRADLE_HUB_D / 2.0, SHELL_H / 2.0, PIN_BORE, 20.0, "X"), diff)
    return body


def rain_cap(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    angle = math.radians(CAP_SLOPE_DEG)
    center_z = 5.2
    body = oriented_box(
        tbm,
        0,
        0,
        center_z,
        CAP_W,
        CAP_D,
        CAP_T,
        (1.0, 0.0, 0.0),
        (0.0, math.cos(angle), -math.sin(angle)),
    )
    # Drip lip at the front and two locating rails with 0.25 mm side clearance.
    boolean(tbm, body, box(tbm, 0, CAP_D / 2.0 - DRIP_D / 2.0, 1.8, DRIP_W, DRIP_D, DRIP_H), union)
    for x in (-28.05, 28.05):
        boolean(tbm, body, box(tbm, x, -2.0, 2.2, 2.4, 38.0, 4.2), union)
    return body


def snap_bezel(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    outer_w = SHELL_W
    outer_h = SHELL_H
    body = box(tbm, 0, outer_h / 2.0, CLIP_T / 2.0, outer_w, outer_h, CLIP_T)
    opening = box(tbm, 0, outer_h / 2.0, CLIP_T / 2.0, FRONT_OPENING, outer_h - 10.0, CLIP_T + 2.0)
    boolean(tbm, body, opening, diff)

    # Four integrated cantilever clips at the drawing heights 40 and 116.
    for side in (-1.0, 1.0):
        x = side * (outer_w / 2.0 - FRONT_LIP / 2.0)
        for y in (40.0, 116.0):
            arm = box(tbm, x, y, CLIP_T + CLIP_L / 2.0, CLIP_W, CLIP_W, CLIP_L)
            boolean(tbm, body, arm, union)
            hook_x = x - side * 1.5
            hook = box(tbm, hook_x, y, CLIP_T + CLIP_L - CLIP_HOOK_H / 2.0, CLIP_HOOK_L, CLIP_W, CLIP_HOOK_H)
            boolean(tbm, body, hook, union)
    return body


def tpu_gasket(tbm):
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    outer = rounded_plate(tbm, 58.0, 66.0, TPU_T, 9.0)
    inner = rounded_plate(tbm, 50.0, 58.0, TPU_T + 1.0, 6.0)
    boolean(tbm, outer, inner, diff)
    return outer


def tpu_friction_washers(tbm):
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    washers = []
    for x, y in ((-17.0, -17.0), (17.0, -17.0), (-17.0, 17.0), (17.0, 17.0)):
        ring = cylinder(tbm, x, y, TPU_T / 2.0, 28.0, TPU_T, "Z")
        boolean(tbm, ring, cylinder(tbm, x, y, TPU_T / 2.0, PIN_BORE + 0.2, TPU_T + 1.0, "Z"), diff)
        washers.append(ring)
    return washers


def doorbell_dummy(tbm):
    # Reference envelope only; not exported for printing.
    body = box(tbm, 0, DOORBELL_D / 2.0, DOORBELL_H / 2.0, DOORBELL_W, DOORBELL_D, DOORBELL_H)
    return body


def add_parameters(design):
    params = design.userParameters
    definitions = (
        ("toestel_h", "147 mm", "Gologi doorbell height"),
        ("toestel_b", "46 mm", "Gologi doorbell width"),
        ("toestel_d", "30 mm", "Gologi doorbell depth"),
        ("speling_rondom", "0.75 mm", "Radial shell clearance"),
        ("plaat_b", "56 mm", "Wall plate width"),
        ("plaat_h", "64 mm", "Wall plate height"),
        ("plaat_dik", "6 mm", "Wall plate thickness"),
        ("gat_d", "5.2 mm", "Wall screw holes"),
        ("verzink_d", "10.4 mm", "Front counterbore diameter"),
        ("verzink_diep", "1.6 mm", "Front counterbore depth"),
        ("pan_as_z", "22 mm", "Pan axis from wall"),
        ("kantel_as_z", "42 mm", "Tilt axis from wall"),
        ("pen_d", "9 mm", "Printed hinge pin diameter"),
        ("pen_boring", "9.4 mm", "FDM hinge running bore"),
        ("shell_b", "53.5 mm", "Shell width"),
        ("shell_diep", "37.5 mm", "Shell depth"),
        ("shell_h", "152 mm", "Shell height"),
        ("wand", "3 mm", "Shell wall thickness"),
        ("lip_b", "10 mm", "Front lip width"),
        ("knokkel_b", "22 mm", "Knuckle width"),
        ("knokkel_h", "32 mm", "Knuckle height"),
        ("knokkel_d", "24 mm", "Knuckle depth"),
        ("kap_b", "60 mm", "Rain cap width"),
        ("kap_diep", "50 mm", "Rain cap depth"),
        ("kap_dik", "5 mm", "Rain cap thickness"),
        ("kap_helling", "6 deg", "Rain cap drainage angle"),
        ("hoek_pan", "35 deg", "Pan joint limit"),
        ("hoek_kantel", "25 deg", "Tilt joint limit"),
        ("draad_kern", "9 mm", "Printed thread core"),
        ("draad_buiten", "12.3 mm", "Printed thread major diameter"),
        ("draad_spoed", "2.5 mm", "Printed thread pitch"),
        ("handwiel_d", "28 mm", "Handwheel outside diameter"),
        ("handwiel_h", "11 mm", "Handwheel height"),
        ("handwiel_grepen", "12", "Handwheel grip count"),
        ("tandkrans_tanden", "24", "Ratchet teeth"),
        ("tandkrans_stap", "15 deg", "Ratchet index angle"),
        ("tandkrans_steekcirkel", "22 mm", "Ratchet pitch circle"),
        ("tandhoogte", "3 mm", "Ratchet tooth height"),
        ("vhb_b", "30 mm", "Variant B VHB recess width"),
        ("vhb_h", "54 mm", "Variant B VHB recess height"),
        ("vhb_diep", "1.2 mm", "Variant B VHB recess depth"),
        ("tpu_dik", "1.5 mm", "TPU 95A gasket and washer thickness"),
    )
    for name, expression, comment in definitions:
        unit = ""
        if expression.endswith(" mm"):
            unit = "mm"
        elif expression.endswith(" deg"):
            unit = "deg"
        params.add(name, adsk.core.ValueInput.createByString(expression), unit, comment)


def export_component_3mf(design, component, filename):
    path = os.path.join(OUTPUT_DIR, filename)
    options = design.exportManager.createC3MFExportOptions(component, path)
    options.isOneFilePerBody = False
    options.sendToPrintUtility = False
    options.surfaceDeviation = 0.005
    if not design.exportManager.execute(options):
        raise RuntimeError("3MF export failed: " + filename)


def run(context):
    ui = None
    try:
        app = adsk.core.Application.get()
        ui = app.userInterface
        os.makedirs(OUTPUT_DIR, exist_ok=True)

        document = app.documents.add(adsk.core.DocumentTypes.FusionDesignDocumentType)
        design = adsk.fusion.Design.cast(app.activeProduct)
        design.designType = adsk.fusion.DesignTypes.ParametricDesignType
        add_parameters(design)
        tbm = adsk.fusion.TemporaryBRepManager.get()
        printable = []

        comp, _ = add_brep_component(design, wall_pan_base(tbm), "01_WallPanBase_Integrated", (-115, 45, 0))
        printable.append((comp, "01_WallPanBase_Integrated.3mf"))

        comp, _ = add_brep_component(design, pan_tilt_knuckle(tbm), "02_PanTiltKnuckle", (-55, 45, 0))
        printable.append((comp, "02_PanTiltKnuckle.3mf"))

        comp, _ = add_brep_component(design, shell_with_cradle(tbm), "03_Shell152_IntegratedCradle", (25, -20, 0))
        printable.append((comp, "03_Shell152_IntegratedCradle.3mf"))

        comp, _ = add_brep_component(design, rain_cap(tbm), "04_RainCap60x50_6deg", (100, 95, 0))
        printable.append((comp, "04_RainCap60x50_6deg.3mf"))

        comp, _ = add_brep_component(design, snap_bezel(tbm), "05_OnePieceSnapBezel", (105, -20, 0))
        printable.append((comp, "05_OnePieceSnapBezel.3mf"))

        comp, _ = add_brep_component(design, tpu_gasket(tbm), "06_TPU95A_Gasket_1p5", (-115, -45, 0))
        printable.append((comp, "06_TPU95A_Gasket_1p5.3mf"))

        washers = tpu_friction_washers(tbm)
        comp, _ = add_multi_brep_component(design, washers, "07_TPU95A_FrictionWashers_x4", (-40, -55, 0))
        printable.append((comp, "07_TPU95A_FrictionWashers_x4.3mf"))

        for label, smooth, xyz, phase in (
            ("Pan", 50.0, (-115, -105, 0), 0.0),
            ("Tilt", 30.0, (-80, -105, 0), 0.5),
        ):
            coords, faces = handwheel_pin_mesh(smooth, phase)
            comp, _ = add_mesh_component(design, coords, faces, "08_HandwheelPin_%s" % label, xyz)
            printable.append((comp, "08_HandwheelPin_%s.3mf" % label))

        for index, xyz in enumerate(((-40, -105, 0), (-12, -105, 0)), 1):
            coords, faces = clamp_nut_mesh(0.5 * (index - 1))
            comp, _ = add_mesh_component(design, coords, faces, "09_ClampNut_%02d" % index, xyz)
            printable.append((comp, "09_ClampNut_%02d.3mf" % index))

        ratchet_names = ("Pan_Fixed", "Pan_Moving", "Tilt_Fixed", "Tilt_Moving")
        for index, name in enumerate(ratchet_names):
            coords, faces = ratchet_face_mesh(0.5 if index % 2 else 0.0)
            comp, _ = add_mesh_component(design, coords, faces, "10_Ratchet24_%s" % name, (25 + index * 32, -108, 0))
            printable.append((comp, "10_Ratchet24_%s.3mf" % name))

        dummy, dummy_occ = add_brep_component(design, doorbell_dummy(tbm), "00_REFERENCE_Gologi_147x46x30", (25, 30, 0), 0.20)
        dummy_occ.isLightBulbOn = False

        for component, filename in printable:
            export_component_3mf(design, component, filename)

        archive = design.exportManager.createFusionArchiveExportOptions(F3D_PATH)
        if not design.exportManager.execute(archive):
            raise RuntimeError("F3D export failed")

        app.activeViewport.fit()
        app.activeViewport.refresh()
        ui.messageBox(
            "Gologi PDF-printkit gebouwd volgens variant B.\n\n"
            "Hoofdmaten:\n"
            "- Schaal 53.5 x 37.5 x 152, wand 3, lippen 10\n"
            "- Wandplaat 56 x 64 x 6, R8, gaten 38 x 46\n"
            "- Assen op 22 en 42 van de muur, pen 9 / boring 9.4\n"
            "- Handwielen 28 x 11, 12 grepen, draad 12.3 x 2.5\n"
            "- 24 tanden / 15 graden / steekcirkel 22\n"
            "- VHB 30 x 54 x 1.2, TPU 95A 1.5\n\n"
            "Grote delen zijn geintegreerd; kap en TPU zijn apart voor supportvrij printen.\n\n"
            "F3D + afzonderlijke 3MF-bestanden:\n" + OUTPUT_DIR
        )
    except Exception:
        if ui:
            ui.messageBox("Gologi PDF-scriptfout:\n" + traceback.format_exc())
