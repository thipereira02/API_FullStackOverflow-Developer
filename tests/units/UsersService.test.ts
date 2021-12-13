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

  it('Should return falsy when name is empty', async () => {
    const name = faker.name.firstName();
    const userClass = 'T1';
    const token = faker.datatype.uuid();

    jest.spyOn(usersRepository, 'checkName').mockImplementationOnce(async () => false);
    jest.spyOn(usersRepository, 'createUser').mockImplementationOnce(async () => token);

    const result = await usersService.create(name, userClass);
    expect(result).toBeFalsy();
  });

  it('Should return falsy when userClass is empty', async () => {
    const name = faker.name.firstName();
    const userClass = '';
    const token = faker.datatype.uuid();

    jest.spyOn(usersRepository, 'checkName').mockImplementationOnce(async () => false);
    jest.spyOn(usersRepository, 'createUser').mockImplementationOnce(async () => token);

    const result = await usersService.create(name, userClass);
    expect(result).toBeFalsy();
  });

  it('Should return falsy when userClass is invalid', async () => {
    const name = faker.name.firstName();
    const userClass = 'T44';
    const token = faker.datatype.uuid();

    jest.spyOn(usersRepository, 'checkName').mockImplementationOnce(async () => false);
    jest.spyOn(usersRepository, 'createUser').mockImplementationOnce(async () => token);

    const result = await usersService.create(name, userClass);
    expect(result).toBeFalsy();
  });
});
