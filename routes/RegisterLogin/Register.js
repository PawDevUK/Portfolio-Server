const router = require('express').Router();

router.route('/').get((req,res)=>{
    console.log(req);
    res.send('Get Register')
})
router.route('/').post((req,res)=>{
    console.log(req.body);
    res.send({
        msg:'payload received',
        payload: req.body
    }).status(200)
})

module.exports = router;