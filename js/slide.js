export default class Slide {
  constructor(slide, wrap) {
    this.slide = document.querySelector(slide);
    this.wrap = document.querySelector(wrap);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 };
    this.index = { prev: null, active: 0, next: null };
  }

  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  moveSlide(distX) {
    this.dist.movePosition = distX; // Fixed typo
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6;
    return this.dist.finalPosition - this.dist.movement;
  }

  onStart(event) {
    let moveType;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      moveType = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      moveType = "touchmove";
    }
    this.wrap.addEventListener(moveType, this.onMove);
  }

  onMove(event) {
    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
    this.transition(false);
  }

  onEnd(event) {
    const moveType = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrap.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }

  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== null) {
      this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== null) {
      this.activePrevSlide();
    } else {
      this.changeSlide(this.index.active);
    }
  }

  addSlideEvents() {
    this.wrap.addEventListener("mousedown", this.onStart);
    this.wrap.addEventListener("touchstart", this.onStart);
    this.wrap.addEventListener("mouseup", this.onEnd);
    this.wrap.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  slidePosition(slide) {
    const margin = (this.wrap.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slideConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
    this.slidesIndexNav(0);
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index > 0 ? index - 1 : null,
      active: index,
      next: index < last ? index + 1 : null,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    if (activeSlide) {
      this.moveSlide(activeSlide.position);
      this.slidesIndexNav(index);
      this.dist.finalPosition = activeSlide.position;
    } else {
      console.error("Invalid slide index:", index);
    }
  }

  activePrevSlide() {
    if (this.index.prev !== null) {
      this.changeSlide(this.index.prev);
    }
  }

  activeNextSlide() {
    if (this.index.next !== null) {
      this.changeSlide(this.index.next);
    }
  }

  init() {
    this.bindEvents();
    this.transition(true);
    this.addSlideEvents();
    this.slideConfig();

    return this;
  }
}
