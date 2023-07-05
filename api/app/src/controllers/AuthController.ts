import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environments } from "../libs/environments";
import { sendEmail } from "../helpers/Mailgun";
import { emailRecuperarSenha } from "../helpers/EmailTemplate";

export default class AuthController {
    constructor () { }

    public async login(req: Request, res: Response) {
        try {

            if (!req.body.login) {
                throw new Error(`O campo 'login' não foi informado`);
            }

            if (!req.body.senha) {
                throw new Error(`O campo 'senha' não foi informado`);
            }

            let usuario = await Usuario.findOne({
                where: {
                    login: req.body.login
                }
            });

            if (!usuario) {
                throw new Error(`Nenhuma conta com o login '${req.body.login}' foi localizada.`);
            }

            let senha: any = usuario.senha;
            let senhaCorreta = await bcrypt.compare(req.body.senha, senha);
            if (!senhaCorreta) {
                throw new Error("Senha inválida.");
            }

            const token = jwt.sign({ cod_usuario: usuario.cod_usuario }, environments.jwt_password ?? '', { expiresIn: '8h' });

            await Usuario.update({
                token: token
            },
                {
                    where: {
                        cod_usuario: usuario.cod_usuario
                    }
                }
            );

            res.status(200).json({
                cod_usuario: usuario.cod_usuario,
                login: usuario.login,
                email: usuario.email,
                token: token
            });
        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    }

    public async getProfile(req: Request, res: Response) {
        try {
            let user: any = req?.user;
            let data = await Usuario.findOne({
                where: { cod_usuario: user.cod_usuario },
                attributes: [
                    'cod_usuario',
                    'login',
                    'email',
                    'token',
                    'dat_cadastro',
                    'dat_atualizacao'
                ]
            });

            res.json(data);
        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    }

    public async enviarCodRecuperarSenha(req: Request, res: Response) {
        try {

            let email = req.body.email;
            let login = req.body.login;

            let usuario = await Usuario.findOne({
                where: {
                    email: email,
                    login: login
                }
            });

            if (!usuario) {
                throw new Error('Não foi possível localizar um usuário com os dados mencionados.');
            }

            let min = Math.ceil(100000);
            let max = Math.floor(999999);
            let cod_recuperacao = Math.floor(Math.random() * (max - min) + min);
            let conteudo = emailRecuperarSenha(cod_recuperacao);

            let cod_recuperacao_expiracao = new Date();
            cod_recuperacao_expiracao.setMinutes(cod_recuperacao_expiracao.getMinutes() + 10);

            await sendEmail('Código de Recuperação', conteudo, usuario.email!);

            await usuario.update({
                cod_recuperacao: cod_recuperacao,
                cod_recuperacao_expiracao: cod_recuperacao_expiracao
            });

            res.json({ message: 'E-mail enviado!' });
        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    }

    public async alterarSenha(req: Request, res: Response) {
        try {

            if (!req.params.cod_recuperacao) {
                throw new Error('Código não informado.');
            }

            if (!req.body.senha) {
                throw new Error('O campo "senha" é obrigatório.');
            }

            if (!req.body.confirmarSenha) {
                throw new Error('O campo "confirmar senha" é obrigatório.');
            }

            if (req.body.senha != req.body.confirmarSenha) {
                throw new Error('As senhas não coincidem.');
            }

            let usuario = await Usuario.findOne({
                where: {
                    cod_recuperacao: req.params.cod_recuperacao
                }
            });

            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }

            await usuario.update({
                senha: req.body.senha,
                cod_recuperacao: ''
            });

            res.json({ message: 'Senha alterada.' });

        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    }

    public async confirmarCodRecuperacao(req: Request, res: Response) {
        try {
            const cod_recuperacao = req.params.cod_recuperacao;
            const horario = new Date();

            let usuario = await Usuario.findOne({
                attributes: [
                    'login',
                    'cod_recuperacao'
                ],
                where: {
                    cod_recuperacao: cod_recuperacao
                }
            });

            if (!usuario) {
                throw new Error('Código de recuperação inválido.');
            }

            if (horario > usuario.cod_recuperacao_expiracao!) {
                throw new Error('Código expirado.');
            }

            res.json(usuario);

        } catch (error: any) {
            res.status(412).json({ message: error.message });
        }
    }
};