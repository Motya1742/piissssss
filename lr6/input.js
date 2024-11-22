const targets = document.querySelectorAll(".target");
let initialColor;
if (targets.length > 0) {
  initialColor = window.getComputedStyle(targets[0]).backgroundColor;
}
let offsetX, offsetY;
let currentDiv = null;
let currentAction = null;
let previousTouchTime = 0;

targets.forEach(target => {
  let initialPosX = target.offsetLeft;
  let initialPosY = target.offsetTop;

  target.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      if (!currentDiv && currentAction !== 'touch_dblClick') {
        currentDiv = target;
        currentAction = 'touch_move';
        offsetX = e.touches[0].clientX - target.offsetLeft;
        offsetY = e.touches[0].clientY - target.offsetTop;
        target.style.zIndex = targets.length;
      } else if (currentAction === 'touch_dblClick') {
        currentAction = 'follow'; // Режим "следующий за пальцем"
      }
    }
  });

  document.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) {
      resetPosition(); // Сбрасываем позицию при втором касании
    }
  });

  document.addEventListener("touchmove", (e) => {
    if (currentAction === 'follow' || currentAction === 'touch_move') {
      if (currentDiv) {
        currentDiv.style.left = `${e.touches[0].clientX - offsetX}px`;
        currentDiv.style.top = `${e.touches[0].clientY - offsetY}px`;
      }
    }
  });

  target.addEventListener("touchend", () => {
    if (currentDiv) {
      if (currentAction === 'touch_move' || currentAction === 'touch_dblClick') {
        if (checkDoubleTouch() && new Date().getTime() - previousTouchTime < 300) {
          currentAction = 'touch_dblClick';
          target.style.backgroundColor = '#F4F4F4';
          return;
        }
        resetPosition();
      } else if (currentAction === 'follow') {
        resetPosition();
      }
    }
  });

  const resetPosition = () => {
    if (currentDiv) {
      currentDiv.style.left = `${initialPosX}px`;
      currentDiv.style.top = `${initialPosY}px`;
      currentDiv.style.backgroundColor = initialColor;
      currentDiv.style.zIndex = '1';
      currentDiv = null;
      currentAction = null;
    }
  };

  const checkDoubleTouch = () => {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - previousTouchTime;
    previousTouchTime = currentTime;
    return timeDiff < 300;
  };
});
