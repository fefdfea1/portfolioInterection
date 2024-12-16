import {
  rotateValueExtraction,
  translateXValueExtraction,
  translateYValueExtraction,
  translateZValueExtraction,
} from "../script/rotateValueExtraction/rotateValueExtraction.js";
import { lerp } from "./lerp.js";
import { rotateDegCalc } from "./rotateDegCalc.js";

const circleContainer = document.querySelector(".circleContainer");
const ItemRotateSpeed = 0.4;
const rotateSpeed = 0.2;
const MAX_TranslateX = -120;
const MIN_TranslateX = 0.01;
const friction = 0.97;
const mouseSpeed = 0.2;
let calcMouseSpeed = 0;
let prevMousePositionY = 0;
let currentVelocity = 0;
let animationFrameId = null;
let isInfiniteCardMoveTop = false;
let isInfiniteCardMoveBottom = false;
let totalFirstRotateDeg = 0;
let lastTime = Date.now();
export function mouseDownHandler() {
  clearHandler();
  window.addEventListener("mousemove", mouseMoveHandler);
  window.addEventListener("mouseup", mouseUpHandler);
  window.addEventListener("mouseleave", leaveHandler);
}
export function scaleUpHandler() {}

function animateWithInertia() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  let items = document.querySelectorAll(".circleItem");

  // currentVelocity 업데이트
  currentVelocity = calcMoveValue(currentVelocity, friction);

  if (currentVelocity === null) {
    cancelAnimationFrame(animationFrameId);
    currentVelocity = 0;
    return;
  }
  for (let i = 0; i < items.length; i++) {
    const translateX = translateXValueExtraction(items[i]);
    let rotate = rotateValueExtraction(items[i]);
    applyStyle(
      items[i],
      translateX + currentVelocity * ItemRotateSpeed,
      rotate + currentVelocity * rotateSpeed
    );
    infiniteCardMoveHandler(items[0], items[items.length - 1], calcMouseSpeed);
  }

  animationFrameId = requestAnimationFrame(animateWithInertia);
}

export function calcMoveValue(currentVelocity, friction) {
  let velocity = currentVelocity;

  function animate() {
    // 매 프레임마다 속도에 마찰 계수를 곱해 감속
    velocity *= friction;
    currentVelocity = velocity;
    if (Math.abs(velocity) < 0.1) {
      return null;
    }

    return velocity;
  }

  return animate();
}

function infiniteCardMoveHandler(firstItem, lastItem, moveX) {
  const firstItemRotate = rotateValueExtraction(firstItem);
  const lastItemRotate = rotateValueExtraction(lastItem);
  if (firstItemRotate <= totalFirstRotateDeg - 22.5 && !isInfiniteCardMoveTop) {
    isInfiniteCardMoveTop = true;
    console.log(firstItemRotate);
    infiniteCardMove(firstItem, lastItem, moveX);
  } else if (lastItemRotate >= 40 && !isInfiniteCardMoveTop) {
    isInfiniteCardMoveTop = true;
    infiniteCardMove(firstItem, lastItem, moveX - 22.5, moveRotate);
  }
}

function infiniteCardMove(firstItem, lastItem, moveX) {
  // DOM 업데이트를 위한 시간 필요
  // 스타일 적용
  totalFirstRotateDeg = rotateValueExtraction(firstItem) + 22.5;

  lastItem.style.transform = `rotate(${totalFirstRotateDeg}deg) translateX(0.01px) translateY(-70vh)`;

  lastItem.remove();
  circleContainer.insertAdjacentElement("afterbegin", lastItem);
  isInfiniteCardMoveTop = false; // 플래그 리셋
}

function mouseMoveHandler(event) {
  let items = document.querySelectorAll(".circleItem");
  const currentTime = Date.now();
  const deltaTime = currentTime - lastTime; // 초 단위로 변환
  const deltaY = event.clientY - prevMousePositionY;

  // 속력 계산 (pixels per second)
  calcMouseSpeed = (deltaY / deltaTime) * mouseSpeed;

  // 방향을 포함한 속도 계산 (음수값은 위로 이동, 양수값은 아래로 이동)
  currentVelocity = (deltaY / deltaTime) * -1;

  for (let i = 0; i < items.length; i++) {
    const translateX = translateXValueExtraction(items[i]);

    let rotate = rotateValueExtraction(items[i]);
    let moveX = translateX - calcMouseSpeed;
    let moveRotate = rotate - calcMouseSpeed;
    const moveTranslateX = Math.max(
      MAX_TranslateX,
      Math.min(MIN_TranslateX, moveX)
    );
    applyStyle(items[i], moveTranslateX, moveRotate);
    infiniteCardMoveHandler(items[0], items[items.length - 1], moveTranslateX);
  }

  lastTime = currentTime;
  prevMousePositionY = event.clientY;
}

function mouseUpHandler() {
  animateWithInertia();
  clearHandler();
}

function applyStyle(items, translateX, rotateY) {
  items.style.transform = `rotate(${rotateY}deg) translateY(-70vh)`;
}

function leaveHandler() {}

function clearHandler() {
  window.removeEventListener("mousemove", mouseMoveHandler);
  window.removeEventListener("mouseup", mouseUpHandler);
  window.removeEventListener("mouseleave", leaveHandler);
}

// 마우스를 클릭하면 현재 마우스 좌표를 저장하고 이동범위를 계산한다.
// 클릭시 마우스 무브및 업 이벤트를 발생시킨다.
// 마우스를 드래그시 드래그 되는 위치로 각각의 items의 translate3d 값으로 위치를 이동시켜 원형의 형태로 움직이도록 만든다
// 관성을 적용하여 모바일에서 드래그하는 듯한 효과를 준다.
// 마우스를 떼면 이벤트들을 클린업 한다.
// 전체 이벤트는 Z-index로 조절하면 되기에 그냥 지역변수로 사용
// 가운데에 오는 카드의 Z-index를 조절하여 가운데에 오는 효과를 준다.
// 마우스를 올린 카드 또한 가운 데의 카드처럼 Z-index를 조절하여 focus된 효과를 준다  .
