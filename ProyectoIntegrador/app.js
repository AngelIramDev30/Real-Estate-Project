document.addEventListener('DOMContentLoaded', () => {
    const lat = 27.9583;
    const lng = -111.0264;
    const map = L.map('map').setView([lat, lng], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const baseDeDatosCasas = [
        {
            id: 1,
            titulo: "Villa Costa del Mar",
            precio: "$8,000 MXN",
            ubicacion: "Costa del mar 54, San Carlos",
            lat: 27.9659,
            lng: -111.1062,
            imagenes: ["https://rentasplayasonora.com/images/GXsWfplahfm4rSP1GatciQnMV5OPxckrnepBSldC.jpg", "https://rentasplayasonora.com/images/1782333715.jpg"],
            descripcion: "Hermosa propiedad frente al mar con 4 habitaciones, 3 baños completos, alberca privada y terraza con vista inmejorable al atardecer. Capacidad para 10 personas."
        },
        {
            id: 2,
            titulo: "Playa Blanca Esquinero",
            precio: "$10,000 MXN",
            ubicacion: "Playa blanca esquinero, San Carlos",
            lat: 27.9650,
            lng: -111.1052,
            imagenes: ["https://rentasplayasonora.com/images/1771013648.jpg", "https://rentasplayasonora.com/images/1771013657.jpg"],
            descripcion: "Lujoso departamento esquinero con vista panoramica. Cuenta con 3 recamaras amplias, jacuzzi, acceso directo a la playa y seguridad 24/7."
        },
        {
            id: 3,
            titulo: "Algodones Luxury",
            precio: "$8,900 MXN",
            ubicacion: "Algodones luxury, San Carlos",
            lat: 27.9621,
            lng: -111.0997,
            imagenes: ["https://rentasplayasonora.com/images/1718909249.jpg", "https://rentasplayasonora.com/images/1718909244.jpg"],
            descripcion: "Vive la experiencia de lujo en Playa Algodones. Casa inteligente con 5 habitaciones, cocina equipada de chef, area de asador y alberca infinity."
        },
        {
            id: 4,
            titulo: "Casa Seve",
            precio: "$4,000 MXN",
            ubicacion: "Casa seve, San Carlos",
            lat: 27.9683,
            lng: -111.0220,
            imagenes: ["https://rentasplayasonora.com/images/1696355600.jpeg", "https://rentasplayasonora.com/images/1696355206.jpeg"],
            descripcion: "Opción económica y acogedora. Casa de 2 pisos con 3 cuartos, patio amplio ideal para familias pequeñas y mascotas. Cerca de restaurantes locales."
        },
        {
            id: 5,
            titulo: "Arrecifes Club",
            precio: "$6,300 MXN",
            ubicacion: "Arrecifes club, San Carlos",
            lat: 27.9320,
            lng: -110.9711,
            imagenes: ["https://rentasplayasonora.com/images/1671575875.jpg", "https://rentasplayasonora.com/images/1668010190.jpg"],
            descripcion: "Casa moderna en zona exclusiva. Acceso a club de playa privado, 4 habitaciones, mesa de billar y balcon privado en la recamara principal."
        }
    ];

    function obtenerCasasDeLaAPI() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(baseDeDatosCasas);
            }, 1000);
        });
    }
    const cardsContainer = document.getElementById('properties-container');
    
    cardsContainer.innerHTML = '<p style="color:white; padding: 20px;">Conectando con la API y cargando propiedades...</p>';

    obtenerCasasDeLaAPI().then(casas => {
      
        cardsContainer.innerHTML = '';

        casas.forEach(casa => {
            
            
            L.marker([casa.lat, casa.lng])
             .addTo(map)
             .bindPopup(`
                <b>${casa.titulo}</b><br>
                <span style="color:#a855f7; font-weight:bold;">${casa.precio}</span><br>
                ${casa.ubicacion}
             `);

         
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
    
            cardElement.innerHTML = `
                <div class="card-image" style="background-image: url('${casa.imagenes[0]}'); background-size: cover; background-position: center;"></div>
                <div class="card-content">
                    <p class="price">${casa.precio}</p>
                    <p class="location">${casa.ubicacion}</p>
                    <button class="btn-info">Más información</button>
                </div>
            `;
            
        
            const btnInfo = cardElement.querySelector('.btn-info');
            btnInfo.addEventListener('click', () => {
                abrirModal(casa);
            });

            cardsContainer.appendChild(cardElement);
        });
    });
});

let imagenesActuales = [];
let indiceActual = 0;

function abrirModal(casa) {
  
    const modal = document.getElementById('property-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalLocation = document.getElementById('modal-location');
    const modalDescription = document.getElementById('modal-description');

    imagenesActuales = casa.imagenes;
    indiceActual = 0;
    renderizarImagenModal();
    generarPuntos();

    modalTitle.textContent = casa.titulo;
    modalPrice.textContent = casa.precio;
    modalLocation.textContent = casa.ubicacion;
    modalDescription.textContent = casa.descripcion;

    modal.style.display = 'flex';
}


function renderizarImagenModal() {
    const modalImg = document.getElementById('modal-img');
    modalImg.src = imagenesActuales[indiceActual];


    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === indiceActual);
    });

    
    const hayVarias = imagenesActuales.length > 1;
    document.querySelector('.slider-btn.prev-btn').style.display = hayVarias ? 'flex' : 'none';
    document.querySelector('.slider-btn.next-btn').style.display = hayVarias ? 'flex' : 'none';
}

function generarPuntos() {
    const dotsContainer = document.getElementById('slider-dots');
    dotsContainer.innerHTML = '';
    imagenesActuales.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === indiceActual ? ' active' : '');
        dot.addEventListener('click', () => {
            indiceActual = i;
            renderizarImagenModal();
        });
        dotsContainer.appendChild(dot);
    });
}


function cambiarImagen(direccion) {
    const total = imagenesActuales.length;
    indiceActual = (indiceActual + direccion + total) % total;
    renderizarImagenModal();
}

function cerrarModal() {
    const modal = document.getElementById('property-modal');
    modal.style.display = 'none';
}

window.addEventListener('click', (event) => {
    const modal = document.getElementById('property-modal');
    if (event.target === modal) {
        cerrarModal();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.modal-slider');
    if (!slider) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const UMBRAL_SWIPE = 40;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const distancia = touchEndX - touchStartX;
        if (Math.abs(distancia) < UMBRAL_SWIPE) return;
        if (distancia < 0) {
            cambiarImagen(1); 
        } else {
            cambiarImagen(-1); 
        }
    });
});