const { Router } = require("express");
const { createProfessor, buscarProfessor } = require("./Controllers/ProfessorController");
const { createAluno, buscarAluno, updateAluno, DeleteAluno } = require("./Controllers/AlunoController")

const router = Router();

//Professor
router.post("/criarProfessor", createProfessor);
router.get("/professor/:id", buscarProfessor)
//Aluno
router.post("/criarAluno",  createAluno);
router.get("/:professorId/alunos", buscarAluno);
router.put("/:professorId/alunos/:alunoId", updateAluno);
router.delete("/:professorId/:alunoId", DeleteAluno)

module.exports = { router }