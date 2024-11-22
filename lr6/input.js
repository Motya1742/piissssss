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
    } else if (currentAction === 'touch_dblClick') {
      currentAction = 'follow'; // Режим "следующий за пальцем"
    }
  });

  document.addEventListener("touchstart", (e) => {
    touchTimeStart = new Date().getTime();
    if (e.touches.length > 1) {
      resetPosition();
    }
  });

  document.addEventListener("touchmove", (e) => {
    if (currentAction === 'follow') {
      if (currentDiv) {
        currentDiv.style.left = `${e.touches[0].clientX - offsetX}px`;
        currentDiv.style.top = `${e.touches[0
