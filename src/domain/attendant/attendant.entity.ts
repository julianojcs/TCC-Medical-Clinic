import { Employee, EmployeeProps, Role } from "../employee/employee.entity";

export interface AttendantProps extends EmployeeProps {
}

export class Attendant extends Employee implements AttendantProps {
  constructor(props: AttendantProps) {
    super(props);
    this.role = Role.ATTENDANT;
  }

  static create(props: AttendantProps): Attendant {
    return new Attendant(props);
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
