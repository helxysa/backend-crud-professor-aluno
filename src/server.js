const express = require("express");
const { router } = require("./routes");
const {PrismaClient} = require("@prisma/client");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {createTokens, validadeToken}  = require("./JWT")
const bcrypt = require("bcrypt");

const app = express();

app.use(cors());
app.use(cookieParser()); 

app.use(express.json());
app.use(router);

const prisma = new PrismaClient();

app.post("/loginProfessor", async (req, res) => {
    try{
    const {email, senha} = req.body;
    const usuario = await prisma.professor.findUnique({where: {email}});
    if(!usuario) {
      res.json({error: "Esse usuário não existe"})
    }
    const pSenha = usuario.senha;
    bcrypt.compare(senha, pSenha).then((match) => {
      if(!match) {
        res
        .status(400)
        .json({error: "Senha e usuário incorretos"});
      }  else {
        
        const acessToken = createTokens(usuario)
        res.cookie("acess-token", acessToken, {
            // httpOnly: false,
            maxAge: 300,
      });
        
        res.json("Você está logado")
      }
    })
  
   
    } catch(error){
      console.error(error)
    }
    
  })
  
  
  app.get("/", validadeToken ,async (req, res) => {
      
      return res.json("usuario");
  })
  
  


app.listen(8080, () => {
    console.log("Server running on port 8080...")
});