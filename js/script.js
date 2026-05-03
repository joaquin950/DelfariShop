function renderProducts(lista) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    lista.forEach(p => {
        container.innerHTML += `
            <div class="product-card group bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition animate-fade">
                <div class="relative aspect-[3/4] overflow-hidden cursor-pointer" onclick="openDetail(${p.id})">
                    <img src="${p.image}" class="w-full h-full object-cover">
                    ${p.tag ? `<span class="absolute top-3 left-3 bg-rose-500 text-white text-[10px] px-2 py-1 rounded-full uppercase">${p.tag}</span>` : ''}
                </div>
                <div class="p-4">
                    <h3 class="font-display text-lg text-gray-800">${p.name}</h3>
                    <p class="text-rose-600 font-bold mb-3">$${p.price.toLocaleString('es-AR')}</p>
                    <button id="btn-${p.id}" onclick="addToCart(${p.id})" class="w-full bg-gray-900 text-white py-2 rounded-xl text-sm hover:bg-rose-600 transition">
                        Agregar al carrito
                    </button>
                </div>
            </div>`;
    });
}

function filterProducts(cat) {
    const container = document.getElementById('products-container');
    container.style.opacity = '0';
    setTimeout(() => {
        const filtrados = cat === 'todos' ? products : products.filter(p => p.category === cat);
        renderProducts(filtrados);
        container.style.opacity = '1';
    }, 200);
}

// script.js
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
    // Bloqueamos el scroll del fondo cuando el menú está abierto
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : 'auto';
}

function openDetail(id) {
    const p = products.find(i => i.id === id);
    document.getElementById('detail-img').src = p.image;
    document.getElementById('detail-name').textContent = p.name;
    document.getElementById('detail-price').textContent = `$${p.price.toLocaleString()}`;
    document.getElementById('detail-desc').textContent = p.desc;
    
    const addBtn = document.getElementById('detail-add-btn');
    addBtn.onclick = () => { 
        addToCart(id); 
        addBtn.innerHTML = "✓ Agregado";
        setTimeout(() => { closeDetail(); addBtn.innerHTML = "Añadir al Carrito"; }, 800);
    };
    document.getElementById('product-detail-modal').classList.remove('hidden');
}

function closeDetail() { document.getElementById('product-detail-modal').classList.add('hidden'); }

document.addEventListener('DOMContentLoaded', () => renderProducts(products));