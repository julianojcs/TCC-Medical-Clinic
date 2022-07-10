import { Doctor } from "../../../../domain/doctor/doctor.entity";
import { DoctorRepositoryInterface } from "../../../../domain/doctor/doctor.repository";

export class DoctorInMemoryRepository implements DoctorRepositoryInterface {
  items: Doctor[] = [];
  async insert(doctor: Doctor): Promise<void> {
    this.items.push(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return this.items;
  }
}
