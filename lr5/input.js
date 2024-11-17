// Получаем все элементы с классом 'target'
const targets = document.querySelectorAll('.target');
let activeElement = null;
let offsetX, offsetY;
let originalPosition = {};

// Функция для получения текущих координат элемента
function getElementPosition(element) {
    return {
        top: parseInt(element.style.top),
        left: parseInt(element.style.left)
    };
}

// Обработчик для начала перетаскивания
function onMouseDown(event) {
    if (activeElement && activeElement !== this) return; // Игнорируем, если другой элемент активен

    activeElement = this;
    const position = getElementPosition(activeElement);
    offsetX = event.clientX - position.left;
    offsetY = event.clientY - position.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

// Обработчик для перемещения элемента
function onMouseMove(event) {
    if (!activeElement) return;

    activeElement.style.left = (event.clientX - offsetX) + 'px';
    activeElement.style.top = (event.clientY - offsetY) + 'px';
}

// Обработчик для завершения перетаскивания
function onMouseUp() {
    if (activeElement) {
        originalPosition[activeElement] = getElementPosition(activeElement);
        activeElement = null;
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

// Обработчик для двойного клика
function onDoubleClick() {
    if (activeElement) return; // Если уже активен, ничего не делаем

    activeElement = this;
    this.style.backgroundColor = 'blue'; // Меняем цвет
    const position = getElementPosition(activeElement);
    offsetX = event.clientX - position.left;
    offsetY = event.clientY - position.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClickDetach);
}

// Обработчик для "отклеивания" элемента
function onClickDetach(event) {
    if (activeElement) {
        activeElement.style.backgroundColor = 'red'; // Возвращаем цвет
        activeElement = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('click', onClickDetach);
    }
}

// Обработчик для клавиши Esc
function onKeyDown(event) {
    if (event.key === 'Escape' && activeElement) {
        const originalPos = originalPosition[activeElement];
        if (originalPos) {
            activeElement.style.left = originalPos.left + 'px';
            activeElement.style.top = originalPos.top + 'px';
        }
        activeElement.style.backgroundColor = 'red'; // Возвращаем цвет
        activeElement = null;
    }
}

// Добавляем обработчики событий для каждого элемента
targets.forEach(target => {
    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('dblclick', onDoubleClick);
});

// Добавляем обработчик нажатия клавиш
document.addEventListener('keydown', onKeyDown);