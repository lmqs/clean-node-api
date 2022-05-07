import { IEncrypter } from '../../data/protocols/iencrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements IEncrypter {
  private readonly salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const encrypt = await bcrypt.hash(value, this.salt)
    return encrypt
  }
}
