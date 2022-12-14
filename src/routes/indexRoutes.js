const router = require("express").Router()

router.get("/", (req, res) => {
    res.send({
        "versao": "1.0",
        "titulo": "Projeto Carolina Maria de Jesus",
        "descrição": "O projeto Carolina Maria de Jesus é uma aplicação que reúne informações sobre Ongs ou Instituições que ajudam famílias em situação de extrema pobreza e/ou insegurança alimentar. A ideia da aplicação é reunir informações como nome da instituição, endereço, telefone para contato e site dessas instituições, de maneira que as famílias que se encontram vulneráveis possam, em um primeiro momento, entrar em contato e serem ajudadas."
    })
})

module.exports = router