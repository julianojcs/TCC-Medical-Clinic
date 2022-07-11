import { DoctorInMemoryRepository } from "../../infra/db/in-memory/doctor/doctor-in-memory.repository";
import { CreateDoctorOutput, CreateDoctorUseCase } from "./create-doctor.use-case";
import { ListAllDoctorsUseCase } from "./list-all-doctor.use-case";
import { DoctorProps } from "../../domain/doctor/doctor.entity";

const doctorProps: DoctorProps = {
  name: "John Doe",
  email: "john@doe.com",
  phones: ["11999999999"]
}
const repository = new DoctorInMemoryRepository();
const createDoctorUseCase = new CreateDoctorUseCase(repository);  

describe('ListAllDoctorsUseCase Tests', () => {
  it('should list all doctors', async () => {
    const doctors: CreateDoctorOutput[] = [];
    for (let i=0; i<3; i++) {
      const result = await createDoctorUseCase.execute({...doctorProps, name: `John Doe #${i+1}`});
      doctors.push(result);
    }
    const listAllDoctorsUseCase = new ListAllDoctorsUseCase(repository)
    const doctorsList = listAllDoctorsUseCase.execute()
    doctorsList.then(list => expect(list).toHaveLength(3));
    doctorsList.then(list => expect(list).toHaveLength(doctors.length));
    doctorsList.then(list => list.forEach((doctor, index) => {
      expect(doctor.name).toBe(`John Doe #${index+1}`);
      expect(doctor.role).toBe(`doctor`);
    }));
    doctorsList.then(list => list.forEach((doctor, index) => {
      expect(doctor).toStrictEqual(doctors[index]);
    }));
  });
})