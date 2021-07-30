const mongoose = require("mongoose");
const { mongoDB } = require("./URI");

const initMongoServer = async () => {
  try {
    await mongoose.connect(mongoDB.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`Mongo connected on ${mongoDB.URI}`);
  } catch (e) {
    console.log(`An error has occurred: ${e}`);
    throw e;
  }
  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(`Mongo is discconected`);
      process.exit(0);
    });
  });
};

module.exports = initMongoServer;
