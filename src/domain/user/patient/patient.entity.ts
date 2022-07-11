import { User, UserProps } from '../user.entity';

export interface PatientProps extends UserProps {
  healthPlan?: string | null;
}

export class Patient extends User implements PatientProps {
  private _healthPlan: string | null = null;

  constructor(props: PatientProps) {
    super(props);
    this._healthPlan = props?.healthPlan || null;
  }

  static create(props: PatientProps): Patient {
    return new Patient(props);
  }
  get healthPlan() {
    return this._healthPlan;
  }
  private set healthPlan(value: string | null) {
    this._healthPlan = value;
  }
  deleteHealthPlan() {
    this._healthPlan = null;
  }
  updateHealthPlan(value: string) {
    this._healthPlan = value;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phones: this.phones,
      healthPlan: this.healthPlan,
      isActive: this.isActive,
    };
  }
}
