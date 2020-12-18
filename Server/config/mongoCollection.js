const dbConnection = require('./mongoConnection')
const getCollectionFn = (collection) => {
	let _col = undefined

	return async () => {
		if (!_col) {
			const db = await dbConnection()
			_col = await db.collection(collection)
		}

		return _col;
	}
}

module.exports = {
  companies: getCollectionFn("companies"),
  stocks : getCollectionFn("stocks"),
  wishlist: getCollectionFn("wishlist"),
  mystock: getCollectionFn("mystock")
}