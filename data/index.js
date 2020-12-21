const stocksData = require("./stockMarketList");
const mystocksData = require("./mystocksList")
const wishlistData = require("./wishlistList")
module.exports = {
  stocks: stocksData,
  mystock: mystocksData,
  wishlist: wishlistData
};