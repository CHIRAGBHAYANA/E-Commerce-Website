const app = require("./app");

const dotenv = require("dotenv");

// Config
dotenv.config({ path: "backend/config/config.env" });

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
