const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET


const login = (request, response) => {
    try {
        UserModel.findOne({email: request.body.email}, (error, user) => {
            if(!user) {
                return response.status(404).send({
                    message: "Usuário não encontrado",
                    email: `${request.body.email}`
                });
            }


            const validPassword = bcrypt.compareSync(request.body.password, user.password)

            if(!validPassword) {
                return response.status(401).send({
                    message: "Senha e/ou email inválido"
                })
            }

            const token = jwt.sign({name: user.name}, SECRET);

            response.status(200).send({
                message: "Usuário logado com sucesso",
                token
            })
        })
        
    } catch (error) {
        response.status(500).send({
            message: error.message
        })
    }
}

module.exports = {
    login
}