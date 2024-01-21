import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ServiceLocation, Prisma } from "@prisma/client";

@Injectable()
export class ServiceLocationService {
    constructor(private prisma: PrismaService) {}

    async findByParam (
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.ServiceLocationWhereUniqueInput;
            where?: Prisma.ServiceLocationWhereInput;
            orderBy?: Prisma.ServiceLocationOrderByWithRelationInput;
            include?: Prisma.ServiceLocationInclude;
        }
    ): Promise<ServiceLocation[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.serviceLocation.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        })
    }

    async create(data: Prisma.ServiceLocationCreateInput): Promise<ServiceLocation> {
        return this.prisma.serviceLocation.create({
            data
        })
    }

    async update(params: {
        where: Prisma.ServiceLocationWhereUniqueInput;
        data: Prisma.ServiceLocationUpdateInput;
    }): Promise<ServiceLocation> {
        const {where, data} = params;
        return this.prisma.serviceLocation.update({
            data,
            where,
        })
    }

    async delete( where: Prisma.ServiceLocationWhereUniqueInput): Promise<ServiceLocation> {
        const data:Prisma.ServiceLocationUpdateInput = {
            deleted: true
        }
        return this.prisma.serviceLocation.update({
            where,
            data
        })        
    }

}