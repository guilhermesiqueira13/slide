export default class Slide {
  constructor(slide, wrap) {
    this.slide = document.querySelector(slide);
    this.wrap = document.querySelector(wrap);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
  }

  moveSlide(distX) {
    this.dist.movePostion = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePostion(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    event.preventDefault();
    this.dist.startX = event.clientX;
    this.wrap.addEventListener("mousemove", this.onMove);
  }

  onMove(event) {
    const finalPosition = this.updatePostion(event.clientX);
    this.moveSlide(finalPosition);
  }

  onEnd() {
    this.wrap.removeEventListener("mousemove", this.onMove);
    this.dist.finalPosition = this.dist.movePostion;
  }

  addSlideEvents() {
    this.wrap.addEventListener("mousedown", this.onStart);
    this.wrap.addEventListener("mouseup", this.onEnd);
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
