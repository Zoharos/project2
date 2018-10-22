const express = require('express');
const router = express.Router();
const path = require('path');
import routes from './routes';
router.use(express.json());

router.get('/*', (req, res) => {
    //console.log(req.url);
    const match = routes.reduce((acc, route) => (route == req.url ? true : false) || acc , null);
    if (!match) {
        res.status(404).send('page not found');
    }
    else {
        res.sendFile(path.join(__dirname,'../index.html'), function(err) {
        if(err) {
            res.status(500).send(err);
            }
        })
    }
})

module.exports = router