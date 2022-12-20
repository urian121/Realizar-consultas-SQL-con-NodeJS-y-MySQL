/**Requerimos el paquete - modulo (mysql) */
const mysq = require('mysql')

/**Definimos un const llamada confiBD la cuál será igual a un objeto JSON
 * con los parametros que se necesitan para conectar NodeJS con una BD en MySQL.
 */
const confiBD = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node_mysql',
  port: 3306,
}
//console.log(confiBD);

/** Creamos una constante llamada conBD la cuál será igual al método mysql.createConnection()
 *  de MySQL, esto servirá para interactuar con el servidor de MySQL.
 */
const conBD = new mysq.createConnection(confiBD)

/**La función connect() se usa para establecer la conexión al servidor,
 * aqui validamos si la conexión fue un error o exitosa.
 */
conBD.connect((error) => {
  if (error) {
    console.log('Error en la conexión de BD')
    throw err //Dispara un mensaje de error
  } else {
    console.log('Conexión exitosa a BD')
    listarClientes() //Llamamos a esta función para obtener una lista de registros.

    crearRegistro()
    borrarTabla()
    truncateTable()
    actualizarRegistros()
    BorrarRegistro()
  }

  conBD.end() //Cerrando la conexion de BD
  //conBD.destroy(); //Otra forma de cerra la conexion de BD
})

/**Función para consultar todos los registros desde mi BD MySQL */
const listarClientes = () => {
  const sql = 'SELECT * FROM carros ORDER BY id DESC'

  /** La función query() se usa para ejecutar la consulta SQL en la base de datos MySQL */
  conBD.query(sql, (err, results, fields) => {
    if (err) throw err //Mostrará este mensaje si hay error en la consulta SQL.

    /**Si no hay error en la consulta SQL */
    //console.log(results);
    console.log(`Total de Registros: ${results.length}`)
    console.table(results)

    /**Recorriendo todos los registros con el metodo forEach de JavaScript */
    results.forEach((result) => {
      console.log(result)
    })

    /**Recorriendo todos los registros obtenidos de la consulta con el método for de JavaScript */
    for (let i = 0; i < results.length; i++) {
      const elemento = results[i].marca
      console.log({ elemento })
    }
  })
}

/**Función para Crear un registro en mi BD MySQL */
const crearRegistro = () => {
  conBD.query(
    'INSERT INTO carros (marca, modelo, year, color, puertas) VALUES (?, ?, ?, ?, ?);',
    ['Ford', 'Camioneta', '2022', 'gris', '4'],
    function (err, results, fields) {
      if (err) throw err
      else
        console.log('Registros insertados ' + results.affectedRows + ' row(s).')
    },
  )
}

/**Función para Borrar una tabla en mi BD MySQL*/
const borrarTabla = () => {
  conBD.query('DROP TABLE IF EXISTS xyz;', function (err, results, fields) {
    if (err) throw err
    console.log('La tabla fue Borrada.')
  })
}

const truncateTable = () => {
  conBD.query('TRUNCATE TABLE Categories;;', function (err, results, fields) {
    if (err) throw err
    console.log('La tabla fue limpiada.')
  })
}

/** Función para la Actualización de registros en mi BD MySQL*/
const actualizarRegistros = () => {
  conBD.query(
    'UPDATE carros SET marca = ? WHERE modelo = ?',
    ['Toyota', 'Maru'],
    function (err, results, fields) {
      if (err) throw err
      else console.log('Actualización ' + results.affectedRows + ' row(s).')
    },
  )
}

/**Función para Eliminar registro(s) en mi BD MySQL */
const BorrarRegistro = () => {
  conBD.query('DELETE FROM carros WHERE id = ?', ['3'], function (
    err,
    results,
    fields,
  ) {
    if (err) throw err
    else console.log('Registro borrado ' + results.affectedRows + ' row(s).')
  })

  conBD.end((err) => {
    if (err) throw err
    else console.log('Conexion de BD cerrada correctamente.')
  })
}
