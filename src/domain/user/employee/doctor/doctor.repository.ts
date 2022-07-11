import { Doctor } from "./doctor.entity";

// Inversão de Dependência
export interface DoctorRepositoryInterface {
  insert(doctor: Doctor): Promise<void>;
  findAll(): Promise<Doctor[]>;
}