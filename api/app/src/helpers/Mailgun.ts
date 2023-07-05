import formData from 'form-data';
import Mailgun from "mailgun.js";
import { environments } from "../libs/environments";

// Estanciando o cliente do Mailgun
const mailgun = new Mailgun(formData);
const domain = environments.mailgun_domain || 'sandboxe06969ffcba241f3b27d239389a41adc.mailgun.org';
const from = environments.mailgun_from || 'TO DO LIST <contato@sandboxe06969ffcba241f3b27d239389a41adc>';

// Utilizando o mailgun.client para configurar as credenciais
const client = mailgun.client({
    username: environments.mailgun_username || '',
    key: environments.mailgun_key || '',
});

export const sendEmail = async (title: string, content: string, to: string, html = true) => {
    try {
        let messageData: any = {
            from: from,
            to: to,
            subject: title,
        };

        // Definindo o tipo do conteudo (HTML ou txt)
        if (html) {
            messageData.html = content;
        } else {
        messageData.text = content;
        }

        // Utilizando a funcao create do mailgun para enviar o email
        const email = await client.messages.create(domain, messageData);

        if (email.status != 200) {
            throw email;
        }

        return true;

    } catch (error) {
        console.log('Erro ao tentar enviar o email: ', error);
        throw new Error('Erro ao tentar enviar o email');
    }
};

