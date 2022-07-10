require("dotenv").config({
path: process.env.NODE_ENV === "dev" 
    ? ".env.dev" 
    : process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});
// import 'dotenv/config'
import express, {Express, Request, Response} from 'express';
import { CreateUserUseCase } from '../../../application/user/create-user.use-case';
import { CreatePatientUseCase } from '../../../application/patient/create-patient.use-case';
import { CreateDoctorUseCase } from '../../../application/doctor/create-doctor.use-case';
import { ListAllUsersUseCase } from '../../../application/user/list-all-user.use-case';
import { ListAllDoctorsUseCase } from '../../../application/doctor/list-all-doctor.use-case';
import { ListAllPatientsUseCase } from '../../../application/patient/list-all-patient.use-case';
import { UserTypeOrmRepository } from '../../db/typeorm/repository/user.repository';
import { PatientTypeOrmRepository } from '../../db/typeorm/repository/patient.repository';
import { DoctorTypeOrmRepository } from '../../db/typeorm/repository/doctor.repository';
import cors from 'cors';
import { dataSource } from '../../db/typeorm/dataSource';
import { User } from '../../db/typeorm/entity/user.entity';
import { Doctor } from '../../db/typeorm/entity/doctor.entity';
import { Patient } from '../../db/typeorm/entity/patient.entity';
import { DataSource } from 'typeorm';
// import { User } from '../../../domain/user/user.entity';
// import { Doctor } from '../../../domain/doctor/doctor.entity';
// import { Patient } from '../../../domain/patient/patient.entity';

const app: Express = express();
app.use(express.json());
app.use(cors())

// establish database connection
const connect = async () => {
  try {
    await dataSource.initialize()
    console.log("Data Source has been initialized!")
  } catch (error) {
    console.error("Error during Data Source initialization: ", error)
  }
}
connect()

const port = process.env.PORT || 3000;
const userOrmRepo = dataSource.getRepository(User)
// const userRepo = new UserTypeOrmRepository(userOrmRepo);
const patientOrmRepo = dataSource.getRepository(Patient)
// const patientRepo = new PatientTypeOrmRepository(patientOrmRepo);
const doctorOrmRepo = dataSource.getRepository(Doctor)
// const doctorRepo = new DoctorTypeOrmRepository(doctorOrmRepo);

app.get('/users', async (_: Request, res: Response) => {
  const userList = await dataSource.getRepository(User).find();
  res.status(200).json(userList);
})
app.post('/user', async (req: Request, res: Response) => {
  const user = dataSource.getRepository(User).create(req.body)
  const response = await dataSource.getRepository(User).save(user);
  res.status(201).json(response);
});

app.get('/doctors', async (_: Request, res: Response) => {
  // const listAllDoctosUseCase = new ListAllDoctorsUseCase(doctorRepo);
  // const doctorList = await listAllDoctosUseCase.execute();
  // res.status(200).json(doctorList);
})
app.post('/doctor', async (req: Request, res: Response) => {
  // const createDoctorUseCase = new CreateDoctorUseCase(doctorRepo);
  // const response = await createDoctorUseCase.execute(req.body);
  // res.status(201).json(response);
});

app.get('/patients', async (_: Request, res: Response) => {
  // const listAllPatientsUseCase = new ListAllPatientsUseCase(patientRepo);
  // const patientList = await listAllPatientsUseCase.execute();
  // res.status(200).json(patientList);
})
app.post('/patient', async (req: Request, res: Response) => {
  // const createPatientUseCase = new CreatePatientUseCase(patientRepo);
  // const response = await createPatientUseCase.execute(req.body);
  // res.status(201).json(response);
});

export const server = app.listen(3000, () => {
  console.log(`Server running on port ${port}`);
});