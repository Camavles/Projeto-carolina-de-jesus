const InstituicoesModel = require("../models/InstituicoesModel")


const criarUmNovoCadastro = async (request, response) => {

    const { nome_instituicao, descricao, endereco, telefone, site } = request.body


    if (!nome_instituicao || nome_instituicao.trim() === "") {
        return response.status(400).send({
            message: "O Nome da instituição é obrigatório"
        })
    }

    if (!descricao || descricao.trim() === "") {
        return response.status(400).send({
            message: "A descrição é obrigatória"
        })
    }

    if(!endereco) {
        return response.status(400).send({
            message: "O endereço é obrigatório"
        })
    }

    if (!telefone) {
        return response.status(400).send({
            message: "O telefone é obrigatório"
        })
    }

    if (!site || site.trim() === "") {
        return response.status(400).send({
            message: "O site é obrigatório"
        })
    }


    const verificaSeOTelefoneJaExiste = await InstituicoesModel.exists({telefone: telefone})

    if(verificaSeOTelefoneJaExiste) {
        return response.status(400).send({
            message: "Telefone já cadastrado"
        })
    }

    try {

        const novaInstituicao = new InstituicoesModel({
            nome_instituicao: nome_instituicao,
            descricao: descricao,
            endereco: endereco,
            telefone: telefone,
            site: site
        })

        const salvarInstituicao = await novaInstituicao.save()

        response.status(201).send({
            message: "Cadastro realizado com sucesso!",
            instituicao: salvarInstituicao
        })

    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}


const buscarTodasInstituicoes = async (request, response) => {
    try {
        const todasInstituicoes = await InstituicoesModel.find()

        response.status(200).send({
            message: "Todas os cadastros carregados com sucesso",
            instituicoes: todasInstituicoes
        })

    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }

}


const encontrarInstituicaoPorBairro = async (request, response) => {
    const { bairro } = request.query

    let query = { }

    if(bairro) query["endereco.bairro"] = new RegExp(bairro, 'i')

    try {

        const encontreInstituicao = await InstituicoesModel.find(query)

        response.status(200).send({
            message: "Cadastro encontrado",
            instituicao: encontreInstituicao
        })

    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }

}


const acharInstituicaoPorTelefone = async (request, response) => {
    const { telefone } = request.query

    let query = { }

    if(telefone) query["telefone"] = new RegExp(telefone, 'i')

    try {
        const acheInstituicao = await InstituicoesModel.find(query)

        response.status(200).send({
            message: "Intituição encontrada",
            instituicao: acheInstituicao
        })

    } catch (error) {

        response.status(500).send({
            message: error.message
        })
    }
}


const atualizarCadastro = async (request, response) => {

    const { nome_instituicao, endereco, telefone, descricao, site } = request.body

    const encontrarCadastro = await InstituicoesModel.findById(request.params.id)

    if(!encontrarCadastro) {
        response.status(404).send({
            message: "Cadastro não encontrado"
        })
    }

    try {
        
        encontrarCadastro.nome_instituicao = nome_instituicao || encontrarCadastro.nome_instituicao
        encontrarCadastro.endereco = endereco || encontrarCadastro.endereco
        encontrarCadastro.telefone = telefone || encontrarCadastro.telefone
        encontrarCadastro.descricao = descricao || encontrarCadastro.descricao
        encontrarCadastro.sie = site || encontrarCadastro.site 

        const instituicaoSalva = await encontrarCadastro.save()

        response.status(200).send({
            message: "Cadastro atualizado com sucesso",
            cadastro: instituicaoSalva
        })
    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}

const deletarPorId = async (request, response) => {

    const todosOsCadastros = await InstituicoesModel.findById(request.params.id)

    if(!todosOsCadastros) {
        response.status(404).send({
            message: "Cadastro não encontrado"

        })
    }

    try {
        
        await todosOsCadastros.delete()

        response.status(200).send({
            message: "Cadastro deletado com sucesso"
        })
        
    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}


module.exports = {
    criarUmNovoCadastro,
    buscarTodasInstituicoes,
    encontrarInstituicaoPorBairro,
    acharInstituicaoPorTelefone,
    atualizarCadastro,
    deletarPorId
}