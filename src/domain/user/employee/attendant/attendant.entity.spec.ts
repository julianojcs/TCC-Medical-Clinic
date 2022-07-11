import crypto from 'crypto';
import {
  transformEmail,
  transformName,
  transformPhones,
} from '../../user.entity';
import { Attendant, AttendantProps } from './attendant.entity';

let attendantProps: AttendantProps;
let attendant: Attendant;

beforeEach(() => {
  attendantProps = {
    id: crypto.randomUUID(),
    name: 'john doe',
    email: 'John@DOE.com',
    phones: ['(11)99999-9999'],
  };
});

describe('Create Attendant Tests', () => {
  test('constructor', () => {
    attendant = Attendant.create({ ...attendantProps, isAdmin: true });

    expect(attendant.id).toBeDefined();
    expect(attendant.name).toBe('John Doe');
    expect(attendant.email).toBe('john@doe.com');
    expect(attendant.phones[0]).toBe('11999999999');
    expect(attendant.role).toBe('attendant');
    expect(attendant.isActive).toBe(true);
    expect(attendant.isAdmin).toBe(true);
  });
  test('Activate and deactivate methods', () => {
    attendant = new Attendant(attendantProps);

    attendant.deactivate();
    expect(attendant.isActive).toBe(false);
    attendant.activate();
    expect(attendant.isActive).toBe(true);
  });
});

describe('Attendant toJSON Tests', () => {
  test('toJSON method', () => {
    attendant = new Attendant(attendantProps);
    expect(attendant.toJSON()).toStrictEqual({
      id: attendant.id,
      name: 'John Doe',
      email: 'john@doe.com',
      phones: ['11999999999'],
      role: 'attendant',
      isAdmin: false,
      isActive: true,
    });
  });
});
