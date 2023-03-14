import * as express from "express"
import userModel from "./users.model";
import Controller from "interfaces/controller.interface";
import User from "./user.interface";

class UsersController implements Controller {
  public path = "/user"
  public router = express.Router()
  private user = userModel

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes = () => {
    this.router.post(this.path, this.createUser)
    this.router.get(`${this.path}/:username/:password`, this.getUser)
  }

  private getUser = (request: express.Request, response: express.Response) => {
    const {username, password} = request.params
    response.send(`${username}: ${password}`)
  }

  private createUser = (request: express.Request, response: express.Response) => {
    const userData: User = request.body
    const createdUser = new this.user(userData)
    createdUser.save()
      .then(savedUser => {
        response.send(`created user: ${savedUser}`)
      })

  }
}

export default UsersController
