import { Patient } from '../../../../domain/user';
import { PatientRepositoryInterface } from '../../../../domain/user';

export class PatientInMemoryRepository implements PatientRepositoryInterface {
  items: Patient[] = [];
  async insert(patient: Patient): Promise<void> {
    this.items.push(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.items;
  }
}
