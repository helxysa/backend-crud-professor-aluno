const { Router } = require("express");
const { createProfessor } = require("./ProfessorController");

const router = Router();

router.post("/criarProfessor", createProfessor);


module.exports = { router }