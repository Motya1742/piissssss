const shirtData = JSON.parse(localStorage.getItem('selectedShirt'));

if (shirtData) {
    const shirt = shirtData; 
    document.getElementById('shirtName').textContent = shirt.name;
    document.getElementById('shirtDescription').textContent = shirt.description;
    document.getElementById('shirtPrice').textContent = shirt.price;
    
    let isFront = true;
    let currentColor = 'white';
    const shirtImage = document.getElementById('shirtImage');

    function updateShirtImage() {
        const imageSrc = isFront 
            ? shirt.colors[currentColor].front 
            : shirt.colors[currentColor].back;
        shirtImage.src = imageSrc;
    }

    updateShirtImage();

    document.getElementById('toggleSide').addEventListener('click', () => {
        isFront = !isFront;
        document.getElementById('toggleSide').textContent = isFront ? 'Show back' : 'Show front';
        updateShirtImage();
    });

    const colorButtonsContainer = document.getElementById('colorButtons');
    const colors = Object.keys(shirt.colors);

    colors.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-button';
        button.style.backgroundColor = color;
        button.onclick = () => {
            currentColor = color;
            updateShirtImage();
        }
        colorButtonsContainer.appendChild(button);
    });
} else {
    document.body.innerHTML = '<h2>NO data</h2>';
}