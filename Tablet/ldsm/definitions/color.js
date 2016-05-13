/* @flow */
"use strict";

let color = {};

color.rgb = (r, g, b) => {
	return "#" + r.toString(16) + g.toString(16) + b.toString(16);
};

color.white = "#FFFFFF";
color.white_overlay = "#4B4B4B";

color.transparent = "rgba(0,0,0,0)";

color.black = "#000000";
color.dark = "#1D1D1D";
color.light_dark = "#2A2A2A";
color.gray = "#717171";
color.light_gray = "#888888";
color.transparent_black = "rgba(0,0,0,0.7)";

color.light_yellow = "#F9BC1A";
color.yellow = "#FAA61A";

color.light_blue = "#00BABE";
color.light_blue_overlay = "#003739";
color.dark_blue = "#002C2B";

color.light_red = "#DA2128";
color.red = "#6E0005";
color.dark_red = "#440608";

color.light_green = "#39E612";
color.green = "#2F4A2B";
color.dark_green = "#082C00";

color.orange = "#F53118";

module.exports = color;