const mongocollections = require('../config/mongoCollection');
const { addStocks } = require('./stockMarketList');
const mystock = mongocollections.mystock;

module.exports = {
    async addStocks(stock){
        const mystockCollection = await mystock();
        const insertstock = await mystockCollection.insertOne(stock)
        if (insertstock.insertedCount === 0) throw 'Could not add Stock';

    },

    async removestock(stock){
        const mystockCollection = await mystock()
        const removestock = await mystockCollection.remove(stock)
        if (removestock.deletedCount === 0) throw 'Could not add Stock';
    },

    async listmystock(){
        const mystockCollection = await mystock()



    }
}