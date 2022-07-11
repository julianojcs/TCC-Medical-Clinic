import { Attendant } from "./attendant.entity";

// Dependence Invertion
export interface AttendantRepositoryInterface {
  insert(doctor: Attendant): Promise<void>;
  findAll(): Promise<Attendant[]>;
}