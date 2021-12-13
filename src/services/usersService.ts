import faker from 'faker';

import * as usersRepository from '../repositories/usersRepository';
import { userSchema } from '../schemas/UserSchema';

export async function create(name: string, userClass: string) {
  const isValid = userSchema.validate({ name, userClass });
  if (isValid.error !== undefined) return false;

  const nameIsAvailable = await usersRepository.checkName(name);
  if (!nameIsAvailable) return null;

  const token = faker.datatype.uuid();

  const userToken = await usersRepository.createUser(name, userClass, token);
  return {
    token: userToken,
  };
}
