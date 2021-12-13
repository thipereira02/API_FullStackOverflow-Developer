/* eslint-disable no-undef */
import faker from 'faker';

import * as usersService from '../../src/services/usersService';
import * as usersRepository from '../../src/repositories/usersRepository';

describe('Users Service', () => {
  it('Should return token when user is created', async () => {
    const name = faker.name.firstName();
    const userClass = 'T1';
    const token = faker.datatype.uuid();

    jest.spyOn(usersRepository, 'checkName').mockImplementationOnce(async () => true);
    jest.spyOn(usersRepository, 'createUser').mockImplementationOnce(async () => token);

    const result = await usersService.create(name, userClass);
    expect(result).toBeTruthy();
  });
});
