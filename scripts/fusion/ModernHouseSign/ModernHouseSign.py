"""Build a modern, support-free house-number and name plaque in Fusion 360.

Edit SAMPLE_NUMBER and SAMPLE_NAME for a personalized export.  All dimensions
are millimetres; Fusion's API uses centimetres internally.

Print architecture:
- one hidden universal wall backplate (VHB recesses plus optional screw holes)
- one large press-on faceplate with six hidden locating pegs
- raised text and accent remain separate bodies inside the same 3MF for AMS
- blank and number-only faceplate variants are included
"""

from __future__ import annotations

import importlib.util
import os
import pathlib
import traceback

import adsk.core
import adsk.fusion


SAMPLE_NUMBER = "24"
SAMPLE_NAME = "DE SMET"

OUTPUT_DIR = r"C:\Users\donmi\Downloads\gologi\Modern_House_Number_Name_Plaque"
F3D_PATH = os.path.join(OUTPUT_DIR, "Modern_House_Number_Name_Plaque.f3d")
MM = 0.1

FACE_W = 175.0
FACE_H = 90.0
FACE_T = 4.2
FACE_R = 12.0
BACK_W = 171.0
BACK_H = 86.0
BACK_T = 4.8
BACK_R = 10.0
TEXT_RELIEF = 0.65
PEG_D = 4.0
PEG_H = 2.0
PEG_HOLE_D = 4.18
PEG_HOLE_DEPTH = 2.15


def load_base():
    source = pathlib.Path(__file__).resolve().parents[1] / "GologiDoorbellPDF" / "GologiDoorbellPDF.py"
    spec = importlib.util.spec_from_file_location("modern_sign_base", str(source))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


base = load_base()


def translated(body, x=0.0, y=0.0, z=0.0):
    transform = adsk.core.Matrix3D.create()
    transform.translation = adsk.core.Vector3D.create(x * MM, y * MM, z * MM)
    body.transform(transform)
    return body


def universal_backplate(tbm):
    union = adsk.fusion.BooleanTypes.UnionBooleanType
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    body = base.rounded_plate(tbm, BACK_W, BACK_H, BACK_T, BACK_R)

    # Two broad VHB fields leave a central stiffness spine and a clean tape edge.
    for x in (-42.0, 42.0):
        recess = base.box(tbm, x, 0.0, 0.65, 74.0, 62.0, 1.3)
        base.boolean(tbm, body, recess, diff)

    # Optional hidden wall screws; the front plate covers both heads completely.
    for x in (-70.0, 70.0):
        base.boolean(tbm, body, base.cylinder(tbm, x, 0.0, BACK_T / 2.0, 5.2, BACK_T + 2.0), diff)
        base.boolean(tbm, body, base.cylinder(tbm, x, 0.0, BACK_T - 0.9, 10.4, 2.2), diff)

    # Six short, chamfer-like locating pegs: large parts, no loose clips.
    for x, y in ((-70, -31), (0, -31), (70, -31), (-70, 31), (0, 31), (70, 31)):
        stem = base.cylinder(tbm, x, y, BACK_T + PEG_H * 0.46, PEG_D, PEG_H * 0.92)
        tip = base.cylinder(tbm, x, y, BACK_T + PEG_H * 0.92, PEG_D - 0.55, PEG_H * 0.16)
        base.boolean(tbm, body, stem, union)
        base.boolean(tbm, body, tip, union)
    return body


def faceplate_body(tbm):
    diff = adsk.fusion.BooleanTypes.DifferenceBooleanType
    body = base.rounded_plate(tbm, FACE_W, FACE_H, FACE_T, FACE_R)

    # Blind holes open on the print-up backside; the 2.05 mm front skin stays solid.
    for x, y in ((-70, -31), (0, -31), (70, -31), (-70, 31), (0, 31), (70, 31)):
        hole = base.cylinder(tbm, x, y, PEG_HOLE_DEPTH / 2.0, PEG_HOLE_D, PEG_HOLE_DEPTH)
        base.boolean(tbm, body, hole, diff)

    # Small bottom pry notch makes the face replaceable without visible fasteners.
    notch = base.box(tbm, 0.0, -FACE_H / 2.0 + 1.2, 0.8, 14.0, 3.0, 1.6)
    base.boolean(tbm, body, notch, diff)
    return body


def add_component(design, body, name, xyz):
    occurrence = design.rootComponent.occurrences.addNewComponent(base.placement(*xyz))
    component = occurrence.component
    component.name = name
    feature = component.features.baseFeatures.add()
    feature.startEdit()
    persisted = component.bRepBodies.add(body, feature)
    persisted.name = name + "_Main"
    feature.finishEdit()
    return component, occurrence


def add_relief_box(component, name, cx, cy, width, height, z0=FACE_T):
    tbm = adsk.fusion.TemporaryBRepManager.get()
    body = base.box(tbm, cx, cy, z0 + TEXT_RELIEF / 2.0, width, height, TEXT_RELIEF)
    feature = component.features.baseFeatures.add()
    feature.startEdit()
    persisted = component.bRepBodies.add(body, feature)
    persisted.name = name
    feature.finishEdit()
    return persisted


