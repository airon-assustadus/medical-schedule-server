import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Doctor, Prisma } from "@prisma/client";

@Injectable()
export class DoctorService {
    constructor(private prisma: PrismaService) {}

    async findByParam (
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.DoctorWhereUniqueInput;
            where?: Prisma.DoctorWhereInput;
            orderBy?: Prisma.DoctorOrderByWithRelationInput;
            include?: Prisma.DoctorInclude;
        }
    ): Promise<Doctor[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.doctor.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        })
    }

    async create(data: Prisma.DoctorCreateInput): Promise<Doctor> {
        return this.prisma.doctor.create({
            data
        })
    }

    async update(params: {
        where: Prisma.DoctorWhereUniqueInput;
        data: Prisma.DoctorUpdateInput;
    }): Promise<Doctor> {
        const {where, data} = params;
        return this.prisma.doctor.update({
            data,
            where,
        })
    }

    async delete( where: Prisma.DoctorWhereUniqueInput): Promise<Doctor> {
        const data:Prisma.DoctorUpdateInput = {
            deleted: true
        }
        return this.prisma.doctor.update({
            where,
            data
        })        
    }

}