import { mouseDownHandler, scaleUpHandler } from "./eventHandler.js";
const dragContainer = document.querySelector(".dragContainer");
const circleContainer = document.querySelector(".circleContainer");
let boundMouseDownHandler;
let boundScaleUpHandler;
export function mouseDownEvent() {
  boundMouseDownHandler = mouseDownHandler.bind(null);
  dragContainer.addEventListener("mousedown", boundMouseDownHandler);
}

export function scaleUpEvent() {
  boundScaleUpHandler = scaleUpHandler.bind(null);
  circleContainer.addEventListener("mousemove", scaleUpHandler);
}
