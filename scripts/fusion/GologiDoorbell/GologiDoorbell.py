r"""Build a printable Gologi doorbell mounting kit in Autodesk Fusion.

Reference source: C:\Users\donmi\Downloads\STL\beugel.obj
All design dimensions below are millimetres. Fusion's API uses centimetres.

Print strategy:
- Structural parts: PETG/ASA, 0.2 mm layers, 4 walls, 35% infill.
- Thread clearance is built into the companion nuts (0.30-0.35 mm radial).
- Hinge pins are 9.0 mm and the redesigned bracket bore is 9.4 mm.
- Ratchet faces print flat and use 24 indexed ramps at 15 degrees.
- Snap arms are 1.4 mm and intended for PETG/ASA, not brittle PLA.
- TPU gasket is exported separately and prints flat without supports.
"""

from __future__ import annotations

import math
import os
import traceback

import adsk.core
import adsk.fusion


SOURCE_OBJ = r"C:\Users\donmi\Downloads\STL\beugel.obj"
OUTPUT_DIR = r"C:\Users\donmi\Downloads\STL\Gologi_Doorbell_Printkit"
F3D_PATH = os.path.join(OUTPUT_DIR, "Gologi_Doorbell_Printkit.f3d")

MM = 0.1

# Source bounds: 31.36 x 24.55 x 39.52 mm.
SOURCE_W = 31.36
SOURCE_D = 24.55
SOURCE_H = 39.52

PIN_DIAMETER = 9.0
PIN_BORE = 9.4
HANDWHEEL_DIAMETER = 24.0
HANDWHEEL_GRIPS = 10
THREAD_MAJOR = 8.0
THREAD_CORE = 6.4
THREAD_PITCH = 2.5
THREAD_LENGTH = 18.0
RATCHET_TEETH = 24
RATCHET_STEP_DEG = 15.0
VHB_W = 46.0
VHB_H = 54.0
PLATE_W = 52.0
PLATE_H = 60.0
PLATE_T = 4.0
VHB_RECESS = 0.8
GASKET_T = 1.2


def point(x: float, y: float, z: float) -> adsk.core.Point3D:
    return adsk.core.Point3D.create(x * MM, y * MM, z * MM)


def vector(x: float, y: float, z: float) -> adsk.core.Vector3D:
    return adsk.core.Vector3D.create(x, y, z)


