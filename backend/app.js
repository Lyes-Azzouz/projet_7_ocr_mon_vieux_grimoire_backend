const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbUsername = "newusertest";
const dbPassword = "azertyuiop";
const dbCluster = "cluster0.oysygqt.mongodb.net";
const dbName = "test";
const booksRoute = require("./routes/booksRoute");

mongoose
  .connect(
    `mongodb+srv://${dbUsername}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Connexion à MongoDB échouée :", error));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/books", booksRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;