import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { DoctorScheduleSlotServiceTypes, Prisma } from "@prisma/client";

@Injectable()
export class DoctorScheduleSlotServiceTypesService {
    constructor(private prisma: PrismaService) {}

    async findByParam (
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.DoctorScheduleSlotServiceTypesWhereUniqueInput;
            where?: Prisma.DoctorScheduleSlotServiceTypesWhereInput;
            orderBy?: Prisma.DoctorScheduleSlotServiceTypesOrderByWithRelationInput;
            include?: Prisma.DoctorScheduleSlotServiceTypesInclude;
        }
    ): Promise<DoctorScheduleSlotServiceTypes[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.doctorScheduleSlotServiceTypes.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        })
    }

    async create(data: Prisma.DoctorScheduleSlotServiceTypesCreateInput): Promise<DoctorScheduleSlotServiceTypes> {
        return this.prisma.doctorScheduleSlotServiceTypes.create({
            data
        })
    }

    async update(params: {
        where: Prisma.DoctorScheduleSlotServiceTypesWhereUniqueInput;
        data: Prisma.DoctorScheduleSlotServiceTypesUpdateInput;
    }): Promise<DoctorScheduleSlotServiceTypes> {
        const {where, data} = params;
        return this.prisma.doctorScheduleSlotServiceTypes.update({
            data,
            where,
        })
    }

    async delete( where: Prisma.DoctorScheduleSlotServiceTypesWhereUniqueInput): Promise<DoctorScheduleSlotServiceTypes> {
        const data:Prisma.DoctorScheduleSlotServiceTypesUpdateInput = {
            deleted: true
        }
        return this.prisma.doctorScheduleSlotServiceTypes.update({
            where,
            data
        })        
    }

}