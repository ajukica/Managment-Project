const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/create", (req,res) => {
    const {naziv} = req.body;

    let sql = `INSERT INTO courses SET ?`;

    const data ={
        Naziv: naziv
    }

    db.query(sql,data,(err,result)=>{
        if (err) return res.status(400).json({msg: "Neuspjesno umetanje"});

        return res.status(200).json({data});
    })
    
})

module.exports = router;
