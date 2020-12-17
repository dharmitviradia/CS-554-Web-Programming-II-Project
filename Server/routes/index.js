const stockRoutes = require("./stocks");

const constructorMethod = app => {
  app.use("/api/stocks", stockRoutes);
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;