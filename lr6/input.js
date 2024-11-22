const targets = document.querySelectorAll('.target');
let isDragging = false;
let isSticky = false;
let offsetX, offsetY;
let currentElement = null;
let originalPosition = { top: 0, left: 0 };
let previousTouchTime = 0;

const updatePosition = (event) => {
    const touch = event.touches ? event.touches[0] : event;
    if (currentElement) {
        currentElement.style.left = (touch.clientX - offsetX) + 'px';
        currentElement.style.top = (touch.clientY - offsetY) + 'px';
    }
};

targets.forEach(target => {
    target.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];

        if (event.touches.length === 1) {
            // Перемещение элемента
            if (!isSticky) {
                isDragging = true;
                currentElement = target;

                offsetX = touch.clientX - target.getBoundingClientRect().left;
                offsetY = touch.clientY - target.getBoundingClientRect().top;

                // Сохраняем начальные позиции
                originalPosition.top = target.style.top || '0px';
                originalPosition.left = target.style.left || '0px';
            }
        } else if (event.touches.length > 1) {
            // Возврат на исходную позицию при втором касании
            if (currentElement) {
                currentElement.style.top = originalPosition.top;
                currentElement.style.left = originalPosition.left;
                resetElement();
            }
        }
    });

    target.addEventListener('dblclick', () => {
        isSticky = true;
        target.style.backgroundColor = 'blue';
    });

    target.addEventListener('click', () => {
        if (isSticky && currentElement === target) {
            isSticky = false;
            resetElement();
        }
    });
});

document.addEventListener('touchmove', (event) => {
    if (isDragging) {
        updatePosition(event);
    }
});

document.addEventListener('touchend', () => {
    if (isDragging) {
        isDragging = false;
        currentElement.style.backgroundColor = 'red'; // Возврат цвета
        currentElement = null;
    } else if (currentElement) {
        resetElement(); // Если элемент был "прилипшим", сбрасываем
    }
});

const resetElement = () => {
    if (currentElement) {
        currentElement.style.backgroundColor = 'red';
        currentElement = null;
        isSticky = false; // Сбрасываем состояние "липкости"
    }
};
