
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const salt = 12
const encrpytPassword = 'hash'
const password = 'any_password'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve(encrpytPassword))
  }
}))

describe.only('Bcrypt class', () => {
  test('Should call encrypt with correct params', async () => {
    const bcryptAdapter = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await bcryptAdapter.encrypt(password)
    expect(hashSpy).toBeCalledWith(password, salt)
  })
  test('Should return a hash on sucess', async () => {
    const bcryptAdapter = new BcryptAdapter(salt)
    const encrpyt = await bcryptAdapter.encrypt(password)
    expect(encrpyt).toBe(encrpytPassword)
  })
  // test('Should throw if encrypt throws', async () => {
  //   const bcryptAdapter = new BcryptAdapter(salt)
  //   jest.spyOn(bcrypt, 'hash')
  //     .mockReturnValueOnce(await new Promise((resolve, reject) => reject(new Error())))

  //   const promise = bcryptAdapter.encrypt(password)
  //   await expect(promise).rejects.toThrow()
  // })
})
