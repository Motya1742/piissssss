const targets = document.querySelectorAll(".target");
let initialColor;
if (targets.length > 0) {
  initialColor = window.getComputedStyle(targets[0]).backgroundColor;
}
let offsetX, offsetY;
let currentDiv = null;
let currentAction = null;
let previousTouchTime;
let touchTimeStart;

targets.forEach(target => {
  let initialPosX = target.offsetLeft;
  let initialPosY = target.offsetTop;

  target.addEventListener("touchstart", (e) => {
    if (!currentDiv && currentAction !== 'touch_dblClick') {
      currentDiv = target;
      currentAction = 'touch_move';
      offsetX = e.touches[0].clientX - target.offsetLeft;
      offsetY = e.touches[0].clientY - target.offsetTop;
      target.style.zIndex = targets.length;
    }
  });

  document.addEventListener("touchstart", (e) => {
    touchTimeStart = new Date().getTime();
    if (e.touches.length > 1) resetPosition();
  });

  document.addEventListener("touchmove", (e) => {
    if (currentAction) {
      currentDiv.style.left = `${e.touches[0].clientX - offsetX}px`;
      currentDiv.style.top = `${e.touches[0].clientY - offsetY}px`;
    }
  });

  target.addEventListener("touchend", () => {
    if (target === currentDiv && (currentAction === 'touch_move' || currentAction === 'touch_dblClick')) {
      if (checkDoubleTouch() && new Date().getTime() - touchTimeStart > 100) {
        currentAction = 'touch_dblClick';
        target.style.backgroundColor = '#F4F4F4';
        return;
      }
      currentDiv = null;
      currentAction = null;
      initialPosX = target.offsetLeft;
      initialPosY = target.offsetTop;
      target.style.backgroundColor = initialColor;
      target.style.zIndex = '1';
    }
  });

  const resetPosition = () => {
    currentDiv = null;
    currentAction = null;
    target.style.left = `${initialPosX}px`;
    target.style.top = `${initialPosY}px`;
    target.style.backgroundColor = initialColor;
    target.style.zIndex = '1';
  }

  const checkDoubleTouch = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - previousTouchTime;
    previousTouchTime = currentTime;
    return timeDiff < 300;
  }
});
