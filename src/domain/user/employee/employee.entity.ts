import { User, UserProps } from '../user.entity';

export enum Role {
  DOCTOR = 'doctor',
  ATTENDANT = 'attendant',
}

export const isValidRole = (value: Role): boolean => {
  return Object.values(Role).includes(value);
};

export interface EmployeeProps extends UserProps {
  isAdmin?: boolean;
}

export class Employee extends User implements EmployeeProps {
  private _role: Role | null = null;
  private _isAdmin: boolean = false;

  constructor(props: EmployeeProps) {
    super(props);
    this._isAdmin = props?.isAdmin || false;
  }
  static create(props: EmployeeProps): Employee {
    return new Employee(props);
  }

  get role(): Role | null {
    return this._role;
  }
  protected set role(value: Role | null) {
    this._role = value || null;
  }
  get isAdmin(): boolean {
    return this._isAdmin || false;
  }
  private set isAdmin(value: boolean) {
    this._isAdmin = value;
  }
  unsetAdmin() {
    this.isAdmin = false;
  }
  setAdmin() {
    this.isAdmin = true;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phones: this.phones,
      role: this.role,
      isAdmin: this.isAdmin,
      isActive: this.isActive,
    };
  }
}
