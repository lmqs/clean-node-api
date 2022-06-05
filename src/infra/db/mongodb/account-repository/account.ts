import { IAccountModel } from '../../../../data/domain/models/iaccount-model'
import { IAddAccountModel } from '../../../../data/domain/usecases/iadd-account'
import { IAddAccountRepository } from '../../../../data/protocols/iadd-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements IAddAccountRepository {
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await (await accountCollection).insertOne(accountData)
    const account = Object.assign({}, accountData, { id: result.insertedId.toHexString() })

    return account
  }
}
