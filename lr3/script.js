document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('product-container');
    const modal = document.getElementById('modal');
    const modalFront = document.getElementById('modal-front');
    const modalBack = document.getElementById('modal-back');
    const modalPrice = document.getElementById('modal-price');
    const closeModal = document.getElementById('close-modal');

    shirts.forEach(shirt => {
        const shirtDiv = document.createElement('div');
        shirtDiv.classList.add('shirt');

        const shirtImage = document.createElement('img');
        shirtImage.src = shirt.colors[Object.keys(shirt.colors)[0]].front; // Берем цвет по умолчанию
        shirtImage.alt = shirt.name;

        const shirtName = document.createElement('h3');
        shirtName.textContent = shirt.name || 'Name not available';

        const colorCount = document.createElement('p');
        colorCount.textContent = `Available Colors: ${Object.keys(shirt.colors).length}`;

        const seePageBtn = document.createElement('button');
        seePageBtn.textContent = "See Page";

        const quickViewBtn = document.createElement('button');
        quickViewBtn.textContent = "Quick View";
        quickViewBtn.onclick = () => {
            // модальное
            modalFront.src = shirt.colors[Object.keys(shirt.colors)[0]].front; 
            modalBack.src = shirt.colors[Object.keys(shirt.colors)[0]].back; 
            modalPrice.textContent = `Price: ${shirt.price}`;
            modal.style.display = 'block';
        };

        shirtDiv.appendChild(shirtImage);
        shirtDiv.appendChild(shirtName);
        shirtDiv.appendChild(colorCount);
        shirtDiv.appendChild(seePageBtn);
        shirtDiv.appendChild(quickViewBtn);

        productContainer.appendChild(shirtDiv);
    });

    closeModal.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
