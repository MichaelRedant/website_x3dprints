"""MakerWorld-ready universal outdoor doorbell mount.

Design goals:
- Four large structural modules for the selected size: wall base, knuckle, cradle, rain cap.
- Integrated 24-step face ratchets; no loose ratchet discs or glue.
- Two square-drive printed hinge pins and two large hand nuts.
- S/M/L one-piece cradle variants in one Fusion archive; the user prints one size only.
- Large flat or upright print orientations with minimal local support.
"""

import adsk.core
import adsk.fusion
import importlib.util
import math
import os
import traceback


HERE = os.path.dirname(os.path.abspath(__file__))
BASE_PATH = os.path.normpath(os.path.join(HERE, "..", "GologiDoorbellPDF", "GologiDoorbellPDF.py"))
SPEC = importlib.util.spec_from_file_location("gologi_base", BASE_PATH)
base = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(base)

MM = base.MM
OUTPUT_DIR = r"C:\Users\donmi\Downloads\gologi\Universal_Outdoor_Mount_MakerWorld"
F3D_PATH = os.path.join(OUTPUT_DIR, "Universal_Outdoor_Mount_MakerWorld.f3d")

PLATE_W = 64.0
PLATE_H = 74.0
PLATE_T = 6.0
PLATE_R = 8.0
VHB_W = 42.0
VHB_H = 60.0
VHB_D = 1.2
SCREW_X = 46.0
SCREW_Y = 56.0
SCREW_D = 5.2
COUNTER_D = 10.4
COUNTER_DEPTH = 1.6

PAN_AXIS_Z = 22.0
PAN_EAR_GAP = 40.0
PAN_EAR_T = 7.0
PAN_EAR_W = 30.0
PAN_EAR_DEPTH = 32.0
PIN_CLEAR_D = 10.0
SQUARE_DRIVE = 8.0
SQUARE_CLEAR = 8.55

KNUCKLE_W = 24.0
KNUCKLE_H = 32.0
KNUCKLE_D = 24.0
TILT_AXIS_Z = 32.0
TILT_GAP = 16.8
TILT_EAR_T = 4.5
TILT_EAR_SIZE = 30.0

HANDWHEEL_D = 30.0
HANDWHEEL_H = 12.0
THREAD_CORE = 9.0
THREAD_MAJOR = 12.3
THREAD_PITCH = 2.5
THREAD_LENGTH = 20.0
PAN_SMOOTH = 61.0
TILT_SMOOTH = 34.0

RATCHET_OD = 30.0
RATCHET_ID = 10.0
RATCHET_TEETH = 24
RATCHET_BASE = 1.8
RATCHET_TOOTH = 2.2

WALL = 3.0
CLEARANCE = 0.75
FRONT_LIP = 10.0
CRADLE_BOSS_W = 16.0
CRADLE_BOSS_D = 9.0
CRADLE_BOSS_H = 30.0
CAP_SLOPE = 6.0

SIZES = (
    ("S_Gologi_46x30x147", 46.0, 30.0, 147.0),
    ("M_52x36x155", 52.0, 36.0, 155.0),
    ("L_58x42x165", 58.0, 42.0, 165.0),
)


def point(x, y, z):
    return base.point(x, y, z)


def box(tbm, cx, cy, cz, dx, dy, dz):
    return base.box(tbm, cx, cy, cz, dx, dy, dz)


def cylinder(tbm, cx, cy, cz, diameter, length, axis="Z"):
    return base.cylinder(tbm, cx, cy, cz, diameter, length, axis)


def boolean(tbm, target, tool, operation):
    return base.boolean(tbm, target, tool, operation)


def concatenate_meshes(meshes):
    coords = []
    faces = []
    vertex_offset = 0
    for mesh_coords, mesh_faces in meshes:
        coords.extend(mesh_coords)
        faces.extend(index + vertex_offset for index in mesh_faces)
        vertex_offset += len(mesh_coords) // 3
    return coords, faces


def transform_mesh(coords, transform):
    out = []
    for i in range(0, len(coords), 3):
        out.extend(transform(coords[i], coords[i + 1], coords[i + 2]))
    return out


