const router = require('express').Router()
const Users = require('./models/users.model.js')

router.route('/').get((req, res) => {
    res.send('Tictactoe')
})

router.route('/users').get((req, res) => {
    Users.find()
        .then((users) => res.json(users))
})

router.route('/users/addUser').post((req, res) => {
    const user = req.body.user
    const newUser = new Users({ user })
    newUser.save()
        .then(() => res.json('User added to available/active players'))
        .catch(err => {
            res.status(400).json(`Error is ${err}`)

        }
        )
})

router.route('/users/deleteUser/:id').delete((req, res) => {
    Users.findByIdAndDelete(req.params.id)
        .then(() => res.json('User removed from active players list!! '))
        .catch(err => {
            res.status(400).json(`Error is ${err}`)
        }
        )
})

module.exports = router