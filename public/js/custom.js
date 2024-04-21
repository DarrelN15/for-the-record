document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.getElementsByClassName('add-to-cart-btn');
    const removeFromCartButtons = document.getElementsByClassName('remove-from-cart-btn');
    
  
    Array.from(addToCartButtons).forEach(function(button) {
      button.addEventListener('click', function() {
        const productId = this.dataset.id; 
        const productData = {
          albumId: productId
        };
    
        fetch('/cart/add-to-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Added to cart!');
          } else {
            alert('Error adding to cart');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    });


    Array.from(removeFromCartButtons).forEach(function(button) {
      button.addEventListener('click', function() {
          const albumId = this.dataset.id; 
          const productData = {
              albumId: albumId
          };
          
          fetch('/cart/remove-item', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(productData)
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Item removed from cart!');
                  window.location.reload(); 
              } else {
                  alert('Error removing item from cart');
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
      });
  });

});

  