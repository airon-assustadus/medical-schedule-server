import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { DoctorScheduleSlot, Prisma } from "@prisma/client";
import { AvailableSlotsRequest, AvailableSlotsResponse } from "src/types/AvailableSlots";
import moment from 'moment'

@Injectable()
export class DoctorScheduleSlotService {
    constructor(private prisma: PrismaService) {}

    async findByParam (
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.DoctorScheduleSlotWhereUniqueInput;
            where?: Prisma.DoctorScheduleSlotWhereInput;
            orderBy?: Prisma.DoctorScheduleSlotOrderByWithRelationInput;
            include?: Prisma.DoctorScheduleSlotInclude;
        }
    ): Promise<DoctorScheduleSlot[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.doctorScheduleSlot.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        })
    }

    async countByParam (
            where: Prisma.DoctorScheduleSlotWhereInput
    ): Promise<number> {
        return this.prisma.doctorScheduleSlot.count({
            where,
        })
    }

    async create(data: Prisma.DoctorScheduleSlotCreateInput): Promise<DoctorScheduleSlot> {
        return this.prisma.doctorScheduleSlot.create({
            data
        })
    }

    async update(params: {
        where: Prisma.DoctorScheduleSlotWhereUniqueInput;
        data: Prisma.DoctorScheduleSlotUpdateInput;
    }): Promise<DoctorScheduleSlot> {
        const {where, data} = params;
        return this.prisma.doctorScheduleSlot.update({
            data,
            where,
        })
    }

    async getAvailableSlots(request: AvailableSlotsRequest) : Promise<AvailableSlotsResponse> {

        const where: Prisma.DoctorScheduleSlotWhereInput = {
            AND: [
                {
                    startTime : {
                        gte: request.startDate
                    }
                },
                {
                    endTime: {
                        lte: request.endDate
                    }
                },
                {
                    doctorSchedule: {
                        doctor: {
                            id: request.doctorId
                        }
                    }
                }
            ]
        }

        const orderBy: Prisma.DoctorScheduleSlotOrderByWithRelationInput = {
            startTime: Prisma.SortOrder.asc
        }

        const data = await this.prisma.doctorScheduleSlot.findMany({where, orderBy})
        const result: AvailableSlotsResponse = {
            dates:[]
        }
        if (data.length == 0) {
            return result;
        }

        const availability = data.map(available => {
            return {
                day: moment(available.startTime).format('MM/DD/YYYY'),
                slots: [{
                    doctorScheduleSlotId: available.id,
                    time: moment(available.startTime).format('hh:mmA')
                }]
            }
        })

        let firstDate;
        availability.forEach(available => {
            if (!firstDate || (available.day != firstDate)) {
                result.dates.push(available);
                firstDate = available.day;
            } else {
                result.dates[result.dates.length - 1].slots.push(...available.slots)
            }
        })

        return result;
    }

    async delete( where: Prisma.DoctorScheduleSlotWhereUniqueInput): Promise<DoctorScheduleSlot> {
        const data:Prisma.DoctorScheduleSlotUpdateInput = {
            deleted: true
        }
        return this.prisma.doctorScheduleSlot.update({
            where,
            data
        })        
    }

    async deleteToRecreateByDoctorScheduleSlot( where: Prisma.DoctorScheduleSlotWhereInput): Promise<Prisma.BatchPayload> {
        return this.prisma.doctorScheduleSlot.deleteMany({
            where
        })        
    }

    async deleteByDoctorScheduleSlot( where: Prisma.DoctorScheduleSlotWhereInput): Promise<Prisma.BatchPayload> {
        const data:Prisma.DoctorScheduleSlotUpdateInput = {
            deleted: true
        }
        return this.prisma.doctorScheduleSlot.updateMany({
            where,
            data
        })        
    }

}