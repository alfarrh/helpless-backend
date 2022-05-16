import { AuthenticateUserDTO } from '../dto/AuthenticateUserDTO';
import { User } from '@prisma/client';
import { prisma } from '../../../prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '../../../config/auth';

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: AuthenticateUserDTO): Promise<{ user: User; token: string }> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }
    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
