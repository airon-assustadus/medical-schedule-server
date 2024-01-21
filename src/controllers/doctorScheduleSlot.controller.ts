import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DoctorScheduleSlotService } from "src/services/doctorScheduleSlot.service";
import { DoctorScheduleSlot as DoctorScheduleSlotModel, Prisma } from "@prisma/client"
import { AvailableSlotsRequest, AvailableSlotsResponse } from "src/types/AvailableSlots";

@Controller('doctorScheduleSlot')
export class DoctorScheduleSlotController {
    constructor(
        private readonly doctorScheduleSlotService: DoctorScheduleSlotService
    ){}

    @Get(':id')
    async findById(@Param('id') id: number): Promise<DoctorScheduleSlotModel> {
        const where: Prisma.DoctorScheduleSlotWhereInput = {
            id
        }
        const result = await this.doctorScheduleSlotService.findByParam({where});
        if (result.length > 0) {
            return result[0];
        }
        return null;
    }

    @Post('by-param')
    async findByParam(@Body() param: {
        skip?: number;
        take?: number;
        cursor?: Prisma.DoctorScheduleSlotWhereUniqueInput;
        where?: Prisma.DoctorScheduleSlotWhereInput;
        orderBy?: Prisma.DoctorScheduleSlotOrderByWithRelationInput;
        include?: Prisma.DoctorScheduleSlotInclude;
    }): Promise<DoctorScheduleSlotModel[]> {
        return this.doctorScheduleSlotService.findByParam(param);
    }

    @Post()
    async create(@Body() data: Prisma.DoctorScheduleSlotCreateInput): Promise<DoctorScheduleSlotModel> {
        return this.doctorScheduleSlotService.create(data);
    }

    @Put(':id')
    async update(@Body() data: Prisma.DoctorScheduleSlotCreateInput, @Param('id') id: number): Promise<DoctorScheduleSlotModel> {
        const where: Prisma.DoctorScheduleSlotWhereUniqueInput = {
            id
        }
        return this.doctorScheduleSlotService.update({where,data});
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<DoctorScheduleSlotModel> {
        const where: Prisma.DoctorScheduleSlotWhereUniqueInput = {
            id
        }
        return this.doctorScheduleSlotService.delete(where);
    }

    @Post('available-slots')
    async getAvailableSlots(@Body() data: AvailableSlotsRequest) : Promise<AvailableSlotsResponse> {
        return this.doctorScheduleSlotService.getAvailableSlots(data);
    }
}