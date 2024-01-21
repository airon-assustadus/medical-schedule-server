import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { VisitReason, Prisma } from "@prisma/client";

@Injectable()
export class VisitReasonService {
    constructor(private prisma: PrismaService) {}

    async findByParam (
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.VisitReasonWhereUniqueInput;
            where?: Prisma.VisitReasonWhereInput;
            orderBy?: Prisma.VisitReasonOrderByWithRelationInput;
            include?: Prisma.VisitReasonInclude;
        }
    ): Promise<VisitReason[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.visitReason.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        })
    }

    async create(data: Prisma.VisitReasonCreateInput): Promise<VisitReason> {
        return this.prisma.visitReason.create({
            data
        })
    }

    async update(params: {
        where: Prisma.VisitReasonWhereUniqueInput;
        data: Prisma.VisitReasonUpdateInput;
    }): Promise<VisitReason> {
        const {where, data} = params;
        return this.prisma.visitReason.update({
            data,
            where,
        })
    }

    async delete( where: Prisma.VisitReasonWhereUniqueInput): Promise<VisitReason> {
        const data:Prisma.VisitReasonUpdateInput = {
            deleted: true
        }
        return this.prisma.visitReason.update({
            where,
            data
        })        
    }

}