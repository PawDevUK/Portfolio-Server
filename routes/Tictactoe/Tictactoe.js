const router = require('express').Router()

router.route('/').get((req, res) => {
    res.send('Tictactoe')
})

router.route('/users').get((req, res) => {
    res.send({ users: ["Pawel", "Tony"] })
})

router.route('/addUser').post((req, res) => {
    res.send(req.body)
})

module.exports = router