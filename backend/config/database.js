const mongoose = require("mongoose");

const connectDataBase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb Connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

module.exports = connectDataBase;
