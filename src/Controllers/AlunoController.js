const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAluno(req, res) {
  const { nome, curso, professorId, id } = req.body;
  const aluno = prisma.aluno.findUnique({where: { id }});
  if(aluno){
    return res.json("Esse aluno já foi cadastrado ");
  }
  try {
    const aluno = await prisma.aluno.create({
      data: {
        nome,
        curso,
        professorId,
      },
    });
    res.json(aluno);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar novo aluno.' });
  }
};

async function buscarAluno(req, res){
  const { professorId } = req.params;

  try{
    const alunos = await prisma.aluno.findMany({
      where: {
        professorId: parseInt(professorId)}
    });
    res.json(alunos);

  }catch(err){
    res.status(500).json({error: "Erro de busca de alunos"});

  }
}

async function updateAluno(req, res){
  const {professorId, alunoId} = req.params;
  const {nome, curso} =  req.body;

  try{
    const alunoAtualizado = await prisma.aluno.update({
      where: {id: parseInt(alunoId, 10)},
      data: {nome, curso},
      
    });
      
      res.json(alunoAtualizado);

  } catch(err){
    res.json({error: err})
  }
}

async function DeleteAluno(req, res){
  const { professorId, alunoId} = req.params;

  try{
    const deletedAluno = await prisma.aluno.delete({
      where: {
        id:  parseInt(alunoId, 10)
      }
    })
    res.json({message: "Aluno Deletado", deletedAluno})
  }catch(err){
    res.status(400).json({err: "Algo deu errado"});
  }
}

module.exports = {createAluno, buscarAluno, updateAluno, DeleteAluno}
