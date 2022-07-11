import {
  Patient,
  PatientProps,
} from '../../domain/user/patient/patient.entity';
import { PatientRepositoryInterface } from '../../domain/user/patient/patient.repository';

export interface CreatePatientOutput {
  id: string;
  name: string;
  email: string;
  phones: string[];
  healthPlan?: string | null;
  isActive: boolean;
}

export class CreatePatientUseCase {
  constructor(private patientRepo: PatientRepositoryInterface) {}

  async execute(input: PatientProps): Promise<CreatePatientOutput> {
    const patient = Patient.create(input);
    await this.patientRepo.insert(patient);
    return patient.toJSON();
  }
}
