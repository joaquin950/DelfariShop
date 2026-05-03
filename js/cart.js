let cart = JSON.parse(localStorage.getItem('cart_delfari')) || [];

function addToCart(id) {
    const prod = products.find(p => p.id === id);
    const exist = cart.find(i => i.id === id);
    exist ? exist.qty++ : cart.push({ ...prod, qty: 1 });

    // --- FEEDBACK DEL BOTÓN ---
    const btn = document.getElementById(`btn-${id}`);
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = "✓ ¡Agregado!";
        btn.classList.replace('bg-gray-900', 'bg-green-600');
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.replace('bg-green-600', 'bg-gray-900');
            btn.disabled = false;
        }, 1200);
    }
    updateCartUI();
}

function updateCartUI() {
    localStorage.setItem('cart_delfari', JSON.stringify(cart));
    const itemsCont = document.getElementById('cart-items');
    const countBadge = document.getElementById('cart-count');
    const totalLabel = document.getElementById('cart-total');
    
    let total = 0;
    let itemsHtml = '';
    
    cart.forEach(item => {
        total += item.price * item.qty;
        itemsHtml += `
            <div class="flex gap-4 border-b pb-4">
                <img src="${item.image}" class="w-16 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <p class="font-bold text-sm">${item.name}</p>
                    <p class="text-rose-500 text-xs">$${item.price.toLocaleString()}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button onclick="changeQty(${item.id},-1)" class="w-6 h-6 border rounded-full">-</button>
                        <span class="text-sm">${item.qty}</span>
                        <button onclick="changeQty(${item.id},1)" class="w-6 h-6 border rounded-full">+</button>
                    </div>
                </div>
            </div>`;
    });

    itemsCont.innerHTML = cart.length ? itemsHtml : '<p class="text-center text-gray-400 py-10">Tu carrito está vacío</p>';
    countBadge.textContent = cart.reduce((s, i) => s + i.qty, 0);
    countBadge.classList.toggle('hidden', cart.length === 0);
    totalLabel.textContent = `$${total.toLocaleString('es-AR')}`;
    updateWhatsAppLink(total);
}

function changeQty(id, delta) {
    const i = cart.findIndex(p => p.id === id);
    if(i !== -1) {
        cart[i].qty += delta;
        if(cart[i].qty <= 0) cart.splice(i, 1);
    }
    updateCartUI();
}

function updateWhatsAppLink(total) {
    const btn = document.getElementById('wa-cart-btn');
    let msg = 'Hola Delfari Shop! Quiero pedir:\n\n';
    cart.forEach(i => msg += `• ${i.name} (x${i.qty})\n`);
    msg += `\n*Total: $${total.toLocaleString()}*`;
    
    // El link de WhatsApp
    const waUrl = `https://wa.me/5493825406767?text=${encodeURIComponent(msg)}`;
    
    // Al hacer clic, enviamos el mensaje y LUEGO vaciamos el carrito
    btn.onclick = () => {
        window.open(waUrl, '_blank');
        clearCart(); // Esta función ya borra el localStorage y actualiza la UI
        toggleCart(); // Cerramos el panel del carrito para que se vea el cambio
    };
}

function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('translate-x-full');
    document.getElementById('cart-overlay').classList.toggle('hidden');
}

function clearCart() { cart = []; updateCartUI(); }

document.addEventListener('DOMContentLoaded', updateCartUI);