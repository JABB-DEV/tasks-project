const express = require('express'),
    router = express.Router

router.get('/', (req, res) => {
    res.send('Soy el index de api')
})

module.exports = router