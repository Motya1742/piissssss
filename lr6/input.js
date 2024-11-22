const targets = document.querySelectorAll(".target");
let initialColor;
if (targets.length > 0) {
  initialColor = window.getComputedStyle(targets[0]).backgroundColor;
}
let offsetX, offsetY;
let currentDiv = null;
let currentAction = null;
let previousTouchTime = 0;
let initialPosX, initialPosY; // Храним начальные позиции для сброса

targets.forEach(target => {
  target.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      if (!currentDiv) {
        currentDiv = target;
        currentAction = 'touch_move';
        offsetX = e.touches[0].clientX - target.offsetLeft;
        offsetY = e.touches[0].clientY - target.offsetTop;

        // Сохраняем начальные позиции для сброса
        initialPosX = target.offsetLeft;
        initialPosY = target.offsetTop;

        target.style.zIndex = targets.length;
      }
    } else if (e.touches.length > 1) {
      resetPosition(); // Сбрасываем позицию при втором касании
    }
  });

  document.addEventListener("touchmove", (e) => {
    if (currentAction === 'touch_move' && currentDiv) {
      currentDiv.style.left = `${e.touches[0].clientX - offsetX}px`;
      currentDiv.style.top = `${e.touches[0].clientY - offsetY}px`;
    }
  });

  target.addEventListener("touchend", () => {
    if (currentDiv) {
      if (checkDoubleTouch() && new Date().getTime() - previousTouchTime < 300) {
        currentDiv.style.backgroundColor = 'blue'; // Меняем цвет на синий
        currentAction = 'follow'; // Переключаем на режим следования
      } else {
        resetPosition();
      }
    } else if (currentAction === 'follow') {
      currentDiv.style.backgroundColor = initialColor; // Возвращаем цвет на красный
      currentDiv = null; // Сбрасываем текущее состояние
      currentAction = null;
    }
  });

  const resetPosition = () => {
    if (currentDiv) {
      currentDiv.style.left = `${initialPosX}px`;
      currentDiv.style.top = `${initialPosY}px`;
      currentDiv.style.backgroundColor = initialColor; // Возвращаем цвет
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
