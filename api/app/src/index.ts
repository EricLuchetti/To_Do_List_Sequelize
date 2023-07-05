import app from './libs/app';

async function start(port: string) {
    try {
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.log('Erro de conexão com banco de dados: ', error);
    }
}

start(app.get('port'));