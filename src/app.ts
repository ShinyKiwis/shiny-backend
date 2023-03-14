import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import Controller from 'interfaces/controller.interface';

class App {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeDatabaseConnection();
  }

  private initializeMiddleware = () => {
    this.app.use(bodyParser.json());
  };

  private initializeControllers = (controllers: Controller[]) => {
    controllers.map((controller) => {
      this.app.use('/api', controller.router);
    });
  };

  private initializeDatabaseConnection = () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
      {
        dbName: 'shiny-backend',
      }
    );
  };

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server listening on port: ${process.env.PORT}`);
    });
  }
}

export default App;
