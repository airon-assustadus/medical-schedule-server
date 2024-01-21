import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ServiceLocationService } from "src/services/serviceLocation.service";
import { ServiceLocation as ServiceLocationModel, Prisma } from "@prisma/client"

@Controller('serviceLocation')
export class ServiceLocationController {
    constructor(
        private readonly serviceLocationService: ServiceLocationService
    ){}

    @Get(':id')
    async findById(@Param('id') id: number): Promise<ServiceLocationModel> {
        const where: Prisma.ServiceLocationWhereInput = {
            id
        }
        const result = await this.serviceLocationService.findByParam({where});
        if (result.length > 0) {
            return result[0];
        }
        return null;
    }

    @Post('by-param')
    async findByParam(@Body() param: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ServiceLocationWhereUniqueInput;
        where?: Prisma.ServiceLocationWhereInput;
        orderBy?: Prisma.ServiceLocationOrderByWithRelationInput;
        include?: Prisma.ServiceLocationInclude;
    }): Promise<ServiceLocationModel[]> {
        return this.serviceLocationService.findByParam(param);
    }

    @Post()
    async create(@Body() data: Prisma.ServiceLocationCreateInput): Promise<ServiceLocationModel> {
        return this.serviceLocationService.create(data);
    }

    @Put(':id')
    async update(@Body() data: Prisma.ServiceLocationCreateInput, @Param('id') id: number): Promise<ServiceLocationModel> {
        const where: Prisma.ServiceLocationWhereUniqueInput = {
            id
        }
        return this.serviceLocationService.update({where,data});
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<ServiceLocationModel> {
        const where: Prisma.ServiceLocationWhereUniqueInput = {
            id
        }
        return this.serviceLocationService.delete(where);
    }
}