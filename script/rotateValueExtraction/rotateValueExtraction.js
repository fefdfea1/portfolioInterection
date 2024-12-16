export function rotateValueExtraction(circleContainer) {
  const CurrentRotateText = circleContainer.style.transform;
  const match = CurrentRotateText.match(/rotate\(([-\d.]+)deg\)/);
  if (match) {
    const number = parseFloat(match[1]);
    return number;
  }
}

export function translateXValueExtraction(circleContainer) {
  const currentTranslateX = circleContainer.style.transform;
  const match = currentTranslateX.match(
    /translateX\(([-\d.]+)(?:px|%|vh|vw)\)/
  );
  if (match) {
    const number = parseFloat(match[1]);
    return number;
  }
}

export function translateYValueExtraction(circleContainer) {
  const currentTranslateY = circleContainer.style.transform;
  const match = currentTranslateY.match(
    /translateY\(([-\d.]+)(?:px|%|vh|vw)\)/
  );
  if (match) {
    const number = parseFloat(match[1]);
    return number;
  }
}

export function translateZValueExtraction(circleContainer) {
  const currentTranslateZ = circleContainer.style.transform;
  const match = currentTranslateZ.match(
    /translateZ\(([-\d.]+)(?:px|%|vh|vw)\)/
  );
  if (match) {
    const number = parseFloat(match[1]);
    return number;
  }
}
