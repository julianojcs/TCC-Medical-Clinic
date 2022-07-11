import crypto from 'crypto';
import { Employee, EmployeeProps, Role } from './employee.entity';

let employeeProps: EmployeeProps;
let employee: Employee;

beforeEach(() => {
  employeeProps = {
    id: crypto.randomUUID(),
    name: 'john doe',
    email: 'John@DOE.com',
    phones: ['(11)99999-9999'],
  };
});

describe('Create Employee Tests', () => {
  test('constructor', () => {
    employee = Employee.create(employeeProps);

    expect(employee.id).toBeDefined();
    expect(employee.name).toBe('John Doe');
    expect(employee.email).toBe('john@doe.com');
    expect(employee.phones[0]).toBe('11999999999');
    expect(employee.role).toBeNull;
    expect(employee.isAdmin).toBe(false);
  });

  test('constructor isAdmin', () => {
    employee = new Employee({
      ...employeeProps,
      isAdmin: true,
    });

    expect(employee.isAdmin).toBe(true);
  });
});

describe('Update Employee Tests', () => {
  test('Activate and deactivate methods', () => {
    employee = new Employee(employeeProps);

    employee.setAdmin();
    expect(employee.isAdmin).toBe(true);
    employee.unsetAdmin();
    expect(employee.isAdmin).toBe(false);
  });
});

describe('Employee toJSON Tests', () => {
  test('toJSON method', () => {
    employee = new Employee(employeeProps);
    expect(employee.toJSON()).toStrictEqual({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phones: employee.phones,
      role: null,
      isAdmin: employee.isAdmin,
      isActive: employee.isActive,
    });
  });
});
