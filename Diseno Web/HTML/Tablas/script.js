const Estudiantes = [
    {
        nombre: "Ana Lopez",
        matricula: "2420197893",
        materia: "Seminario De Programacion",
        calificacion: 90
    },
    {
        nombre: "Carlos Gonzalez",
        matricula: "2420197894",
        materia: "Base de datos",
        calificacion: 85
    },
    {
        nombre: "Maria Perez",
        matricula: "2420197895",
        materia: "Programacion Web",
        calificacion: 95
    },
    {
        nombre: "Juan Martinez",
        matricula: "2420197896",
        materia: "Inteligencia Artificial",
        calificacion: 88
    },
    {
        nombre: "Luisa Ramirez",
        matricula: "2420197897",
        materia: "Redes de Computadoras",
        calificacion: 92
    },
    {
        nombre: "Pedro Sanchez",
        matricula: "2420197898",
        materia: "Sistemas Operativos",
        calificacion: 87
    }
];

const tbody = document.querySelector("#estudiantes");
const totalEstudiantes = document.querySelector("#total-estudiantes");

totalEstudiantes.textContent = `Total de estudiantes: ${Estudiantes.length}`;

Estudiantes.forEach(estudiante => {
    const fila = document.createElement("tr");
    const nombre = document.createElement("td");
    const matricula = document.createElement("td");
    const materia = document.createElement("td");
    const calificacion = document.createElement("td");

    nombre.textContent = estudiante.nombre;
    matricula.textContent = estudiante.matricula;
    materia.textContent = estudiante.materia;
    calificacion.textContent = estudiante.calificacion;

    fila.append(nombre, matricula, materia, calificacion);
    tbody.appendChild(fila);
});
