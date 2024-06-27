const express = require("express");
const app = express();
const routes = require("./routes/routes");

const { PORT = 2323 } = process.env;

app.use("/", routes);

app.listen(PORT, () => {
	console.log("started...");
});
