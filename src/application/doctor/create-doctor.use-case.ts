import {
  Doctor,
  DoctorProps,
} from '../../domain/user/employee/doctor/doctor.entity';
import { DoctorRepositoryInterface } from '../../domain/user/employee/doctor/doctor.repository';

export interface CreateDoctorOutput {
  id: string;
  name: string;
  email: string | null;
  phones: string[];
  role?: string | null;
  shiftTimePeriod?: Array<string>;
  shiftWeekDays?: Array<string>;
  isActive?: boolean;
  isAdmin?: boolean;
}

export class CreateDoctorUseCase {
  constructor(private doctorRepo: DoctorRepositoryInterface) {}

  async execute(input: DoctorProps): Promise<CreateDoctorOutput> {
    const doctor = Doctor.create(input);
    await this.doctorRepo.insert(doctor);
    return doctor.toJSON();
  }
}
