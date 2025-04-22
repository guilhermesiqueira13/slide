export default class Slide {
  constructor(slide, wrap) {
    this.slide = document.querySelector(slide);
    this.wrap = document.querySelector(wrap);
  }

  onStart(event) {
    event.preventDefault();
    this.wrap.addEventListener("mousemove", this.onMove);
  }
  onMove(event) {}
  onEnd(event) {
    this.wrap.removeEventListener("mousemove", this.onMove);
  }
  addSlideEvents() {
    this.wrap.addEventListener("mousedown", this.onStart);
  }
  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }
  init() {
    this.bindEvents();
    this.addSlideEvents();
    return this;
  }
}
