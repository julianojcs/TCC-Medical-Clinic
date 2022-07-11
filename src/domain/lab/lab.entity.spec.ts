import crypto from 'crypto';
import { Lab, LabProps } from './';

let labProps: LabProps;
let lab: Lab;

beforeEach(() => {
  labProps = {
    id: crypto.randomUUID(),
    name: 'united LABS',
  };
});

describe('Create Lab Tests', () => {
  test('constructor', () => {
    lab = Lab.create(labProps);

    expect(lab.id).toBeDefined();
    expect(lab.name).toBe('United Labs');
    expect(lab.email).toBeNull;
    expect(lab.phones).toHaveLength(0);
    expect(lab.address).toBeNull;
    expect(lab.isActive).toBe(true);
  });

  test('constructor with address, email and phone', () => {
    lab = new Lab({
      ...labProps,
      address: '123 main st',
      email: 'unite@labs.com',
      phones: ['(27)99999-0000'],
      isActive: false,
    });

    expect(lab.id).toBeDefined();
    expect(lab.name).toBe('United Labs');
    expect(lab.email).toBe('unite@labs.com');
    expect(lab.phones[0]).toBe('27999990000');
    expect(lab.address).toBe('123 main st');
    expect(lab.isActive).toBe(false);
  });
});

describe('Update Lab Tests', () => {
  test('All update methods', () => {
    lab = new Lab(labProps);

    lab.updateAddress('1024 Hudson Street');
    lab.updateEmail('united.labs@gmail.com');
    lab.updateName('United Labs Limited');
    lab.updatePhones(['(31)98001-0001']);
  });
  test('Activate and deactivate methods', () => {
    lab = new Lab(labProps);

    lab.deactivate();
    expect(lab.isActive).toBe(false);
    lab.activate();
    expect(lab.isActive).toBe(true);
  });
});

describe('Lab toJSON Tests', () => {
  test('toJSON method', () => {
    lab = new Lab(labProps);
    expect(lab.toJSON()).toStrictEqual({
      id: lab.id,
      name: lab.name,
      address: lab.address,
      email: lab.email,
      phones: lab.phones,
      isActive: lab.isActive,
    });
  });
});
