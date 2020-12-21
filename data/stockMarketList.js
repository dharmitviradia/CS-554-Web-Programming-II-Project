const mongocollections = require('../config/mongoCollection');
const stocks = mongocollections.stocks;
const stocksJson = require('./nasdaqjson.json')


module.exports= {

    async addStocks() {
        const stockCollection = await stocks();
        for (let i = 0; i< stocksJson.length;i++){
          const insertInfo = await stockCollection.insertOne(stocksJson[i]);
          if (insertInfo.insertedCount === 0) throw 'Could not add Stock';
        }
          
      },
      async findStocks(searchData) {
        const stockCollection = await stocks();
        let listOfCompanies = await stockCollection.find({$or:[{"Company Name":{ $regex : new RegExp(searchData, "i")} }]}).toArray();
        console.log(listOfCompanies);
        return listOfCompanies;
      },
}