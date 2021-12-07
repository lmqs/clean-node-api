import { InvalidParamError, MissingParamError } from '../../errors/'
import { badRequest, serverError } from '../../helpers/http-helpers'
import { HttpRequest, HttpResponse, Controller, EmailValidator, IAddAccount } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: IAddAccount

  constructor (emailValidator: EmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFileds = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFileds) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      this.addAccount.add({
        name, email, password
      })
      return {
        statusCode: 400,
        body: 'Erro genérico'
      }
    } catch (error) {
      return serverError()
    }
  }
}
