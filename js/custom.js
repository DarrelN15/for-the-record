document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.getElementsByClassName('add-to-cart-btn');
  
    Array.from(addToCartButtons).forEach(function(button) {
      button.addEventListener('click', function() {
        const product = {
          title: this.dataset.title,
          artist: this.dataset.artist,
          price: this.dataset.price,
          image: this.dataset.image
        };
  
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
      });
    });
  });
  