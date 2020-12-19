const mongocollections = require('../config/mongoCollection');
const { addStocks } = require('./stockMarketList');
const mystock = mongocollections.mystock;

module.exports = {
    async addStocks(){
        const mystockCollection = await mystock()

    },

    async removestock(){
        const mystockCollection = await mystock()

    },

    async listmystock(){
        const mystockCollection = await mystock()

    }
}