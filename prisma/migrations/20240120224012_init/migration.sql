-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorSchedule" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "endTime" INTEGER NOT NULL,
    "consultationTimeInMinutes" INTEGER NOT NULL,
    "weekdays" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DoctorSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "doctorScheduleSlotId" INTEGER,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ServiceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitReason" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VisitReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ServiceLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorScheduleSlot" (
    "id" SERIAL NOT NULL,
    "doctorScheduleId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "patientId" INTEGER,
    "visitReasonId" INTEGER,
    "serviceLocationId" INTEGER,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DoctorScheduleSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DoctorScheduleSlotServiceTypes" (
    "doctorScheduleSlotId" INTEGER NOT NULL,
    "serviceTypeId" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DoctorScheduleSlotServiceTypes_pkey" PRIMARY KEY ("serviceTypeId","doctorScheduleSlotId")
);

-- CreateIndex
CREATE INDEX "DoctorScheduleSlotServiceTypes_serviceTypeId_idx" ON "DoctorScheduleSlotServiceTypes"("serviceTypeId");

-- CreateIndex
CREATE INDEX "DoctorScheduleSlotServiceTypes_doctorScheduleSlotId_idx" ON "DoctorScheduleSlotServiceTypes"("doctorScheduleSlotId");

-- AddForeignKey
ALTER TABLE "DoctorSchedule" ADD CONSTRAINT "DoctorSchedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceType" ADD CONSTRAINT "ServiceType_doctorScheduleSlotId_fkey" FOREIGN KEY ("doctorScheduleSlotId") REFERENCES "DoctorScheduleSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorScheduleSlot" ADD CONSTRAINT "DoctorScheduleSlot_doctorScheduleId_fkey" FOREIGN KEY ("doctorScheduleId") REFERENCES "DoctorSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorScheduleSlot" ADD CONSTRAINT "DoctorScheduleSlot_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorScheduleSlot" ADD CONSTRAINT "DoctorScheduleSlot_visitReasonId_fkey" FOREIGN KEY ("visitReasonId") REFERENCES "VisitReason"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorScheduleSlot" ADD CONSTRAINT "DoctorScheduleSlot_serviceLocationId_fkey" FOREIGN KEY ("serviceLocationId") REFERENCES "ServiceLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorScheduleSlotServiceTypes" ADD CONSTRAINT "DoctorScheduleSlotServiceTypes_doctorScheduleSlotId_fkey" FOREIGN KEY ("doctorScheduleSlotId") REFERENCES "DoctorScheduleSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorScheduleSlotServiceTypes" ADD CONSTRAINT "DoctorScheduleSlotServiceTypes_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
