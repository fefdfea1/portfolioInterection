import { color } from "./color.js";
import { mouseDownEvent, scaleUpEvent } from "./utils/event.js";
import { rotateDegCalc } from "./utils/rotateDegCalc.js";
const circleContainer = document.querySelector(".circleContainer");
const dragContainer = document.querySelector(".dragContainer");
const rotateLength = 8;
const density = 100;
class CircleItem {
  constructor(density, createLength) {
    this.rotateLength = rotateDegCalc(createLength);
    this.density = density;
    this.createLength = createLength;
    for (let i = 0; i < createLength; i++) {
      this.createItem(i, this.rotateLength);
    }
  }

  createItem(index) {
    const item = document.createElement("div");
    item.classList.add("circleItem");
    item.style.width = "282px";
    item.style.height = "568px";
    item.style.backgroundColor = color[color.length - 2 - index];
    circleContainer.appendChild(item);
  }

  animation(Deg) {
    const items = document.querySelectorAll(".circleItem");
    items.forEach((item, index) => {
      item.style.transform = `rotate(${
        -Deg * index
      }deg) translateX(0)  translateY(-70vh)`;
      item.setAttribute("data-rotatedeg", -Deg * index);
    });
  }

  eventListener() {
    mouseDownEvent();
    scaleUpEvent();
  }

  init() {
    dragContainer.style.width = window.innerWidth + "px";
    dragContainer.style.height = window.innerHeight + "px";
    circleContainer.style.transform = "translateX(1800px)";
  }
}

const createCircle = new CircleItem(density, rotateLength);

window.onload = () => {
  const Deg = rotateDegCalc(rotateLength);
  Sticker.init(".sticker");
  createCircle.init();
  createCircle.animation(Deg);
  createCircle.eventListener();
};
