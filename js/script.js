import { SlideNav } from "./slide.js";

const slide = new SlideNav(".slide", ".slide-wrap");
slide.init();
slide.addArrow(".prev", ".next");
