import { Patient } from "./patient.entity";

// Dependence Invertion
export interface PatientRepositoryInterface {
  insert(patient: Patient): Promise<void>;
  findAll(): Promise<Patient[]>;
}