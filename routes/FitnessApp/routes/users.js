const router = require('express').Router();  //es5 syntax
const User = require('../models/user.model.js');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users)
        )
        .catch(err => res.status(400).json('Error:' + err))
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long' });
    }

    const newUser = new User({ username });

    newUser.save()
        .then(() => res.json({ message: 'User added!', username }))
        .catch(err => res.status(400).json({ error: err.message }))
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error:' + err))
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.json("User deleted"))
})


module.exports = router;