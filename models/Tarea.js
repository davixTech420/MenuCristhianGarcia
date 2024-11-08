const { v4: uuidv4 } = require('uuid');

class Tarea {
    constructor(descripcion) {
        this.id = uuidv4(); // Genera un ID único
        this.descripcion = descripcion;
        this.estado = false; // Estado inicial de la tarea
    }
}

class TareaManager {
    constructor() {
        this.tareas = []; // Almacena las tareas en memoria
    }

    crearTarea(descripcion) {
        const nuevaTarea = new Tarea(descripcion);
       return this.tareas.push(nuevaTarea);
    }

    
    listarTareasPendientes() {
        if (this.tareas.length === 0) {
            console.log("No hay tareas disponibles.");
            return;
        }
        return this.tareas.filter(tarea => !tarea.estado).map(tarea => ({
            id: tarea.id,
            descripcion: tarea.descripcion,
            estado: tarea.estado
        }));
    }

    listarTareas() {
        if (this.tareas.length === 0) {
            console.log("No hay tareas disponibles.");
            return;
        }
        return this.tareas.map(tarea => ({
            id: tarea.id,
            descripcion: tarea.descripcion,
            estado: tarea.estado
        }));
    }
    listarTareasCompletas() {
        if (this.tareas.length === 0) {
            console.log("No hay tareas disponibles.");
            return;
        }
        return this.tareas.filter(tarea => tarea.estado).map(tarea => ({
            id: tarea.id,
            descripcion: tarea.descripcion,
            estado: tarea.estado
        }));
    }

    borrarTarea(id) {
        const index = this.tareas.findIndex(tarea => tarea.id === id);
        if (index === -1) {
            console.log("Índice inválido.");
            return;
        }
        const tareaBorrada = this.tareas.splice(index, 1);
        console.log(`Tarea borrada: ${tareaBorrada[0].descripcion}`);
    }
}

module.exports = TareaManager;