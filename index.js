// const {Client} = require('pg')
const {consultarEstudiantes, agregarNuevoEstudiante, editarEstudiante, consultarPorRut, eliminarEstudiante} = require('./querymodules')

//recuperar argumentos
const [accion, ...args] = process.argv.slice(2)
// console.log(accion, args)

//ejecucion
if (accion === 'consulta' && args.length == 0){
    consultarEstudiantes()
}

else if (accion === 'nuevo' && args.length == 4){
    agregarNuevoEstudiante(args)
}

else if (accion === 'editar' && args.length == 4){
    editarEstudiante(args)
}

else if (accion === 'rut' && args.length == 1){
    consultarPorRut(args)
}

else if (accion === 'eliminar' && args.length == 1){
    eliminarEstudiante(args)
}

else{
    console.log("El comando ingresado no es válido. Intente nuevamente...")
}
