import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DoctorScheduleService } from "src/services/doctorSchedule.service";
import { DoctorSchedule as DoctorScheduleModel, Prisma } from "@prisma/client"

@Controller('doctorSchedule')
export class DoctorScheduleController {
    constructor(
        private readonly doctorScheduleService: DoctorScheduleService
    ){}

    @Get(':id')
    async findById(@Param('id') id: number): Promise<DoctorScheduleModel> {
        const where: Prisma.DoctorScheduleWhereInput = {
            id
        }
        const result = await this.doctorScheduleService.findByParam({where});
        if (result.length > 0) {
            return result[0];
        }
        return null;
    }

    @Post('by-param')
    async findByParam(@Body() param: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DoctorScheduleWhereUniqueInput;
        where?: Prisma.DoctorScheduleWhereInput;
        orderBy?: Prisma.DoctorScheduleOrderByWithRelationInput;
        include?: Prisma.DoctorScheduleInclude;
    }): Promise<DoctorScheduleModel[]> {
        return this.doctorScheduleService.findByParam(param);
    }

    @Post()
    async create(@Body() data: Prisma.DoctorScheduleCreateInput): Promise<void> {
        return this.doctorScheduleService.create(data);
    }

    @Put(':id')
    async update(@Body() data: Prisma.DoctorScheduleCreateInput, @Param('id') id: number): Promise<DoctorScheduleModel> {
        const where: Prisma.DoctorScheduleWhereUniqueInput = {
            id
        }
        return this.doctorScheduleService.update({where,data});
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DoctorScheduleModel> {
        const where: Prisma.DoctorScheduleWhereUniqueInput = {
            id
        }
        return this.doctorScheduleService.delete(where);
    }
}