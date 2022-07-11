import { Employee, EmployeeProps, Role } from '../employee.entity';

export const shiftValues = {
  timePeriod: ['morning', 'afternoon', 'evening'],
  weekDays: [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ],
};

export const defaultShift = {
  timePeriod: ['morning', 'afternoon'],
  weekDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
};

export interface Shift {
  timePeriod: string[];
  weekDays: string[];
}

export const validateShift = (value: Shift = defaultShift): string[] => {
  const { timePeriod, weekDays } = value;
  const errorMessages: string[] = [];

  if (timePeriod.length > 3)
    errorMessages.push('Invalid timePeriod length: ' + timePeriod.length);
  if (weekDays.length > 7)
    errorMessages.push('Invalid weekDays length: ' + weekDays.length);
  const invalidWeekDays = weekDays.filter(
    (value) => !shiftValues.weekDays.includes(value),
  );
  if (invalidWeekDays.length > 0)
    errorMessages.push('Invalid weekDays value(s): ' + invalidWeekDays);
  const invalidTimePeriod = timePeriod.filter(
    (value) => !shiftValues.timePeriod.includes(value),
  );
  if (invalidTimePeriod.length > 0)
    errorMessages.push('Invalid timePeriod value(s): ' + invalidTimePeriod);
  if (errorMessages.length > 0) console.log(errorMessages);
  return errorMessages;
};

export const isValidShift = (value: Shift): boolean => {
  return validateShift(value).length === 0;
};

export interface DoctorProps extends EmployeeProps {
  speciality?: string | null;
  shift?: Shift;
}

export class Doctor extends Employee implements DoctorProps {
  private _speciality: string | null = null;
  private _shift: Shift;

  constructor(props: DoctorProps) {
    super(props);
    this._speciality = props?.speciality || null;
    this._shift = props.shift || defaultShift;
    this.role = Role.DOCTOR;
  }
  get speciality(): string | null {
    return this._speciality;
  }
  private set speciality(value: string | null) {
    this._speciality = value;
  }
  get shift(): Shift {
    return this._shift;
  }
  private set shift(value: Shift) {
    if (isValidShift(value)) this._shift = value;
    else throw new Error('Invalid shift');
  }

  static create(props: DoctorProps): Doctor {
    return new Doctor(props);
  }

  public updateSpeciality(value: string | null) {
    this.speciality = value;
  }
  public updateShift(value: Shift) {
    this.shift = value;
  }
  public updateShiftTimePeriod(value: string[]) {
    this.shift.timePeriod = value;
  }
  public updateShiftWeekDays(value: string[]) {
    this.shift.weekDays = value;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phones: this.phones,
      role: this.role,
      shift: this.shift,
      speciality: this.speciality,
      isAdmin: this.isAdmin,
      isActive: this.isActive,
    };
  }
}
