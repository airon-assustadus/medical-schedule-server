import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { VisitReasonService } from "src/services/visitReason.service";
import { VisitReason as VisitReasonModel, Prisma } from "@prisma/client"

@Controller('visitReason')
export class VisitReasonController {
    constructor(
        private readonly visitReasonService: VisitReasonService
    ){}

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<VisitReasonModel> {
        const where: Prisma.VisitReasonWhereInput = {
            id
        }
        const result = await this.visitReasonService.findByParam({where});
        if (result.length > 0) {
            return result[0];
        }
        return null;
    }

    @Post('by-param')
    async findByParam(@Body() param: {
        skip?: number;
        take?: number;
        cursor?: Prisma.VisitReasonWhereUniqueInput;
        where?: Prisma.VisitReasonWhereInput;
        orderBy?: Prisma.VisitReasonOrderByWithRelationInput;
        include?: Prisma.VisitReasonInclude;
    }): Promise<VisitReasonModel[]> {
        return this.visitReasonService.findByParam(param);
    }

    @Post()
    async create(@Body() data: Prisma.VisitReasonCreateInput): Promise<VisitReasonModel> {
        return this.visitReasonService.create(data);
    }

    @Put(':id')
    async update(@Body() data: Prisma.VisitReasonCreateInput, @Param('id', ParseIntPipe) id: number): Promise<VisitReasonModel> {
        const where: Prisma.VisitReasonWhereUniqueInput = {
            id
        }
        return this.visitReasonService.update({where,data});
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<VisitReasonModel> {
        const where: Prisma.VisitReasonWhereUniqueInput = {
            id
        }
        return this.visitReasonService.delete(where);
    }
}