import { Doctor } from "./doctor.entity";

// Dependence Invertion
export interface DoctorRepositoryInterface {
  insert(doctor: Doctor): Promise<void>;
  findAll(): Promise<Doctor[]>;
}