def ratchet_face_mesh(phase=0.0):
    samples_per_tooth = 8
    n = RATCHET_TEETH * samples_per_tooth
    outer_r = RATCHET_OD / 2.0
    inner_r = RATCHET_ID / 2.0
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
        ztop = RATCHET_BASE + RATCHET_TOOTH * ramp
        c, s = math.cos(theta), math.sin(theta)
        ob.append(addv(outer_r * c, outer_r * s, 0.0))
        ib.append(addv(inner_r * c, inner_r * s, 0.0))
        ot.append(addv(outer_r * c, outer_r * s, ztop))
        it.append(addv(inner_r * c, inner_r * s, ztop))
    for i in range(n):
        j = (i + 1) % n
        base.add_quad(faces, ob[i], ob[j], ot[j], ot[i])
        base.add_quad(faces, ib[j], ib[i], it[i], it[j])
        base.add_quad(faces, ob[j], ob[i], ib[i], ib[j])
        base.add_quad(faces, ot[i], ot[j], it[j], it[i])
    return coords, faces


def thread_mesh(offset_z, phase=0.0):
    n = 144
    rings = max(60, int(THREAD_LENGTH / THREAD_PITCH * 20))
    coords = []
    faces = []

    def addv(x, y, z):
        coords.extend((x * MM, y * MM, z * MM))
        return len(coords) // 3 - 1

    mesh_rings = []
    for ring_index in range(rings + 1):
        axial = THREAD_LENGTH * ring_index / rings
        ring = []
        for i in range(n):
            theta = 2.0 * math.pi * i / n
            local = ((axial / THREAD_PITCH) - theta / (2.0 * math.pi) + phase) % 1.0
            ridge = max(0.0, 1.0 - abs(local - 0.5) / 0.28)
            fade = min(1.0, axial / 1.0, (THREAD_LENGTH - axial) / 1.0)
            radius = THREAD_CORE / 2.0 + (THREAD_MAJOR - THREAD_CORE) / 2.0 * ridge * max(0.0, fade)
            ring.append(addv(radius * math.cos(theta), radius * math.sin(theta), offset_z + axial))
        mesh_rings.append(ring)
    bottom = addv(0.0, 0.0, offset_z)
    top = addv(0.0, 0.0, offset_z + THREAD_LENGTH)
    for i in range(n):
        j = (i + 1) % n
        faces.extend((bottom, mesh_rings[0][j], mesh_rings[0][i]))
        for k in range(rings):
            base.add_quad(faces, mesh_rings[k][i], mesh_rings[k][j], mesh_rings[k + 1][j], mesh_rings[k + 1][i])
        faces.extend((top, mesh_rings[-1][i], mesh_rings[-1][j]))
    return coords, faces


def handwheel_pin_breps(tbm, smooth):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    wheel = cylinder(tbm, 0, 0, HANDWHEEL_H / 2.0, 25.0, HANDWHEEL_H, "Z")
    for i in range(12):
        angle = 2.0 * math.pi * i / 12.0
        cx = 13.1 * math.cos(angle)
        cy = 13.1 * math.sin(angle)
        grip = cylinder(tbm, cx, cy, HANDWHEEL_H / 2.0, 3.8, HANDWHEEL_H, "Z")
        boolean(tbm, wheel, grip, union)
    shank = box(tbm, 0, 0, HANDWHEEL_H + smooth / 2.0, SQUARE_DRIVE, SQUARE_DRIVE, smooth + 0.3)
    boolean(tbm, wheel, shank, union)
    return [wheel]


def handwheel_pin_mesh(smooth, phase=0.5):
    ratchet_coords, ratchet_faces = ratchet_face_mesh(phase)
    ratchet_coords = transform_mesh(
        ratchet_coords,
        lambda x, y, z: (x, y, z + (HANDWHEEL_H - 0.25) * MM),
    )
    thread_coords, thread_faces = thread_mesh(HANDWHEEL_H + smooth - 0.5, phase)
    return concatenate_meshes(((ratchet_coords, ratchet_faces), (thread_coords, thread_faces)))


