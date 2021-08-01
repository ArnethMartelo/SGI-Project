const mongoose = require("mongoose");
const { mongoDB } = require("./URI");

module.exports = async () => {
  try {
    await mongoose.connect(mongoDB.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log(`Mongo is discconected`);
        process.exit(0);
      });
    });
    console.log(`Mongo connected on ${mongoDB.URI}`);
  } catch (e) {
    console.log(`An error has occurred: ${e}`);
    throw e;
  }
};
