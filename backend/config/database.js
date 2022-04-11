const mongoose = require("mongoose");

const connectDataBase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb Connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDataBase;
