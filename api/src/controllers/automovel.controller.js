const prisma = require("../data/prisma");


const cadastrar = async (req, res) => {
    try {
        const data = req.body;

        const item = await prisma.automovel.create({
            data
        });

        res.status(201).json(item);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};


const listar = async (req, res) => {
    try {
        const lista = await prisma.automovel.findMany();

        res.status(200).json(lista);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};


const buscar = async (req, res) => {
    try {
        const { placa } = req.params;

        const item = await prisma.automovel.findUnique({
            where: { placa }
        });

        res.status(200).json(item);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};


const atualizar = async (req, res) => {
    try {
        const { placa } = req.params;
        const dados = req.body;

        const item = await prisma.automovel.update({
            where: { placa },
            data: dados
        });

        res.status(200).json(item);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};


const excluir = async (req, res) => {
    try {
        const { placa } = req.params;

        const item = await prisma.automovel.delete({
            where: { placa }
        });

        res.status(200).json(item);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};