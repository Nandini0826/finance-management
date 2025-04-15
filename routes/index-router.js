const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
   let error = req.flash("error");
   let success = req.flash("success");
   res.render('index', {error, success});
});


module.exports = router;