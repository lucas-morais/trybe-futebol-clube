import * as express from 'express';
import { ErrorMiddleware } from './middlewares';
import { loginRouter } from './routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());

    this.app.use('/login', loginRouter);

    this.app.use(ErrorMiddleware.execute);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`app rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();

app.get('/', (_req:express.Request, res: express.Response) => res.send('Nova mensagem'));
