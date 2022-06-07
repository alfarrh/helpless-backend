import { User } from '@prisma/client';
import { prisma } from '@shared/infra/db/prisma/client';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';

import { CreateUserDTO } from '../dtos/CreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    //verificar se existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userAlreadyExists) {
      throw new AppError('Email address already used.');
    }
    //criptografar senha
    const hashedPassword = await this.hashProvider.generateHash(password);

    //criar o usuario
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return user;
  }
}

export default CreateUserService;
