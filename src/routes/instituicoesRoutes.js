const express = require("express")
const router = express.Router()

const controller = require("../controllers/instituicoesController")
const { checkAuth } = require("../middlewares/auth")

router.post("/criar", checkAuth, controller.criarUmNovoCadastro)
router.get("/buscar", controller.buscarTodasInstituicoes)
router.get("/encontrar", controller.encontrarInstituicaoPorBairro)
router.get("/achar", controller.acharInstituicaoPorTelefone)
router.patch("/atualizar/:id", checkAuth, controller.atualizarCadastro)
router.delete("/deletar/:id", checkAuth, controller.deletarPorId)

module.exports = router