import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ServiceTypeService } from "src/services/serviceType.service";
import { ServiceType as ServiceTypeModel, Prisma } from "@prisma/client"

@Controller('serviceType')
export class ServiceTypeController {
    constructor(
        private readonly serviceTypeService: ServiceTypeService
    ){}

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<ServiceTypeModel> {
        const where: Prisma.ServiceTypeWhereInput = {
            id
        }
        const result = await this.serviceTypeService.findByParam({where});
        if (result.length > 0) {
            return result[0];
        }
        return null;
    }

    @Post('by-param')
    async findByParam(@Body() param: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ServiceTypeWhereUniqueInput;
        where?: Prisma.ServiceTypeWhereInput;
        orderBy?: Prisma.ServiceTypeOrderByWithRelationInput;
        include?: Prisma.ServiceTypeInclude;
    }): Promise<ServiceTypeModel[]> {
        return this.serviceTypeService.findByParam(param);
    }

    @Post()
    async create(@Body() data: Prisma.ServiceTypeCreateInput): Promise<ServiceTypeModel> {
        return this.serviceTypeService.create(data);
    }

    @Put(':id')
    async update(@Body() data: Prisma.ServiceTypeCreateInput, @Param('id', ParseIntPipe) id: number): Promise<ServiceTypeModel> {
        const where: Prisma.ServiceTypeWhereUniqueInput = {
            id
        }
        return this.serviceTypeService.update({where,data});
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ServiceTypeModel> {
        const where: Prisma.ServiceTypeWhereUniqueInput = {
            id
        }
        return this.serviceTypeService.delete(where);
    }
}