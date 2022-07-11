import { DoctorProps } from "../../domain/doctor/doctor.entity";
import { DoctorRepositoryInterface } from "../../domain/doctor/doctor.repository";

export class ListAllDoctorsUseCase {
  constructor(private doctorRepo: DoctorRepositoryInterface) {}

  async execute(): Promise<DoctorProps[]> {
    const doctors = await this.doctorRepo.findAll();
    return doctors.map((doctor) => doctor.toJSON());
  }
}