def wall_base(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    body = base.rounded_plate(tbm, PLATE_W, PLATE_H, PLATE_T, PLATE_R)
    recess = box(tbm, 0, 0, VHB_D / 2.0 - 0.05, VHB_W, VHB_H, VHB_D + 0.1)
    boolean(tbm, body, recess, diff)
    for x in (-SCREW_X / 2.0, SCREW_X / 2.0):
        for y in (-SCREW_Y / 2.0, SCREW_Y / 2.0):
            boolean(tbm, body, cylinder(tbm, x, y, PLATE_T / 2.0, SCREW_D, PLATE_T + 2.0, "Z"), diff)
            boolean(tbm, body, cylinder(tbm, x, y, PLATE_T - COUNTER_DEPTH / 2.0 + 0.05, COUNTER_D, COUNTER_DEPTH + 0.2, "Z"), diff)
    boolean(tbm, body, box(tbm, 0, 0, PLATE_T + 1.0, 4.0, 62.0, 2.0), union)
    boolean(tbm, body, box(tbm, 0, 0, PLATE_T + 1.0, 52.0, 4.0, 2.0), union)

    ear_center = PAN_EAR_GAP / 2.0 + PAN_EAR_T / 2.0
    for y in (-ear_center, ear_center):
        ear = box(tbm, 0, y, PLATE_T + PAN_EAR_DEPTH / 2.0, PAN_EAR_W, PAN_EAR_T, PAN_EAR_DEPTH)
        boolean(tbm, body, ear, union)
    boolean(tbm, body, cylinder(tbm, 0, 0, PAN_AXIS_Z, PIN_CLEAR_D, PAN_EAR_GAP + 2.0 * PAN_EAR_T + 4.0, "Y"), diff)
    return body


def wall_pan_fixed_ratchet():
    coords, faces = ratchet_face_mesh(0.0)
    outer_y = -(PAN_EAR_GAP / 2.0 + PAN_EAR_T)
    coords = transform_mesh(
        coords,
        lambda x, y, z: (x, (outer_y + 0.25) * MM - z, PAN_AXIS_Z * MM + y),
    )
    return coords, faces


def knuckle(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    body = box(tbm, 0, KNUCKLE_H / 2.0, KNUCKLE_D / 2.0, KNUCKLE_W, KNUCKLE_H, KNUCKLE_D)
    pan_square = box(tbm, 0, KNUCKLE_H / 2.0, KNUCKLE_D / 2.0, SQUARE_CLEAR, KNUCKLE_H + 2.0, SQUARE_CLEAR)
    boolean(tbm, body, pan_square, diff)

    ear_center_x = TILT_GAP / 2.0 + TILT_EAR_T / 2.0
    for x in (-ear_center_x, ear_center_x):
        ear = box(tbm, x, KNUCKLE_H / 2.0, TILT_AXIS_Z, TILT_EAR_T, TILT_EAR_SIZE, TILT_EAR_SIZE)
        boolean(tbm, body, ear, union)
    boolean(tbm, body, cylinder(tbm, 0, KNUCKLE_H / 2.0, TILT_AXIS_Z, PIN_CLEAR_D, TILT_GAP + 2.0 * TILT_EAR_T + 4.0, "X"), diff)
    return body


def knuckle_tilt_fixed_ratchet():
    coords, faces = ratchet_face_mesh(0.0)
    outer_x = TILT_GAP / 2.0 + TILT_EAR_T
    coords = transform_mesh(
        coords,
        lambda x, y, z: ((outer_x - 0.25) * MM + z, KNUCKLE_H / 2.0 * MM + x, TILT_AXIS_Z * MM + y),
    )
    return coords, faces


def shell_body(tbm, device_w, device_d, device_h):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    inner_w = device_w + 2.0 * CLEARANCE
    inner_d = device_d + CLEARANCE
    outer_w = inner_w + 2.0 * WALL
    outer_d = inner_d + WALL
    shell_h = device_h + 5.0

    body = box(tbm, 0, WALL / 2.0, shell_h / 2.0, outer_w, WALL, shell_h)
    for x in (-outer_w / 2.0 + WALL / 2.0, outer_w / 2.0 - WALL / 2.0):
        boolean(tbm, body, box(tbm, x, outer_d / 2.0, shell_h / 2.0, WALL, outer_d, shell_h), union)
    lip_x = outer_w / 2.0 - FRONT_LIP / 2.0
    for x in (-lip_x, lip_x):
        boolean(tbm, body, box(tbm, x, outer_d - WALL / 2.0, shell_h / 2.0, FRONT_LIP, WALL, shell_h), union)
    for x in (-0.4 * inner_w, -0.2 * inner_w, 0.0, 0.2 * inner_w, 0.4 * inner_w):
        boolean(tbm, body, box(tbm, x, outer_d / 2.0, 1.5, max(4.0, inner_w / 7.0), outer_d - 5.0, 3.0), union)

    boss_y = -CRADLE_BOSS_D / 2.0 + 0.1
    boss = box(tbm, 0, boss_y, shell_h / 2.0, CRADLE_BOSS_W, CRADLE_BOSS_D + 0.2, CRADLE_BOSS_H)
    boolean(tbm, body, boss, union)
    hub = box(tbm, 0, boss_y, shell_h / 2.0, CRADLE_BOSS_W, 16.0, 16.0)
    boolean(tbm, body, hub, union)
    square_bore = box(tbm, 0, boss_y, shell_h / 2.0, CRADLE_BOSS_W + 2.0, SQUARE_CLEAR, SQUARE_CLEAR)
    boolean(tbm, body, square_bore, diff)
    for step in range(1, 5):
        depth = step * 2.0
        z0 = shell_h / 2.0 - CRADLE_BOSS_H / 2.0 - 8.0 + (step - 1) * 2.0
        boolean(tbm, body, box(tbm, 0, -depth / 2.0 + 0.1, z0 + 1.1, CRADLE_BOSS_W, depth + 0.2, 2.2), union)
    return body, outer_w, outer_d, shell_h


def rain_cap(tbm, outer_w, outer_d):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    cap_w = outer_w + 6.5
    cap_d = outer_d + 12.0
    angle = math.radians(CAP_SLOPE)
    body = base.oriented_box(
        tbm, 0, 0, 5.2, cap_w, cap_d, 5.0,
        (1.0, 0.0, 0.0), (0.0, math.cos(angle), -math.sin(angle)),
    )
    boolean(tbm, body, box(tbm, 0, cap_d / 2.0 - 4.0, 1.8, cap_w, 8.0, 3.2), union)
    rail_x = outer_w / 2.0 + 1.2
    for x in (-rail_x, rail_x):
        boolean(tbm, body, box(tbm, x, -1.0, 2.2, 2.4, outer_d, 4.2), union)
    return body


def tpu_wall_gasket(tbm):
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    outer = base.rounded_plate(tbm, PLATE_W + 2.0, PLATE_H + 2.0, 1.5, PLATE_R + 1.0)
    inner = base.rounded_plate(tbm, PLATE_W - 6.0, PLATE_H - 6.0, 2.5, max(2.0, PLATE_R - 2.0))
    boolean(tbm, outer, inner, diff)
    return outer


def add_hybrid_component(design, breps, meshes, name, xyz=(0.0, 0.0, 0.0)):
    occurrence = design.rootComponent.occurrences.addNewComponent(base.placement(*xyz))
    component = occurrence.component
    component.name = name
    feature = component.features.baseFeatures.add()
    feature.startEdit()
    for index, body in enumerate(breps, 1):
        persisted = component.bRepBodies.add(body, feature)
        persisted.name = "%s_Solid_%02d" % (name, index)
    for index, (coords, faces) in enumerate(meshes, 1):
        mesh = component.meshBodies.addByTriangleMeshData(coords, faces, [], [])
        mesh.name = "%s_Mesh_%02d" % (name, index)
    feature.finishEdit()
    return component, occurrence


def add_parameters(design):
    definitions = (
        ("ratchet_teeth", "24", "Integrated 15 degree indexing"),
        ("square_drive", "8 mm", "Square shaft mechanically keys moving member"),
        ("printed_thread_major", "12.3 mm", "Printed thread outside diameter"),
        ("printed_thread_pitch", "2.5 mm", "Printed thread pitch"),
        ("wall_plate", "64 mm", "Universal wall plate width"),
        ("vhb_recess", "1.2 mm", "VHB recess depth"),
        ("shell_clearance", "0.75 mm", "Per-side device clearance"),
    )
    for name, expression, comment in definitions:
        unit = "mm" if expression.endswith(" mm") else ""
        design.userParameters.add(name, adsk.core.ValueInput.createByString(expression), unit, comment)


def export_component(design, component, filename):
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

        comp, _ = add_hybrid_component(
            design, [wall_base(tbm)], [wall_pan_fixed_ratchet()],
            "01_WallBase_IntegratedPanRatchet", (-125, 55, 0),
        )
        printable.append((comp, "01_WallBase_IntegratedPanRatchet.3mf"))

        comp, _ = add_hybrid_component(
            design, [knuckle(tbm)], [knuckle_tilt_fixed_ratchet()],
            "02_Knuckle_IntegratedTiltRatchet", (-55, 55, 0),
        )
        printable.append((comp, "02_Knuckle_IntegratedTiltRatchet.3mf"))

        x_positions = (20.0, 95.0, 180.0)
        for (label, device_w, device_d, device_h), x in zip(SIZES, x_positions):
            shell, outer_w, outer_d, shell_h = shell_body(tbm, device_w, device_d, device_h)
            comp, _ = add_hybrid_component(design, [shell], [], "03_Cradle_" + label, (x, -35, 0))
            printable.append((comp, "03_Cradle_%s.3mf" % label))
            cap = rain_cap(tbm, outer_w, outer_d)
            comp, _ = add_hybrid_component(design, [cap], [], "04_RainCap_" + label, (x, 100, 0))
            printable.append((comp, "04_RainCap_%s.3mf" % label))

        for label, smooth, xyz, phase in (
            ("Pan", PAN_SMOOTH, (-125, -95, 0), 0.5),
            ("Tilt", TILT_SMOOTH, (-80, -95, 0), 0.5),
        ):
            breps = handwheel_pin_breps(tbm, smooth)
            mesh = handwheel_pin_mesh(smooth, phase)
            comp, _ = add_hybrid_component(design, breps, [mesh], "05_%s_RatchetHandwheelPin" % label, xyz)
            printable.append((comp, "05_%s_RatchetHandwheelPin.3mf" % label))

        nut_meshes = []
        for index, x in enumerate((-13.0, 13.0)):
            coords, faces = base.clamp_nut_mesh(0.0)
            coords = transform_mesh(coords, lambda a, b, c, dx=x: (a + dx * MM, b, c))
            nut_meshes.append((coords, faces))
        nuts = concatenate_meshes(nut_meshes)
        comp, _ = add_hybrid_component(design, [], [nuts], "06_ThumbNuts_x2", (-25, -95, 0))
        printable.append((comp, "06_ThumbNuts_x2.3mf"))

        comp, _ = add_hybrid_component(design, [tpu_wall_gasket(tbm)], [], "07_TPU95A_WallGasket", (35, -105, 0))
        printable.append((comp, "07_TPU95A_WallGasket.3mf"))

        for component, filename in printable:
            export_component(design, component, filename)

        archive = design.exportManager.createFusionArchiveExportOptions(F3D_PATH)
        if not design.exportManager.execute(archive):
            raise RuntimeError("F3D export failed")

        app.activeViewport.fit()
        app.activeViewport.refresh()
        ui.messageBox(
            "Universele MakerWorld-mount gebouwd.\n\n"
            "Print slechts 8 delen: wandbasis, knokkel, 1 cradle, 1 kap, "
            "2 ratel-handwielassen en 2 handmoeren. TPU-dichting is optioneel.\n\n"
            "Geen losse tandkransen, ringen, lijm of frontbezel.\n"
            "S/M/L cradles staan als varianten in hetzelfde Fusion-bestand.\n\n"
            "Exportmap:\n" + OUTPUT_DIR
        )
    except Exception:
        if ui:
            ui.messageBox("Universal mount script error:\n" + traceback.format_exc())

