import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PatientService } from "src/services/patient.service";
import { Patient as PatientModel, Prisma } from "@prisma/client"

@Controller('patient')
export class PatientController {
    constructor(
        private readonly patientService: PatientService
    ){}

    @Get(':id')
    async findById(@Param('id') id: number): Promise<PatientModel> {
        const where: Prisma.PatientWhereInput = {
            id
        }
        const result = await this.patientService.findByParam({where});
        if (result.length > 0) {
            return result[0];
        }
        return null;
    }

    @Post('by-param')
    async findByParam(@Body() param: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PatientWhereUniqueInput;
        where?: Prisma.PatientWhereInput;
        orderBy?: Prisma.PatientOrderByWithRelationInput;
        include?: Prisma.PatientInclude;
    }): Promise<PatientModel[]> {
        return this.patientService.findByParam(param);
    }

    @Post()
    async create(@Body() data: Prisma.PatientCreateInput): Promise<PatientModel> {
        return this.patientService.create(data);
    }

    @Put(':id')
    async update(@Body() data: Prisma.PatientCreateInput, @Param('id') id: number): Promise<PatientModel> {
        const where: Prisma.PatientWhereUniqueInput = {
            id
        }
        return this.patientService.update({where,data});
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<PatientModel> {
        const where: Prisma.PatientWhereUniqueInput = {
            id
        }
        return this.patientService.delete(where);
    }
}