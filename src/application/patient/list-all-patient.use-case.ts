import { PatientProps } from '../../domain/user/patient/patient.entity';
import { PatientRepositoryInterface } from '../../domain/user/patient/patient.repository';

export class ListAllPatientsUseCase {
  constructor(private patientRepo: PatientRepositoryInterface) {}

  async execute(): Promise<PatientProps[]> {
    const patients = await this.patientRepo.findAll();
    return patients.map((patient) => patient.toJSON());
  }
}
