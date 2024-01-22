import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DoctorService } from "src/services/doctor.service";
import { Doctor as DoctorModel, Prisma } from "@prisma/client"

@Controller('doctor')
export class DoctorController {
    constructor(
        private readonly doctorService: DoctorService
    ){}

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<DoctorModel> {
        const where: Prisma.DoctorWhereInput = {
            id
        }
        const result = await this.doctorService.findByParam({where});
        if (result.length > 0) {
            return result[0];
        }
        return null;
    }

    @Post('by-param')
    async findByParam(@Body() param: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DoctorWhereUniqueInput;
        where?: Prisma.DoctorWhereInput;
        orderBy?: Prisma.DoctorOrderByWithRelationInput;
        include?: Prisma.DoctorInclude;
    }): Promise<DoctorModel[]> {
        return this.doctorService.findByParam(param);
    }

    @Post()
    async create(@Body() data: Prisma.DoctorCreateInput): Promise<DoctorModel> {
        return this.doctorService.create(data);
    }

    @Put(':id')
    async update(@Body() data: Prisma.DoctorCreateInput, @Param('id', ParseIntPipe) id: number): Promise<DoctorModel> {
        const where: Prisma.DoctorWhereUniqueInput = {
            id
        }
        return this.doctorService.update({where,data});
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<DoctorModel> {
        const where: Prisma.DoctorWhereUniqueInput = {
            id
        }
        return this.doctorService.delete(where);
    }
}