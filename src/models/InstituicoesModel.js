const mongoose = require("mongoose")

const instituicoesSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    nome_instituicao: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    endereco: {
        cep: {
            type: String,
            required: true
        },
        rua: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        bairro: {
            type: String, 
            required: true
        },
        cidade: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        complemento:{
            type: String
        },
        referencia: {
            type: String
        }
    },
    site: {
        type: String,
        required: true
    },
    telefone: {
        type: [String],
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("instituicoes", instituicoesSchema)