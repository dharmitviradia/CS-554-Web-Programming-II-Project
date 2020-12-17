const express = require("express");
const router = express.Router();
const data = require("../data");
const stockData = data.stocks;

router.get("/add/stocks/nyse/companies", async (req,res)=>{

    let search = req.query.searchTerm;
    console.log(search+"--------------dsffsdv-----------------");
    try {
        const stock = await stockData.findStocks(search);
        console.log(stock);
        return res.send(stock);
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


module.exports = router;