const router = require('express').Router()
const Users = require('./models/users.model.js')

function addID(arr) {
    const arrWithId = []
    for (let i = 0; i < arr.length; i++) {
        arrWithId.push({
            id: arr[i]._id,
            ...arr[i]._doc,
        })
    }
    return arrWithId
}

router.route('/').get((req, res) => {
    res.send('Tictactoe')
})

router.route('/users').get((req, res) => {
    Users.find()
        .then((users) => res.json(addID(users)))
})

router.route('/users/addUser').post((req, res) => {
    const newUser = new Users(req.body)
    newUser.save()
        .then(() => res.json('User added to available/active players'))
        .catch(err => {
            res.status(400).json(`Error is ${err}`)
        })
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