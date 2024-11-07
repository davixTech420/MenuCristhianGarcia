const fs = require("fs");
const archivoJson = "tareas.json";

// Inicializa el archivo JSON si no existe
if (!fs.existsSync(archivoJson)) fs.writeFileSync(archivoJson, JSON.stringify({ tareas: [] }));

const leerTareas = () => JSON.parse(fs.readFileSync(archivoJson));

const escribirTareas = (tareas) => fs.writeFileSync(archivoJson, JSON.stringify(tareas));

const crearTarea = async (tarea) => {
    const tareas = leerTareas();
    tareas.tareas.push(tarea);
    escribirTareas(tareas);
};

const listarTareas = async () => leerTareas().tareas;

const borrarTarea = async (indice) => {
    const tareas = leerTareas();
    tareas.tareas.splice(indice, 1);
    escribirTareas(tareas);
};

module.exports = { crearTarea, listarTareas, borrarTarea };