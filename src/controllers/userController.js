const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")

const all = async (request, response) => {

    try {
        const allUsers = await UserModel.find()

        response.status(200).send({
            message: "Todos os cadastros carregados com sucesso",
            users: allUsers
        })

    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }

}


const createUser = async (request, response) => {
    const hashedPassword = bcrypt.hashSync(request.body.password, 10)

    request.body.password = hashedPassword

    const emailExists = await UserModel.exists({ email: request.body.email })

    if (emailExists) {
        return response.status(409).send({
            message: "Email já cadastrado"
        })
    }

    const checkIfEmailIncludes = request.body.email.includes("@")

    if (!checkIfEmailIncludes) {
        return response.status(409).send({
            message: "Insira um email válido"
        })
    }

    const checkIfItHas = request.body.email.includes(".com")

    if (!checkIfItHas) {
        return response.status(409).send({
            message: "Insira um email válido"
        })
    }

    try {
        const newUser = new UserModel(request.body)

        const savedUser = await newUser.save()

        response.status(201).send({
            message: "Usuário criado com sucesso",
            savedUser
        })
    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}

const updateOne = async (request, response) => {

    const { name, password, email } = request.body


    try {
        const searchForOne = await UserModel.findOne({ email: request.query.email })

        if (!searchForOne) {
            return response.status(404).send({
                message: "Nenhum cadastro encontrado para o email digitado"
            })
        }

        searchForOne.name = name || searchForOne.name
        searchForOne.password = password || searchForOne.password
        searchForOne.email = email || searchForOne.email

        const savedUpdate = searchForOne.save()

        response.status(200).send({
            message: "Cadastro atualizado com sucesso",
            updated: savedUpdate
        })

    } catch (error) {
        response.status(500).send({
            message: error.message
        })

    }

}




module.exports = {
    all,
    createUser,
    updateOne
}