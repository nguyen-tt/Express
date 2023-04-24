const database = require("./database");

const getUsers = (req, res) => {
    database
    .query("select * from users")
    .then((result) => {
        const users = result[0];
        res.status(200).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("ERROR 500");
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    database
    .query("select * from users where id = ?", [id])
    .then (([users]) => {
        if (users[0] != null) {
            res.status(200).json(users[0]);
        } else {
            res.status(404).send("Not Found");
        }
});
};

module.exports = {getUsers, getUserById};