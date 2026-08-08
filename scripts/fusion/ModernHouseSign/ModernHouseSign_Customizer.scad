/* [Personalization] */
house_number = "24";
family_name = "DE SMET";

/* [Output] */
output_mode = "Frontplate"; // [Frontplate,Backplate,Both laid out,Assembled preview]
show_divider = true;

/* [Plaque size] */
plaque_width = 175; // [150:5:250]
plaque_height = 90; // [75:5:130]
corner_radius = 12; // [6:1:20]
front_thickness = 4.2; // [3.2:0.2:6]

/* [Typography] */
font_name = "Liberation Sans:style=Bold";
number_max_size = 47; // [24:1:65]
name_max_size = 14; // [8:1:24]
text_relief = 0.65; // [0.4:0.05:1.2]
side_margin = 12; // [8:1:24]

/* [Fit and mounting] */
peg_clearance = 0.18; // [0.10:0.02:0.40]
screw_hole_diameter = 5.2; // [3.5:0.1:7]

/* [Hidden] */
$fn = 48;
back_thickness = 4.8;
peg_diameter = 4.0;
peg_height = 2.0;
peg_hole_depth = 2.15;

function clamp(v, lo, hi) = min(max(v, lo), hi);
function fitted_size(value, maximum, available, width_factor, minimum) =
    clamp(available / max(1, len(value) * width_factor), minimum, maximum);

// Conservative factors prevent wide capitals (W/M) and long names from clipping.
name_size = fitted_size(family_name, name_max_size, plaque_width - 2 * side_margin, 1.35, 4.4);
number_size = fitted_size(house_number, number_max_size, plaque_width - 2 * side_margin, 0.82, 18);
back_width = plaque_width - 4;
back_height = plaque_height - 4;
peg_x = back_width / 2 - 15.5;
peg_y = back_height / 2 - 12;

module rounded_plate(w, h, t, r) {
    linear_extrude(height=t)
        offset(r=r)
            square([w - 2*r, h - 2*r], center=true);
}

module mounting_positions() {
    for (x = [-peg_x, 0, peg_x])
        for (y = [-peg_y, peg_y])
            translate([x, y, 0]) children();
}

module front_base() {
    difference() {
        rounded_plate(plaque_width, plaque_height, front_thickness, corner_radius);
        mounting_positions()
            translate([0, 0, -0.01])
                cylinder(h=peg_hole_depth + 0.02, d=peg_diameter + peg_clearance);
        translate([0, -plaque_height/2 + 1.2, -0.01])
            cube([14, 3, 1.62], center=true);
    }
}

module front_graphics() {
    available = plaque_width - 2 * side_margin;
    color("White") {
        translate([0, plaque_height*0.16, front_thickness])
            linear_extrude(text_relief)
                text(house_number, size=number_size, font=font_name, halign="center", valign="center");
        translate([0, -plaque_height*0.32, front_thickness])
            linear_extrude(text_relief)
                text(family_name, size=name_size, font=font_name, halign="center", valign="center");
        if (show_divider)
            translate([0, -plaque_height*0.12, front_thickness + text_relief/2])
                cube([min(125, available), 2.6, text_relief], center=true);
    }
}

module frontplate() {
    color("#25282A") front_base();
    front_graphics();
}

module backplate() {
    difference() {
        union() {
            color("#55585A") rounded_plate(back_width, back_height, back_thickness, max(4, corner_radius - 2));
            mounting_positions() {
                translate([0, 0, back_thickness])
                    cylinder(h=peg_height*0.84, d=peg_diameter);
                translate([0, 0, back_thickness + peg_height*0.84])
                    cylinder(h=peg_height*0.16, d1=peg_diameter, d2=peg_diameter - 0.55);
            }
        }
        for (x = [-back_width*0.25, back_width*0.25])
            translate([x, 0, -0.01])
                cube([back_width*0.43, back_height - 24, 1.32], center=true);
        for (x = [-back_width/2 + 15.5, back_width/2 - 15.5]) {
            translate([x, 0, -0.5]) cylinder(h=back_thickness + 1, d=screw_hole_diameter);
            translate([x, 0, back_thickness - 1.8]) cylinder(h=2, d=screw_hole_diameter * 2);
        }
    }
}

if (output_mode == "Frontplate") {
    frontplate();
} else if (output_mode == "Backplate") {
    backplate();
} else if (output_mode == "Both laid out") {
    translate([0, plaque_height/2 + 5, 0]) frontplate();
    translate([0, -back_height/2 - 5, 0]) backplate();
} else {
    backplate();
    translate([0, 0, back_thickness]) frontplate();
}
