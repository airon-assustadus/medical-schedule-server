import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Patient, Prisma } from "@prisma/client";

@Injectable()
export class PatientService {
    constructor(private prisma: PrismaService) {}

    async findByParam (
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.PatientWhereUniqueInput;
            where?: Prisma.PatientWhereInput;
            orderBy?: Prisma.PatientOrderByWithRelationInput;
            include?: Prisma.PatientInclude;
        }
    ): Promise<Patient[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.patient.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        })
    }

    async create(data: Prisma.PatientCreateInput): Promise<Patient> {
        return this.prisma.patient.create({
            data
        })
    }

    async update(params: {
        where: Prisma.PatientWhereUniqueInput;
        data: Prisma.PatientUpdateInput;
    }): Promise<Patient> {
        const {where, data} = params;
        return this.prisma.patient.update({
            data,
            where,
        })
    }

    async delete( where: Prisma.PatientWhereUniqueInput): Promise<Patient> {
        const data:Prisma.PatientUpdateInput = {
            deleted: true
        }
        return this.prisma.patient.update({
            where,
            data
        })        
    }

}