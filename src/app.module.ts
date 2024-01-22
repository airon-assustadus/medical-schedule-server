import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorScheduleController } from './controllers/doctorSchedule.controller';
import { DoctorScheduleSlotService } from './services/doctorScheduleSlot.service';
import { PatientController } from './controllers/patient.controller';
import { ServiceLocationController } from './controllers/serviceLocation.controller';
import { ServiceTypeController } from './controllers/serviceType.controller';
import { VisitReasonController } from './controllers/visitReason.controller';
import { DoctorService } from './services/doctor.service';
import { DoctorScheduleService } from './services/doctorSchedule.service';
import { DoctorScheduleSlotController } from './controllers/doctorScheduleSlot.controller';
import { PatientService } from './services/patient.service';
import { ServiceLocationService } from './services/serviceLocation.service';
import { ServiceTypeService } from './services/serviceType.service';
import { VisitReasonService } from './services/visitReason.service';

@Module({
  imports: [
    ConfigModule.forRoot()],
  controllers: [
    AppController,
    DoctorController,
    DoctorScheduleController,
    DoctorScheduleSlotController,
    PatientController,
    ServiceLocationController,
    ServiceTypeController,
    VisitReasonController
  ],
  providers: [
    AppService, 
    DoctorService,
    DoctorScheduleService,
    DoctorScheduleSlotService,
    PatientService,
    ServiceLocationService,
    ServiceTypeService,
    VisitReasonService,
    PrismaService,
  ],
})
export class AppModule {}
