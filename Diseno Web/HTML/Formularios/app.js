const btn = document.getElementById('toggle-btn');
btn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});   

const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreUsuario = document.querySelector("#nombre_usuario");
    const apellidoPaterno = document.querySelector("#apellido_paterno");
    const apellidoMaterno = document.querySelector("#apellido_materno");
    const correoElectronico = document.querySelector("#correo_electronico");
    const telefono = document.querySelector("#telefono");
    const pais = document.querySelector('input[name="pais"]:checked');
    const idioma = document.querySelector("#idioma");
    const comentarios = document.querySelector("#comentarios");

    const confirmar = confirm(
        "¿Los datos ingresados son correctos?\n\n" +
        "Nombre de Usuario: " + nombreUsuario.value + "\n" +
        "Apellido Paterno: " + apellidoPaterno.value + "\n" +
        "Apellido Materno: " + apellidoMaterno.value + "\n" +
        "Correo Electrónico: " + correoElectronico.value + "\n" +
        "Teléfono: " + telefono.value + "\n" +
        "País: " + (pais ? pais.value : "") + "\n" +
        "Idioma: " + idioma.value + "\n" +
        "Comentarios: " + comentarios.value
    );
    if(confirmar){
        formulario.submit();
    }
});
