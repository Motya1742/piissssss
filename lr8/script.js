const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapeInputs = document.querySelectorAll('input[name="shape"]');
const colorPicker = document.getElementById('colorPicker');

let isDrawing = false;
let startX, startY;
const shapes = []; // Массив для хранения всех фигур

canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // Проверяем, что нажата левая кнопка мыши
        isDrawing = true;
        startX = event.offsetX;
        startY = event.offsetY;
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        const shapeType = Array.from(shapeInputs).find(input => input.checked).value;
        const endX = event.offsetX;
        const endY = event.offsetY;

        // Очищаем canvas перед перерисовкой
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Перерисовываем все сохраненные фигуры
        shapes.forEach(shape => {
            ctx.fillStyle = shape.color; // Устанавливаем цвет
            if (shape.type === 'circle') {
                ctx.beginPath();
                ctx.arc(shape.startX, shape.startY, shape.radius, 0, Math.PI * 2);
                ctx.fill();
            } else if (shape.type === 'rectangle') {
                ctx.fillRect(shape.startX, shape.startY, shape.width, shape.height);
            }
        });

        const selectedColor = colorPicker.value; // Получаем выбранный цвет

        if (shapeType === 'circle') {
            const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            ctx.fillStyle = selectedColor; // Устанавливаем цвет
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.fill();
        } else if (shapeType === 'rectangle') {
            const width = endX - startX;
            const height = endY - startY;
            ctx.fillStyle = selectedColor; // Устанавливаем цвет
            ctx.fillRect(startX, startY, width, height);
        }
    }
});

canvas.addEventListener('mouseup', () => {
    if (isDrawing) {
        const shapeType = Array.from(shapeInputs).find(input => input.checked).value;
        const endX = event.offsetX;
        const endY = event.offsetY;

        const selectedColor = colorPicker.value; // Получаем выбранный цвет

        if (shapeType === 'circle') {
            const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
            shapes.push({ type: 'circle', startX, startY, radius, color: selectedColor });
        } else if (shapeType === 'rectangle') {
            const width = endX - startX;
            const height = endY - startY;
            shapes.push({ type: 'rectangle', startX, startY, width, height, color: selectedColor });
        }

        isDrawing = false;
    }
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});
