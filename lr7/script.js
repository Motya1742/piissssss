const svgCanvas = document.getElementById('canvas');
const shapeInputs = document.querySelectorAll('input[name="shape"]');
const colorPicker = document.getElementById('colorPicker');

let isDrawing = false;
let startX, startY;
let tempShape = null; // Временный элемент для отображения во время рисования

svgCanvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) { 
        isDrawing = true;
        startX = event.offsetX;
        startY = event.offsetY;

        // Создаем временный элемент в зависимости от выбранной формы
        const shapeType = Array.from(shapeInputs).find(input => input.checked).value;
        if (shapeType === 'circle') {
            tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            tempShape.setAttribute('cx', startX);
            tempShape.setAttribute('cy', startY);
            tempShape.setAttribute('r', 0); // Начальный радиус равен 0
            tempShape.setAttribute('fill', colorPicker.value);
        } else if (shapeType === 'rectangle') {
            tempShape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            tempShape.setAttribute('x', startX);
            tempShape.setAttribute('y', startY);
            tempShape.setAttribute('fill', colorPicker.value);
        }
        svgCanvas.appendChild(tempShape);
    }
});

svgCanvas.addEventListener('mousemove', (event) => {
    if (isDrawing && tempShape) {
        const endX = event.offsetX;
        const endY = event.offsetY;

        const shapeType = Array.from(shapeInputs).find(input => input.checked).value;

        if (shapeType === 'circle') {
            const radius = Math.sqrt((endX - startX)  2 + (endY - startY)  2);
            tempShape.setAttribute('cx', startX);
            tempShape.setAttribute('cy', startY);
            tempShape.setAttribute('r', radius); // Обновляем радиус
        } else if (shapeType === 'rectangle') {
            const width = endX - startX;
            const height = endY - startY;

            tempShape.setAttribute('x', width < 0 ? endX : startX);
            tempShape.setAttribute('y', height < 0 ? endY : startY);
            tempShape.setAttribute('width', Math.abs(width));
            tempShape.setAttribute('height', Math.abs(height));
        }
    }
});

svgCanvas.addEventListener('mouseup', () => {
    if (tempShape) {
        // Перемещаем временный элемент на холст
        const finalShape = tempShape.cloneNode(true);
        svgCanvas.appendChild(finalShape);
        tempShape = null; // Убираем временный элемент
    }
    isDrawing = false; // Завершаем рисование
});

svgCanvas.addEventListener('mouseleave', () => {
    isDrawing = false; // Завершаем рисование при покидании области
    if (tempShape) {
        tempShape.remove(); // Убираем временный элемент
        tempShape = null;
    }
});
