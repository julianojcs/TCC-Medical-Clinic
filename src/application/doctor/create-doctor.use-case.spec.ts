import {
  DoctorProps,
  defaultShift,
} from '../../domain/user/employee/doctor/doctor.entity';
import { Role } from '../../domain/user/employee/employee.entity';
import { transformName, transformEmail, transformPhones } from '../../util';
import { DoctorInMemoryRepository } from '../../infra/db/in-memory/doctor/doctor-in-memory.repository';
import { CreateDoctorUseCase } from './create-doctor.use-case';

const doctorProps: DoctorProps = {
  name: 'john doe',
  email: 'John@doe.com',
  phones: ['(11)99999-9999'],
};
const repository = new DoctorInMemoryRepository();

describe('CreateDoctorUseCase Tests', () => {
  it('should create a new doctor', async () => {
    const createDoctorUseCase = new CreateDoctorUseCase(repository);
    const result = await createDoctorUseCase.execute(doctorProps);
    expect(repository.items).toHaveLength(1);
    expect(result).toStrictEqual({
      id: repository.items[0].id,
      name: transformName(repository.items[0].name),
      email: transformEmail(repository.items[0].email),
      phones: transformPhones(repository.items[0].phones),
      role: Role.DOCTOR,
      speciality: null,
      shift: defaultShift,
      isAdmin: false,
      isActive: true,
    });
  });
});
