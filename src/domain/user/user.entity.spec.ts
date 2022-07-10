import crypto from 'crypto';
import { User, UserProps } from './user.entity';

let userProps: UserProps;
let user: User;

beforeEach(() => {
  userProps = {
    id: crypto.randomUUID(),
    name: "john doe",
    email: "John@DOE.com",
    phones: ["(11)99999-9999"],
  }
})

describe('Create User Tests', () => {
  test('constructor', () => {
    user = User.create(userProps);
    expect(user.id).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john@doe.com');
    expect(user.phones[0]).toBe('11999999999');
    expect(user.isActive).toBe(true);
  })
})

describe('Update User Tests', () => {
  test('All update methods', () => {
    user = User.create(userProps);
    user.updateName('juliano da costa');
    user.updateEmail('APFJULIANO@GMAIL.COM');
    expect(user.name).toBe('Juliano da Costa');
    expect(user.email).toBe('apfjuliano@gmail.com');
    expect(user.phones[0]).toBe('11999999999');
    expect(user.isActive).toBe(true);
  })
  test('Activate and deactivate methods', () => {
    user = User.create(userProps);
    user.deactivate();
    expect(user.isActive).toBe(false);
    user.activate();
    expect(user.isActive).toBe(true);
  })
});

describe('User toJSON Tests', () => {
  test('toJSON method', () => {
    user = User.create(userProps);
    expect(user.toJSON()).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      phones: user.phones,
      isActive: user.isActive
    });
  });
});