def add_text(component, text, height_mm, corner_a, corner_b, name, bold=True):
    plane_input = component.constructionPlanes.createInput()
    plane_input.setByOffset(component.xYConstructionPlane, adsk.core.ValueInput.createByReal(FACE_T * MM))
    plane = component.constructionPlanes.add(plane_input)
    plane.name = name + "_Plane"
    sketch = component.sketches.add(plane)
    sketch.name = name + "_Sketch"

    text_input = sketch.sketchTexts.createInput2(text, height_mm * MM)
    text_input.fontName = "Arial"
    if bold:
        text_input.textStyle = adsk.fusion.TextStyles.TextStyleBold
    ok = text_input.setAsMultiLine(
        base.point(corner_a[0], corner_a[1], 0),
        base.point(corner_b[0], corner_b[1], 0),
        adsk.core.HorizontalAlignments.CenterHorizontalAlignment,
        adsk.core.VerticalAlignments.MiddleVerticalAlignment,
        0.0,
    )
    if not ok:
        raise RuntimeError("Could not position sketch text: " + text)
    sketch_text = sketch.sketchTexts.add(text_input)
    extrudes = component.features.extrudeFeatures
    extrude_input = extrudes.createInput(sketch_text, adsk.fusion.FeatureOperations.NewBodyFeatureOperation)
    extrude_input.setDistanceExtent(False, adsk.core.ValueInput.createByReal(TEXT_RELIEF * MM))
    feature = extrudes.add(extrude_input)
    feature.name = name
    for index, body in enumerate(feature.bodies):
        body.name = "%s_%02d" % (name, index + 1)
    return feature


def fitted_text_height(text, maximum, available_width, width_factor=0.62, minimum=7.0):
    """Conservative font-size estimate so long names stay inside the plaque."""
    estimate = available_width / max(1.0, len(text) * width_factor)
    return max(minimum, min(maximum, estimate))


def decorate_combined(component):
    # Stacked typography gives long family names almost the full plaque width.
    add_relief_box(component, "Accent_Divider", 0.0, -10.0, 125.0, 2.6)
    number_height = fitted_text_height(SAMPLE_NUMBER, 47.0, 150.0, 0.82, 18.0)
    name_height = fitted_text_height(SAMPLE_NAME, 14.0, 151.0, 1.35, 4.4)
    add_text(component, SAMPLE_NUMBER, number_height, (-77.0, -6.0), (77.0, 39.0), "House_Number")
    add_text(component, SAMPLE_NAME, name_height, (-78.0, -40.0), (78.0, -17.0), "Family_Name")


def decorate_number_only(component):
    add_relief_box(component, "Accent_Underline", 0.0, -27.0, 72.0, 3.0)
    add_text(component, SAMPLE_NUMBER, 52.0, (-68.0, -28.0), (68.0, 31.0), "House_Number")


def add_parameters(design):
    params = (
        ("plaque_width", "%g mm" % FACE_W, "Modern front width; default fits A1 mini"),
        ("plaque_height", "%g mm" % FACE_H, "Modern front height"),
        ("front_thickness", "%g mm" % FACE_T, "Rigid outdoor faceplate"),
        ("text_relief", "%g mm" % TEXT_RELIEF, "AMS or manual colour-change relief"),
        ("peg_clearance", "%g mm" % (PEG_HOLE_D - PEG_D), "Diametral press-fit clearance"),
        ("screw_spacing", "140 mm", "Hidden optional wall screw spacing"),
    )
    for name, expression, comment in params:
        design.userParameters.add(name, adsk.core.ValueInput.createByString(expression), "mm", comment)


def export_component(design, component, filename):
    path = os.path.join(OUTPUT_DIR, filename)
    options = design.exportManager.createC3MFExportOptions(component, path)
    options.isOneFilePerBody = False
    options.sendToPrintUtility = False
    options.surfaceDeviation = 0.004
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

        exports = []
        back, _ = add_component(design, universal_backplate(tbm), "01_Universal_Backplate_VHB_or_Screws", (-105, 55, 0))
        exports.append((back, "01_Universal_Backplate_VHB_or_Screws.3mf"))

        combined, _ = add_component(design, faceplate_body(tbm), "02_Modern_Faceplate_24_DE_SMET_AMS", (85, 55, 0))
        decorate_combined(combined)
        exports.append((combined, "02_Modern_Faceplate_24_DE_SMET_AMS.3mf"))

        number_only, _ = add_component(design, faceplate_body(tbm), "03_Modern_Faceplate_24_Only_AMS", (-105, -55, 0))
        decorate_number_only(number_only)
        exports.append((number_only, "03_Modern_Faceplate_24_Only_AMS.3mf"))

        blank, _ = add_component(design, faceplate_body(tbm), "04_Modern_Faceplate_Blank", (85, -55, 0))
        exports.append((blank, "04_Modern_Faceplate_Blank.3mf"))

        for component, filename in exports:
            export_component(design, component, filename)

        archive = design.exportManager.createFusionArchiveExportOptions(F3D_PATH)
        if not design.exportManager.execute(archive):
            raise RuntimeError("F3D export failed")

        app.activeViewport.fit()
        app.activeViewport.refresh()
        ui.messageBox(
            "Modern huisnummer- en naambord gebouwd.\n\n"
            "Print 2 grote delen: 1 universele achterplaat en 1 gekozen front.\n"
            "Geen supports en geen losse letters. De tekstlichamen zitten voor AMS\n"
            "in dezelfde 3MF; zonder AMS werkt een laagkleurwissel ook.\n\n"
            "Voor personalisatie: pas SAMPLE_NUMBER en SAMPLE_NAME bovenaan het script aan.\n\n"
            "Exportmap:\n" + OUTPUT_DIR
        )
    except Exception:
        if ui:
            ui.messageBox("Modern house sign script error:\n" + traceback.format_exc())
