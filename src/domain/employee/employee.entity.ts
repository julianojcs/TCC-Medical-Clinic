import { User, UserProps } from "../user/user.entity";

export enum Role {
  DOCTOR = 'doctor',
  ATTENDANT = 'attendant',
}

export const isValidRole = (value: Role): boolean => {
  return Object.values(Role).includes(value)
}

export interface EmployeeProps extends UserProps {
  isAdmin?: boolean
}

export class Employee extends User implements User {
  private _role: Role;
  private _isAdmin: boolean;

  constructor(props: EmployeeProps) {
    super(props);
    this._isAdmin = props.isAdmin || false;
  }
  get role(): Role {
    return this._role;
  }
  protected set role(value: Role) {
    this._role = value;
  }
  get isAdmin(): boolean {
    return this._isAdmin || false;
  }
  private set isAdmin(value: boolean) {
    this._isAdmin = value;
  }
  unsetAdmin() {
    this._isAdmin = false;
  }
  setAdmin() {
    this._isAdmin = true;
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