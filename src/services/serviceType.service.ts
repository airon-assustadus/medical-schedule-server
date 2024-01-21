import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ServiceType, Prisma } from "@prisma/client";

@Injectable()
export class ServiceTypeService {
    constructor(private prisma: PrismaService) {}

    async findByParam (
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.ServiceTypeWhereUniqueInput;
            where?: Prisma.ServiceTypeWhereInput;
            orderBy?: Prisma.ServiceTypeOrderByWithRelationInput;
            include?: Prisma.ServiceTypeInclude;
        }
    ): Promise<ServiceType[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.serviceType.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        })
    }

    async create(data: Prisma.ServiceTypeCreateInput): Promise<ServiceType> {
        return this.prisma.serviceType.create({
            data
        })
    }

    async update(params: {
        where: Prisma.ServiceTypeWhereUniqueInput;
        data: Prisma.ServiceTypeUpdateInput;
    }): Promise<ServiceType> {
        const {where, data} = params;
        return this.prisma.serviceType.update({
            data,
            where,
        })
    }

    async delete( where: Prisma.ServiceTypeWhereUniqueInput): Promise<ServiceType> {
        const data:Prisma.ServiceTypeUpdateInput = {
            deleted: true
        }
        return this.prisma.serviceType.update({
            where,
            data
        })        
    }

}