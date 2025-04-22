import { SlideNav } from "./slide.js";

const slide = new SlideNav(".slide", ".slide-wrap");
slide.init();
slide.addControl(); // Cria e vincula os controles (bolinhas)
slide.addArrow(".prev", ".next");
