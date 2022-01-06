// Router
const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as ${connection.threadId}`)
    //user connnect
    connection.query(
      'SELECT * FROM user WHERE status = "active"',
      (err, rows) => {
        //when connection has finished, release it
        connection.release()
        if (!err) {
          let removedUser = req.query.removed
          res.render('home', { rows, removedUser })
        } else { 
          console.log(err)
        }

        // console.log(`The data from user table: \n`, rows)
      }
    )
  })
}

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as ${connection.threadId}`)

    let searchTerm = req.body.search

    //user connnect
    connection.query(
      'SELECT * FROM user WHERE first_name LIKE ?',
      ['%' + searchTerm + '%'],
      (err, rows) => {
        //when connection has finished, release it
        connection.release()
        if (!err) {
          res.render('home', { rows })
        } else {
          console.log(err)
        }

        // console.log(`The data from user table: \n`, rows)
      }
    )
  })
}

exports.form = (req, res) => {
  res.render('add-user')
}

exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body
  console.log(first_name, last_name, email, phone, comments)

  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as ${connection.threadId}`)


    //user connnect
    connection.query(
      'INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        //when connection has finished, release it
        connection.release()
        if (!err) {
          res.render('add-user', { alert: 'User Added Successfuly' })
        } else {
          console.log(err)
        }

        // console.log(`The data from user table: \n`, rows)
      }
    )
  })
}

exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as ${connection.threadId}`)

    let searchTerm = req.body.search

    //user connnect
    connection.query(
      'SELECT * FROM user WHERE id =?',
      [req.params.id],
      (err, rows) => {
        //when connection has finished, release it
        connection.release()
        if (!err) {
          res.render('edit-user', { rows })
        } else {
          console.log(err)
        }

        // console.log(`The data from user table: \n`, rows)
      }
    )
  })
}

exports.update = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as ${connection.threadId}`)

    const { first_name, last_name, email, phone, comments } = req.body
    //user connnect
    connection.query(
      'UPDATE user SET first_name =? , last_name =? ,email = ?, phone =?,comments =? WHERE id = ?',
      [first_name, last_name, email, phone, comments, req.params.id],
      (err, rows) => {
        //when connection has finished, release it
        connection.release()
        if (!err) {
          pool.getConnection((err, connection) => {
            if (err) throw err
            console.log(`connected as ${connection.threadId}`)

            let searchTerm = req.body.search

            //user connnect
            connection.query(
              'SELECT * FROM user WHERE id =?',
              [req.params.id],
              (err, rows) => {
                //when connection has finished, release it
                connection.release()
                if (!err) {
                  res.render('edit-user', {
                    rows,
                    alert: `${first_name} ${last_name} has been updated`,
                  })
                } else {
                  console.log(err)
                }

                // console.log(`The data from user table: \n`, rows)
              }
            )
          })
        } else {
          console.log(err)
        }

        // console.log(`The data from user table: \n`, rows)
      }
    )
  })
}
// delete user
exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as ${connection.threadId}`)

    //user connnect
    connection.query(
      'DELETE FROM user WHERE id =?',
      [req.params.id],
      (err, rows) => {
        //when connection has finished, release it
        connection.release()
        if (!err) {
          let removedUser = encodeURIComponent('removed')
        res.redirect('/?removed=' + removedUser)
        } else {
          console.log(err)
        }

        // console.log(`The data from user table: \n`, rows)
      }
    )
  })
}

exports.viewall = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as ${connection.threadId}`)

    //user connnect
    connection.query(
      'SELECT * FROM user WHERE id =?',
      [req.params.id],
      (err, rows) => {
        //when connection has finished, release it
        connection.release()
        if (!err) {
          res.render('view-user', { rows })
        } else {
          console.log(err)
        }

        // console.log(`The data from user table: \n`, rows)
      }
    )
  })
}
