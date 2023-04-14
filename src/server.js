const express = require("express");
const { router } = require("./routes")
const cors = require("cors");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('Acessou o middleware')
    res.header("Acess-Control-Allow", "*");
    cors()
    next();
  });



app.use(router)
app.listen(8080, () => {
    console.log("Server running on port 8080...")
})