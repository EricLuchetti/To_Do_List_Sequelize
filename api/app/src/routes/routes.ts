import AuthController from "../controllers/AuthController";
import TarefaController from "../controllers/TarefaController";
import UsuarioController from "../controllers/UsuarioController";
import authMiddleware from "../middlewares/auth.middleware";

export class Routes {

    constructor () { }

    public routes(app: any) {
        const authController = new AuthController();
        const tarefaController = new TarefaController();
        const usuarioController = new UsuarioController();
        
        // Rotas nao autenticadas
        // Auth
        app.post('/auth/login', authController.login);
        app.post('/auth/cadastrar', usuarioController.cadastrar);
        app.get('/auth/validar-codigo/:cod_recuperacao', authController.confirmarCodRecuperacao);
        app.post('/auth/recuperar-senha', authController.enviarCodRecuperarSenha);
        app.put('/auth/alterar-senha/:cod_recuperacao', authController.alterarSenha);
        
        // Rotas autenticadas
        app.use(authMiddleware.authenticate());
        app.get('/perfil', authController.getProfile);

        // Tarefa
        app.get('/listar', tarefaController.listar);
        app.get('/listar/prioridades', tarefaController.listarPrioridades);
        app.post('/cadastrar', tarefaController.cadastrar);
        app.put('/tarefa/:id', tarefaController.atualizar);
        app.delete('/tarefa/:id', tarefaController.deletar);
        app.post('/detalhar', tarefaController.detalhar);
        app.post('/detalhar/prioridades', tarefaController.detalharPrioridades);
        
        // Usuario
        app.post('/usuario/listar', usuarioController.listar);
        app.get('/usuario', usuarioController.detalhar);
        app.put('/usuario', usuarioController.atualizar);
        app.delete('/usuario', usuarioController.deletar);
    }
}