import { SlideNav } from "./slide.js";

const slide = new SlideNav(".slide", ".slide-wrap");
slide.init();
slide.addControl(".custom-control");
slide.addArrow(".prev", ".next");
