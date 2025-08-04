const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
