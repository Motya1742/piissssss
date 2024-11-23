const svgCanvas = document.getElementById('canvas');
const shapeInputs = document.querySelectorAll('input[name="shape"]');
const colorPicker = document.getElementById('colorPicker');

let isDrawing = false;
let startX, startY;

svgCanvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) { 
        isDrawing = true;
        startX = event.offsetX;
        startY = event.offsetY;
    }
});

svgCanvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        const shapeType = Array.from(shapeInputs).find(input => input.checked).value;
        const endX = event.offsetX;
        const endY = event.offsetY;

        const existingShapes = svgCanvas.querySelectorAll('circle, rect');
        existingShapes.forEach(shape => shape.remove());

        const selectedColor = colorPicker.value; // Получаем выбранный цвет

        if (shapeType === 'circle') {
            const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', startX);
            circle.setAttribute('cy', startY);
            circle.setAttribute('r', radius);
            circle.setAttribute('fill', selectedColor); 
            svgCanvas.appendChild(circle);
        } else if (shapeType === 'rectangle') {
            const width = endX - startX;
            const height = endY - startY;
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

            rect.setAttribute('x', width < 0 ? endX : startX); 
            rect.setAttribute('y', height < 0 ? endY : startY); 
            rect.setAttribute('width', Math.abs(width)); 
            rect.setAttribute('height', Math.abs(height)); 
            rect.setAttribute('fill', selectedColor); 
            svgCanvas.appendChild(rect);
        }
    }
});

svgCanvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

svgCanvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});