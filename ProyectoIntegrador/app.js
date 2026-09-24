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
            precio: "$8,000 MXN",
            ubicacion: "Costa del mar 54, San Carlos",
            lat: 27.9560, 
            lng: -111.0300,
            imagen: "https://rentasplayasonora.com/images/GXsWfplahfm4rSP1GatciQnMV5OPxckrnepBSldC.jpg"
        },
        {
            id: 2,
            precio: "$10,000 MXN",
            ubicacion: "Playa blanca esquinero, San Carlos",
            lat: 27.9490, 
            lng: -111.0200,
            imagen: "https://rentasplayasonora.com/images/1771013648.jpg"
        },
        {
            id: 3,
            precio: "$8,900 MXN",
            ubicacion: "Algodones luxury, San Carlos",
            lat: 27.9620, 
            lng: -111.0150,
            imagen: "https://rentasplayasonora.com/images/1718909249.jpg"
        },
        {
            id: 4,
            precio: "$4,000 MXN",
            ubicacion: "Casa seve, San Carlos",
            lat: 27.9680, 
            lng: -111.0250,
            imagen: "https://rentasplayasonora.com/images/1696355600.jpeg"
        },
        {
            id: 5,
            precio: "$6,300 MXN",
            ubicacion: "Arrecifes club, San Carlos",
            lat: 27.9710, 
            lng: -111.0400,
            imagen: "https://rentasplayasonora.com/images/1671575875.jpg"
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
                <div class="card-image" style="background-image: url('${casa.imagen}'); background-size: cover; background-position: center;"></div>
                <div class="card-content">
                    <p class="price">${casa.precio}</p>
                    <p class="location">${casa.ubicacion}</p>
                    <button class="btn-info" onclick="alert('Estás solicitando información de:\\n${casa.titulo}\\nPrecio: ${casa.precio}')">Más información</button>
                </div>
            `;
            
            cardsContainer.appendChild(cardElement);
        });
    });
});