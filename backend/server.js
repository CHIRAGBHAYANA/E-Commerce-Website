const app = require("./app");

const dotenv = require("dotenv");
const connectDataBase = require("./config/database");

// Config
dotenv.config();

/// Connecting to database
connectDataBase();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
