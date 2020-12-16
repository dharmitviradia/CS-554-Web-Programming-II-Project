const MongoClient = require('mongodb').MongoClient
const settings = {
  mongoConfig: {
    serverUrl: 'mongodb+srv://stonkmarket:m0ng0.db@cluster0.ao3cp.mongodb.net/stonkmarket?retryWrites=true&w=majority',
    database: 'stonkmarket'
  }
}
const mongoConfig = settings.mongoConfig;

let _connection = undefined
let _db = undefined

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true
    })
    _db = await _connection.db(mongoConfig.database)
  }

  return _db
}