import { IAccountModel } from '../domain/models/iaccount-model'
import { IAddAccountModel } from '../domain/usecases/iadd-account'

export interface IAddAccountRepository {
  add (accountData: IAddAccountModel): Promise<IAccountModel>
}
