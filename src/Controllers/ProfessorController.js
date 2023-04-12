const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();


async function createProfessor(req, res){
    try {
        const { nome, email, senha } = req.body;
        let professor = await prisma.professor.findUnique({
            where : { email}
        })
        if(professor) {
            return res.json({err: "Esse email já está em uso"})
        } 
        await bcrypt.hash(senha, 10).then((hash) => {
            prisma.professor.create({
                data : {
                    nome,
                    email,
                    senha: hash 
                }
                }).then(() => {
                    res.json("Usuário criado");
                }).catch((err) => {
                    res.json({err: "Algo deu errado"})
                })
        })       
       
    }catch(err){
        res.json({error : err});
    }
}








module.exports = {createProfessor}