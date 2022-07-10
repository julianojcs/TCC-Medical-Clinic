import { Attendant } from "./attendant.entity";

// Inversão de Dependência
export interface AttendantRepositoryInterface {
  insert(doctor: Attendant): Promise<void>;
  findAll(): Promise<Attendant[]>;
}