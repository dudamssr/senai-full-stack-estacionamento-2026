const prisma = require("../data/prisma");

const cadastrar = async (req, res) => {
    const data = req.body;

    const automovel = await prisma.automovel.findUnique({
        where: { placa: data.placa }
    });

    if (!automovel) {
        return res.status(400).json({
            erro: "Placa não cadastrada no sistema"
        });
    }

    const item = await prisma.estadia.create({
        data
    });

    res.status(201).json(item);
};

const listar = async (req, res) => {
    const lista = await prisma.estadia.findMany();

    res.json(lista).status(200).end();
};

const buscar = async (req, res) => {
    const { id } = req.params;
   
    const item = await prisma.estadia.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;

 
    if (dados.placa) {
        const automovel = await prisma.automovel.findUnique({
            where: { placa: dados.placa }
        });

        if (!automovel) {
            return res.status(400).json({
                erro: "Placa não cadastrada"
            });
        }
    }

    const item = await prisma.estadia.update({
        where: { id: Number(id) },
        data: dados
    });

    res.status(200).json(item);
};

const excluir = async (req, res) => {
    const { id } = req.params;
   
    const item = await prisma.estadia.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
}