let menu = document.querySelector(".menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle("move");
    navbar.classList.toggle("open-menu");
};

// close menu on scroll
window.onscroll = () => {
    menu.classList.remove("move");
    navbar.classList.remove("open-menu");
};

// scrollreveal
const animate = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: '2500',
    delay: '400',
});

animate.reveal(".home-text", {origin:"left"});
animate.reveal(".home-img", {origin: "bottom"});
animate.reveal(".heading, .newsletter h2", {origin: "top"});
animate.reveal(
    "header, .feature-box, .feature-menu-box, .item-box , .m-item-box, .t-box, .newsletter form", 
    {
        interval: 100
    }
);

// add to cart
document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartPopup = document.getElementById('cart-popup');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    const closePopup = document.getElementById('close-popup');

     // Fungsi untuk memformat angka menjadi Rupiah
     function formatCurrency(amount) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<img src="${item.image}" alt="${item.name}" class="cart-item-image"> ${item.name} - ${formatCurrency(item.price)} x ${item.quantity}`;
            cartItemsContainer.appendChild(li);
            totalAmount += item.price * item.quantity;
        });

        totalAmountElement.textContent = formatCurrency(totalAmount);
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    document.querySelectorAll('.item-btn','.m-item-box').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const image = this.dataset.image;

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, image, quantity: 1 });
            }

            updateCartDisplay();
        });
    });

    cartIcon.addEventListener('click', function() {
        cartPopup.classList.remove('hidden');
        cartPopup.style.display = 'flex';
    });

    closePopup.addEventListener('click', function() {
        cartPopup.classList.add('hidden');
        cartPopup.style.display = 'none';
    });

    document.getElementById('checkout-btn').addEventListener('click', function() {
        alert('Proceeding to checkout');
        cart = [];
        updateCartDisplay();
        cartPopup.classList.add('hidden');
        cartPopup.style.display = 'none';
    });
});
