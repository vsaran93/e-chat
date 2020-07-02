const mongoose = require("mongoose");
const logger = require("./logger");
const { mongo, env } = require("./vars");

mongoose.Promise = Promise;

mongoose.connection.on("error", (error) => {
  logger.error(`MongoDB connection error: ${error}`);
  process.exit(-1);
});

if (env === "development") {
  mongoose.set("debug", true);
}

exports.connect = () => {
  mongoose
    .connect(mongo.uri, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => console.log("mongoDB connected"));
  return mongoose.connection;
};