def box(tbm, cx, cy, cz, dx, dy, dz, angle=0.0):
    length_dir = vector(math.cos(angle), math.sin(angle), 0)
    width_dir = vector(-math.sin(angle), math.cos(angle), 0)
    obb = adsk.core.OrientedBoundingBox3D.create(
        point(cx, cy, cz), length_dir, width_dir, dx * MM, dy * MM, dz * MM
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


def boolean(tbm, target, tool, op):
    if not tbm.booleanOperation(target, tool, op):
        raise RuntimeError("Temporary BRep boolean failed")
    return target


def translate_body(tbm, body, x=0.0, y=0.0, z=0.0):
    matrix = adsk.core.Matrix3D.create()
    matrix.translation = vector(x * MM, y * MM, z * MM)
    tbm.transform(body, matrix)
    return body


def add_brep_component(design, body, name):
    occurrence = design.rootComponent.occurrences.addNewComponent(adsk.core.Matrix3D.create())
    component = occurrence.component
    component.name = name
    base = component.features.baseFeatures.add()
    base.startEdit()
    persisted = component.bRepBodies.add(body, base)
    persisted.name = name
    base.finishEdit()
    return component


def add_mesh_component(design, coordinates, indices, name):
    occurrence = design.rootComponent.occurrences.addNewComponent(adsk.core.Matrix3D.create())
    component = occurrence.component
    component.name = name
    base = component.features.baseFeatures.add()
    base.startEdit()
    mesh = component.meshBodies.addByTriangleMeshData(coordinates, indices, [], [])
    mesh.name = name
    base.finishEdit()
    return component


def add_quad(faces, a, b, c, d):
    faces.extend((a, b, c, a, c, d))


def handwheel_thread_mesh(cx, cy, z0, phase=0.0):
    """Single watertight star handwheel flowing into an external helical stud."""
    n = 120
    wheel_h = 8.0
    stud_rings = max(48, int(THREAD_LENGTH / THREAD_PITCH * 12))
    coords = []
    faces = []

    def addv(x, y, z):
        coords.extend((x * MM, y * MM, z * MM))
        return len(coords) // 3 - 1

    def wheel_radius(theta):
        # Ten broad printable grips, Ø24 mm at the peaks.
        return HANDWHEEL_DIAMETER / 2.0 - 1.1 + 1.1 * (0.5 + 0.5 * math.cos(HANDWHEEL_GRIPS * theta))

    def thread_radius(theta, axial_z):
        local_phase = ((axial_z / THREAD_PITCH) - theta / (2.0 * math.pi) + phase) % 1.0
        ridge = max(0.0, 1.0 - abs(local_phase - 0.5) / 0.24)
        end_fade = min(1.0, axial_z / 1.2, (THREAD_LENGTH - axial_z) / 1.2)
        return THREAD_CORE / 2.0 + (THREAD_MAJOR - THREAD_CORE) / 2.0 * ridge * max(0.0, end_fade)

    outer_bottom = []
    outer_top = []
    for i in range(n):
        theta = 2.0 * math.pi * i / n
        r = wheel_radius(theta)
        outer_bottom.append(addv(cx + r * math.cos(theta), cy + r * math.sin(theta), z0))
        outer_top.append(addv(cx + r * math.cos(theta), cy + r * math.sin(theta), z0 + wheel_h))

    screw_rings = []
    for ring_index in range(stud_rings + 1):
        axial_z = THREAD_LENGTH * ring_index / stud_rings
        ring = []
        for i in range(n):
            theta = 2.0 * math.pi * i / n
            r = thread_radius(theta, axial_z)
            ring.append(addv(cx + r * math.cos(theta), cy + r * math.sin(theta), z0 + wheel_h + axial_z))
        screw_rings.append(ring)

    bottom_center = addv(cx, cy, z0)
    top_center = addv(cx, cy, z0 + wheel_h + THREAD_LENGTH)
    for i in range(n):
        j = (i + 1) % n
        faces.extend((bottom_center, outer_bottom[j], outer_bottom[i]))
        add_quad(faces, outer_bottom[i], outer_bottom[j], outer_top[j], outer_top[i])
        add_quad(faces, outer_top[i], outer_top[j], screw_rings[0][j], screw_rings[0][i])
        for k in range(stud_rings):
            add_quad(faces, screw_rings[k][i], screw_rings[k][j], screw_rings[k + 1][j], screw_rings[k + 1][i])
        faces.extend((top_center, screw_rings[-1][i], screw_rings[-1][j]))

    return coords, faces


def internal_thread_nut_mesh(cx, cy, z0, phase=0.0):
    """Watertight printed companion nut with oversized M8x2.5 helical bore."""
    n = 120
    h = 8.0
    rings = 48
    coords = []
    faces = []

    def addv(x, y, z):
        coords.extend((x * MM, y * MM, z * MM))
        return len(coords) // 3 - 1

    def hex_radius(theta):
        a = 7.2  # across-flats 14.4 mm
        folded = ((theta + math.pi / 6.0) % (math.pi / 3.0)) - math.pi / 6.0
        return a / math.cos(folded)

    def bore_radius(theta, axial_z):
        local_phase = ((axial_z / THREAD_PITCH) - theta / (2.0 * math.pi) + phase) % 1.0
        ridge = max(0.0, 1.0 - abs(local_phase - 0.5) / 0.27)
        return 3.5 + 0.85 * ridge

    outer_bottom, outer_top = [], []
    inner_rings = []
    for i in range(n):
        theta = 2.0 * math.pi * i / n
        ro = hex_radius(theta)
        outer_bottom.append(addv(cx + ro * math.cos(theta), cy + ro * math.sin(theta), z0))
        outer_top.append(addv(cx + ro * math.cos(theta), cy + ro * math.sin(theta), z0 + h))

    for ring_index in range(rings + 1):
        axial_z = h * ring_index / rings
        ring = []
        for i in range(n):
            theta = 2.0 * math.pi * i / n
            ri = bore_radius(theta, axial_z)
            ring.append(addv(cx + ri * math.cos(theta), cy + ri * math.sin(theta), z0 + axial_z))
        inner_rings.append(ring)

    for i in range(n):
        j = (i + 1) % n
        add_quad(faces, outer_bottom[i], outer_bottom[j], outer_top[j], outer_top[i])
        add_quad(faces, outer_bottom[j], outer_bottom[i], inner_rings[0][i], inner_rings[0][j])
        add_quad(faces, outer_top[i], outer_top[j], inner_rings[-1][j], inner_rings[-1][i])
        for k in range(rings):
            # Reverse orientation because this is an internal surface.
            add_quad(faces, inner_rings[k][j], inner_rings[k][i], inner_rings[k + 1][i], inner_rings[k + 1][j])

    return coords, faces


def ratchet_face_mesh(cx, cy, z0, phase=0.0):
    """Face-serrated annular ring: 24 symmetric indexed ramps at 15 degrees."""
    n = RATCHET_TEETH * 6
    outer_r = 13.0
    inner_r = PIN_BORE / 2.0
    base_t = 2.2
    tooth_h = 1.5
    coords = []
    faces = []

    def addv(x, y, z):
        coords.extend((x * MM, y * MM, z * MM))
        return len(coords) // 3 - 1

    ob, ib, ot, it = [], [], [], []
    for i in range(n):
        theta = 2.0 * math.pi * i / n
        cycle = (i / 6.0 + phase) % 1.0
        ramp = 1.0 - abs(2.0 * cycle - 1.0)
        ztop = z0 + base_t + tooth_h * ramp
        c, s = math.cos(theta), math.sin(theta)
        ob.append(addv(cx + outer_r * c, cy + outer_r * s, z0))
        ib.append(addv(cx + inner_r * c, cy + inner_r * s, z0))
        ot.append(addv(cx + outer_r * c, cy + outer_r * s, ztop))
        it.append(addv(cx + inner_r * c, cy + inner_r * s, ztop))

    for i in range(n):
        j = (i + 1) % n
        add_quad(faces, ob[i], ob[j], ot[j], ot[i])
        add_quad(faces, ib[j], ib[i], it[i], it[j])
        add_quad(faces, ob[j], ob[i], ib[i], ib[j])
        add_quad(faces, ot[i], ot[j], it[j], it[i])
    return coords, faces


def redesigned_bracket(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    arm_t = 9.4
    side_w = 8.4
    body = box(tbm, -SOURCE_W / 2.0 + side_w / 2.0, 0, 0, side_w, SOURCE_D, SOURCE_H)
    top = box(tbm, 0, 0, SOURCE_H / 2.0 - arm_t / 2.0, SOURCE_W, SOURCE_D, arm_t)
    bottom = box(tbm, 0, 0, -SOURCE_H / 2.0 + arm_t / 2.0, SOURCE_W, SOURCE_D, arm_t)
    boolean(tbm, body, top, union)
    boolean(tbm, body, bottom, union)

    # One aligned Ø9.4 mm hinge passage through both arms.
    pivot_x = -7.2
    bore = cylinder(tbm, pivot_x, 0, 0, PIN_BORE, SOURCE_H + 4.0, "Z")
    boolean(tbm, body, bore, diff)

    # M8 printed clamp boss and generous 8.6 mm printed clearance hole.
    boss = cylinder(tbm, SOURCE_W / 2.0 + 2.5, 0, 0, 14.0, 5.0, "X")
    boolean(tbm, body, boss, union)
    clamp_hole = cylinder(tbm, SOURCE_W / 2.0 + 2.5, 0, 0, 8.6, 12.0, "X")
    boolean(tbm, body, clamp_hole, diff)
    return body


def wall_plate(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    body = box(tbm, 0, 0, PLATE_T / 2.0, PLATE_W, PLATE_H, PLATE_T)
    recess = box(tbm, 0, 0, VHB_RECESS / 2.0 - 0.05, VHB_W, VHB_H, VHB_RECESS + 0.1)
    boolean(tbm, body, recess, diff)
    # Plus-shaped load spreader on the device side.
    boolean(tbm, body, box(tbm, 0, 0, PLATE_T + 1.0, 4.0, PLATE_H - 6.0, 2.0), union)
    boolean(tbm, body, box(tbm, 0, 0, PLATE_T + 1.0, PLATE_W - 6.0, 4.0, 2.0), union)
    return body


def tpu_gasket(tbm):
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    outer = box(tbm, 0, 0, GASKET_T / 2.0, PLATE_W, PLATE_H, GASKET_T)
    inner = box(tbm, 0, 0, GASKET_T / 2.0, VHB_W, VHB_H, GASKET_T + 1.0)
    boolean(tbm, outer, inner, diff)
    return outer


def snap_bezel(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    outer_w, outer_h, inner_w, inner_h = 39.0, 47.0, 32.2, 40.4
    frame_t = 3.0
    body = box(tbm, 0, 0, frame_t / 2.0, outer_w, outer_h, frame_t)
    opening = box(tbm, 0, 0, frame_t / 2.0, inner_w, inner_h, frame_t + 2.0)
    boolean(tbm, body, opening, diff)

    # Four cantilever clips over the front lips. 1.4 mm arms + short barbs.
    arm_t, arm_w, arm_h = 1.4, 6.0, 7.0
    for side in (-1, 1):
        x = side * (inner_w / 2.0 + arm_t / 2.0)
        for y in (-11.0, 11.0):
            arm = box(tbm, x, y, frame_t + arm_h / 2.0, arm_t, arm_w, arm_h)
            boolean(tbm, body, arm, union)
            barb_x = x - side * 0.55
            barb = box(tbm, barb_x, y, frame_t + arm_h - 0.6, 1.1, arm_w, 1.2)
            boolean(tbm, body, barb, union)
    return body


def hinge_pin(tbm, length):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    pin = cylinder(tbm, 0, 0, length / 2.0, PIN_DIAMETER, length, "Z")
    head = cylinder(tbm, 0, 0, 1.3, 13.0, 2.6, "Z")
    boolean(tbm, pin, head, union)
    return pin


def add_parameters(design):
    params = design.userParameters
    definitions = (
        ("handwheel_diameter", "24 mm", "Printed handwheel outer diameter"),
        ("handwheel_grips", "10", "Number of grip lobes"),
        ("thread_nominal", "8 mm", "Printed thread nominal diameter"),
        ("thread_pitch", "2.5 mm", "Coarse FDM thread pitch"),
        ("hinge_pin_diameter", "9 mm", "Printed hinge pin diameter"),
        ("hinge_bore_diameter", "9.4 mm", "FDM running clearance bore"),
        ("ratchet_teeth", "24", "Hirth-like face tooth count"),
        ("ratchet_index_angle", "15 deg", "Mechanical indexing step"),
        ("vhb_recess_width", "46 mm", "VHB adhesive recess width"),
        ("vhb_recess_height", "54 mm", "VHB adhesive recess height"),
        ("tpu_gasket_thickness", "1.2 mm", "Separate TPU gasket thickness"),
    )
    for name, expression, comment in definitions:
        unit = ""
        if expression.endswith(" mm"):
            unit = "mm"
        elif expression.endswith(" deg"):
            unit = "deg"
        params.add(name, adsk.core.ValueInput.createByString(expression), unit, comment)


def import_reference(design):
    transform = adsk.core.Matrix3D.create()
    transform.translation = vector(-100.0 * MM, 0, 0)
    occurrence = design.rootComponent.occurrences.addNewComponent(transform)
    component = occurrence.component
    component.name = "00_REFERENCE_beugel_OBJ"
    base = component.features.baseFeatures.add()
    base.startEdit()
    imported = component.meshBodies.add(SOURCE_OBJ, adsk.fusion.MeshUnits.MeterMeshUnit, base)
    for index in range(imported.count):
        body = imported.item(index)
        body.name = "REFERENCE_%02d" % (index + 1)
        body.opacity = 0.28
    base.finishEdit()
    return component


def export_component_3mf(design, component, filename):
    manager = design.exportManager
    path = os.path.join(OUTPUT_DIR, filename)
    options = manager.createC3MFExportOptions(component, path)
    options.isOneFilePerBody = False
    options.sendToPrintUtility = False
    options.surfaceDeviation = 0.005  # 0.05 mm, Fusion uses cm.
    if not manager.execute(options):
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

        import_reference(design)

        printable = []

        bracket_body = translate_body(tbm, redesigned_bracket(tbm), -42.0, 0, 0)
        printable.append((add_brep_component(design, bracket_body, "01_Bracket_v2_PIN9_BORE9p4"), "01_Bracket_v2.3mf"))

        plate_body = translate_body(tbm, wall_plate(tbm), 18.0, 0, 0)
        printable.append((add_brep_component(design, plate_body, "02_Wallplate_VHB46x54_Crossrib"), "02_Wallplate_VHB46x54.3mf"))

        bezel_body = translate_body(tbm, snap_bezel(tbm), 78.0, 0, 0)
        printable.append((add_brep_component(design, bezel_body, "03_SnapBezel_4Clips"), "03_SnapBezel.3mf"))

        gasket_body = translate_body(tbm, tpu_gasket(tbm), 18.0, -72.0, 0)
        printable.append((add_brep_component(design, gasket_body, "04_TPU_Gasket"), "04_TPU_Gasket.3mf"))

        for index, x in enumerate((-35.0, 0.0)):
            coords, faces = handwheel_thread_mesh(x, -78.0, 0.0, phase=0.5 * index)
            printable.append((add_mesh_component(design, coords, faces, "05_Handwheel_%s_M8x2p5" % ("A" if index == 0 else "B")), "05_Handwheel_%s.3mf" % ("A" if index == 0 else "B")))

        for index, x in enumerate((35.0, 55.0)):
            coords, faces = internal_thread_nut_mesh(x, -78.0, 0.0, phase=0.5 * index)
            printable.append((add_mesh_component(design, coords, faces, "06_ClampNut_%s_M8x2p5" % ("A" if index == 0 else "B")), "06_ClampNut_%s.3mf" % ("A" if index == 0 else "B")))

        ratchet_positions = ((-45.0, 65.0), (-15.0, 65.0), (20.0, 65.0), (50.0, 65.0))
        ratchet_names = ("AxisA_Fixed", "AxisA_Moving", "AxisB_Fixed", "AxisB_Moving")
        for index, ((x, y), name) in enumerate(zip(ratchet_positions, ratchet_names)):
            coords, faces = ratchet_face_mesh(x, y, 0.0, phase=0.5 if index % 2 else 0.0)
            printable.append((add_mesh_component(design, coords, faces, "07_Ratchet24_%s" % name), "07_Ratchet24_%s.3mf" % name))

        pin_a = translate_body(tbm, hinge_pin(tbm, 36.0), 82.0, -68.0, 0)
        printable.append((add_brep_component(design, pin_a, "08_HingePin_A_D9_L36"), "08_HingePin_A.3mf"))
        pin_b = translate_body(tbm, hinge_pin(tbm, 46.0), 102.0, -68.0, 0)
        printable.append((add_brep_component(design, pin_b, "08_HingePin_B_D9_L46"), "08_HingePin_B.3mf"))

        for component, filename in printable:
            export_component_3mf(design, component, filename)

        archive = design.exportManager.createFusionArchiveExportOptions(F3D_PATH)
        if not design.exportManager.execute(archive):
            raise RuntimeError("F3D export failed")

        app.activeViewport.fit()
        app.activeViewport.refresh()
        ui.messageBox(
            "Gologi printkit gebouwd.\n\n"
            "- Referentie-OBJ op ware schaal (meter -> mm)\n"
            "- Handwielen Ø24 / 10 grepen / M8x2.5\n"
            "- Ø9 pennen en Ø9.4 passingen\n"
            "- 4 kransen, 24 tanden / 15°\n"
            "- Snapbezel, VHB 46x54 en TPU-ring\n\n"
            "F3D + afzonderlijke 3MF-bestanden:\n" + OUTPUT_DIR
        )
    except Exception:
        if ui:
            ui.messageBox("Gologi-scriptfout:\n" + traceback.format_exc())
