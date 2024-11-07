const inquirer = require("inquirer");
const color = require("colors");
const clear = require("clear");
const tareas = require("../models/Tarea");
const preguntas = [
  {
    type: "list",
    name: "options",
    message: "Qué quieres hacer?",
    choices: [
      { value: "1", name: "1. Crear tarea" },
      { value: "2", name: "2. Listar tareas" },
      { value: "3", name: "3. Borrar tarea" },
      { value: "0", name: "0. Salir" },
    ],
  },
];

const menu = async () => {
  clear();
  console.log(`${"°°°°°°°°°°°°°°°°°°°°°°°°".green}\n${"Primera Aplicación de Node.js".blue}\n${"°°°°°°°°°°°°°°°°°°°°°°°°".green}`);
  return (await inquirer.default.prompt(preguntas)).options;
};

const pausa = async () => {
  await inquirer.default.prompt([{ type: "input", name: "enter", message: `Presione ${"enter".green}` }]);
};

const ejecutarMenu = async () => {
  let opcion;
  do {
    opcion = await menu();
    if (opcion === "1") {
      const { nuevaTarea } = await inquirer.default.prompt([{ type: "input", name: "nuevaTarea", message: "Ingrese la tarea:" }]);
      await tareas.crearTarea(nuevaTarea);
      console.log("Tarea creada correctamente.".green);
    } else if (opcion === "2") {
      const tareasListadas = await tareas.listarTareas();
      console.log("Listado de tareas:".blue);
      tareasListadas.forEach((tarea, index) => console.log(`${index + 1}. ${tarea}`));
    } else if (opcion === "3") {
      const tareasBorrar = await tareas.listarTareas();
      const { indiceTarea } = await inquirer.default.prompt([{
        type: "list",
        name: "indiceTarea",
        message: "Seleccione la tarea a borrar:",
        choices: tareasBorrar.map((tarea, index) => ({ value: index, name: `${index + 1}. ${tarea}` })),
      }]);
      await tareas.borrarTarea(indiceTarea);
      console.log("Tarea borrada correctamente.".green);
    } else if (opcion === "0") {
      console.log("Saliendo...".blue);
      process.exit();
    } else {
      console.log("Opción inválida.".red);
    }
    await pausa(); 
  } while (opcion !== "0");
};

module.exports = { menu, ejecutarMenu, pausa };