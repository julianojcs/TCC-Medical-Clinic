import { DoctorInMemoryRepository } from "./doctor-in-memory.repository";
import { Doctor } from '../../../../domain/user';
import { UserProps } from '../../../../domain/user';

let userProps: UserProps = {
  name: "John Doe",
  email: "john@doe.com",
  phones: ["11999999999"]
}
let doctor = Doctor.create(userProps);

describe('DoctorInMemory Repository Tests', () => {
  it('should insert a new doctor', async () => {
    const repository = new DoctorInMemoryRepository();
    await repository.insert(doctor);
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0].name).toBe(doctor.name);
    expect(repository.items[0].email).toBe(doctor.email);
    expect(repository.items[0].phones).toStrictEqual(doctor.phones);
    expect(repository.items[0].isActive).toBe(true);
    expect(repository.items[0].isActive).toBe(doctor.isActive);
    expect(repository.items[0].role).toBe("doctor");
    expect(repository.items[0].role).toBe(doctor.role);
    expect(repository.items[0]).toStrictEqual(doctor);
  })
  it('should find all doctors', async () => {
    const doctors: Doctor[] = [];
    const repository = new DoctorInMemoryRepository();
    for (let i=0; i<3; i++) {
      doctor = Doctor.create({...userProps, name: `John Doe #${i+1}`});
      await repository.insert(doctor);
      doctors.push(doctor);
    }
    const doctorList = await repository.findAll();
    expect(repository.items).toHaveLength(3);
    expect(repository.items).toHaveLength(doctors.length);
    expect(repository.items).toHaveLength(doctorList.length);
    expect(repository.items[0].name).toBe(doctors[0].name);
    expect(repository.items[0].name).toBe("John Doe #1");
    expect(repository.items[0].role).toBe("doctor");
    expect(repository.items[0].role).toBe(doctor.role);
    expect(repository.items[0]).toStrictEqual(doctors[0]);
    expect(repository.items[1]).toStrictEqual(doctorList[1]);
    expect(repository.items[2].name).toBe('John Doe #3');
  })
})