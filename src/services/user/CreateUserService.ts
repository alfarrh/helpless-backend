import { User } from '@prisma/client';
import { prisma } from '../../prisma/client';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { hash } from 'bcryptjs';
import AppError from '../../errors/AppError';

class CreateUserService {
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
    const hashedPassword = await hash(password, 8);

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
