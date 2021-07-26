const {Client} = require('pg')
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'alwaysmusic',
    password: 'postgres',
    port: 5432
}
const client = new Client(config)
client.connect()

const agregarNuevoEstudiante = async (args) => {
    try {
        const [nombre, rut, curso, nivel] = args
        const res = await client.query(`INSERT INTO estudiantes(nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', '${nivel}');`)
        console.log(`Estudiante ${nombre} agregado con éxito!`)
        client.end()
    } catch (error) {
        console.log(error)
    }

}

const consultarEstudiantes = async () => {
    try {
        const res = await client.query("SELECT * FROM estudiantes;")
        if (res.rows.length == 0){
            console.log("No hay registros de estudiantes en la base de datos.")
        }
        else{
            console.log("Registro actual: ", res.rows)
        }
        client.end()
    } catch (error) {
        console.log(error)
    }
}

//se asumirá que la edicion consiste únicamente en:
//declarar primero el nombre del estudiante cuyo registro se editara
//y luego editar TODOS los campos restantes, no algunos de ellos
const editarEstudiante = async (args) => { 
    try {
        const [nombre, rut, curso, nivel] = args
        const stringQuery = `UPDATE estudiantes SET rut = '${rut}', curso = '${curso}', nivel = '${nivel}' WHERE nombre = '${nombre}' RETURNING *;` 
        const res = await client.query(stringQuery)
        console.log(`Estudiante ${nombre} editado con éxito!`)
        client.end()
    } catch (error) {
        console.log(error)
    }
}

const consultarPorRut = async (args) => {
    try{
        const rut = args[0];
        const stringQuery = `SELECT * FROM estudiantes WHERE rut = '${rut}';`
        const res = client.query(stringQuery)
        res.then((resolve) => {
            (resolve.rows.length == 0) ? console.log("No se encontraron estudiantes con el rut ingresado...") : console.log(resolve.rows)
            client.end()
        })
    }catch(error){
        console.log(error)
    }
}

//solo elimina de a 1 estudiante, el primero que se ingrese en el comando
const eliminarEstudiante = (args) => {
    try{
        const rut = args[0];
        const stringQuery = `DELETE FROM estudiantes WHERE rut = '${rut}' RETURNING *;`
        const res = client.query(stringQuery)
        res.then((resolve) => {
            console.log(resolve.rows)
            if (resolve.rows.length == 1){
                console.log(`El registro de ${resolve.rows[0].nombre} se eliminó correctamente!`)
            } 
            else{
                console.log("No se encontraron estudiantes con el rut ingresado...")
            }    
            client.end()
        })
    }catch(error){
        console.log(error)
    }
}

module.exports = {agregarNuevoEstudiante, consultarEstudiantes, editarEstudiante, consultarPorRut, eliminarEstudiante} 