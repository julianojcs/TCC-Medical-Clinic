import { Doctor } from '../../../../domain/user';
import { DoctorRepositoryInterface } from '../../../../domain/user';

export class DoctorInMemoryRepository implements DoctorRepositoryInterface {
  items: Doctor[] = [];
  async insert(doctor: Doctor): Promise<void> {
    this.items.push(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return this.items;
  }
}
