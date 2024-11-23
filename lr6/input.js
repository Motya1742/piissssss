const targets = document.querySelectorAll('.target');

let isDragging = false;
let isPinned = false;
let currentElement = null;
let offsetX, offsetY;
let originalPosition = {};
let lastTouchTime = 0;
const doubleTapDelay = 300; 
let isClickBlocked = false; 

function unpinElement(event) {
    isPinned = false;
    currentElement.style.backgroundColor = 'red'; 

    const rect = currentElement.getBoundingClientRect();
    const elementCenterX = rect.width / 2;
    const elementCenterY = rect.height / 2;

    const newLeft = event.touches[0].clientX - elementCenterX;
    const newTop = event.touches[0].clientY - elementCenterY;

    currentElement.style.left = `${newLeft}px`;
    currentElement.style.top = `${newTop}px`;
    currentElement = null;
}

function initDrag(event) {
    if (isClickBlocked) return;
    if (isPinned) {
        unpinElement(event); 
        return;
    }

    currentElement = event.currentTarget;
    isDragging = true;

    const rect = currentElement.getBoundingClientRect();
    offsetX = event.touches[0].clientX - rect.left;
    offsetY = event.touches[0].clientY - rect.top;

    originalPosition.left = parseInt(currentElement.style.left) || 0;
    originalPosition.top = parseInt(currentElement.style.top) || 0;
}

function onTouchStart(event) {
    const currentTime = Date.now();

    if (event.touches.length === 1) {
        if (currentTime - lastTouchTime <= doubleTapDelay) {
            onDoubleClick(event);
        } else if (!isPinned) {
            initDrag(event);
        }
    }

    lastTouchTime = currentTime;
}

function onEnd() {
    if (isDragging) {
        isDragging = false;
    }
}

function onMove(event) {
    if (isDragging || isPinned) {
        const clientX = event.touches[0].clientX;
        const clientY = event.touches[0].clientY;

        if (event.touches.length > 1) {
            resetPosition(); 
            return; 
        }

        currentElement.style.left = `${clientX - offsetX}px`;
        currentElement.style.top = `${clientY - offsetY}px`;
    }
}

function onDoubleClick(event) {
    isClickBlocked = true; 

    if (!isPinned) {
        isPinned = true;
        currentElement = event.currentTarget;
        currentElement.style.backgroundColor = 'blue'; 
    } else {
        unpinElement(event);
    }

    setTimeout(() => {
        isClickBlocked = false;
    }, doubleTapDelay);
}

function resetPosition() {
    if (currentElement) {
        currentElement.style.left = `${originalPosition.left}px`;
        currentElement.style.top = `${originalPosition.top}px`;
        isDragging = false;
        isPinned = false;
        currentElement.style.backgroundColor = 'red'; 
        currentElement = null;
    }
}

function onTouchEnd() {
    onEnd();
}

targets.forEach(target => {
    target.addEventListener('touchstart', onTouchStart);
    target.addEventListener('dblclick', onDoubleClick);
});

document.addEventListener('touchmove', onMove);
document.addEventListener('touchend', onTouchEnd);
document.addEventListener('touchend', onTouchEnd);
