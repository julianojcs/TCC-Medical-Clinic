import { UserProps } from '../../domain/user/user.entity';
import { transformName, transformEmail, transformPhones } from '../../util';
import { UserInMemoryRepository } from '../../infra/db/in-memory/user/user-in-memory.repository';
import { CreateUserUseCase } from './create-user.use-case';

const userProps: UserProps = {
  name: 'john doe',
  email: 'John@doe.com',
  phones: ['(11)99999-9999'],
};
const repository = new UserInMemoryRepository();

describe('CreateUserUseCase Tests', () => {
  it('should create a new user', async () => {
    const createUserUseCase = new CreateUserUseCase(repository);
    const result = await createUserUseCase.execute(userProps);
    expect(repository.items).toHaveLength(1);
    expect(result).not.toStrictEqual({
      id: repository.items[0].id,
      name: transformName(repository.items[0].name),
      email: transformEmail(repository.items[0].email),
      phones: transformPhones(repository.items[0].phones),
    });

    expect(result).toStrictEqual({
      id: repository.items[0].id,
      ...userProps,
      name: transformName(repository.items[0].name),
      email: transformEmail(repository.items[0].email),
      phones: transformPhones(repository.items[0].phones),
      isActive: true,
    });
  });
});
