const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select id, firstname, lastname, email, city, language from users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select id, firstname, lastname, email, city, language from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;

    database
    .query("INSERT INTO users(firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, city, language, hashedPassword])
    .then(([result]) => {
        res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error saving the user");
    });
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;
    
    database
    .query("UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?",
    [firstname, lastname, email, city, language, hashedPassword, id])
    .then(([result]) => {
        if (result.affectedRows === 0) {
            res.status(404).send("Not Found");
        } else {
            res.sendStatus(204);
        }
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the user");
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser
};