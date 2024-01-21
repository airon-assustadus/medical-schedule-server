import { Injectable } from "@nestjs/common";
import { DoctorSchedule, Prisma } from "@prisma/client";
import moment from 'moment';
import { DoctorScheduleSlotService } from "./doctorScheduleSlot.service";
import { PrismaService } from "./prisma.service";

@Injectable()
export class DoctorScheduleService {
    constructor(private prisma: PrismaService,
        private doctorScheduleSlotService: DoctorScheduleSlotService) {}

    async findByParam (
        params: {
            skip?: number;
            take?: number;
            cursor?: Prisma.DoctorScheduleWhereUniqueInput;
            where?: Prisma.DoctorScheduleWhereInput;
            orderBy?: Prisma.DoctorScheduleOrderByWithRelationInput;
            include?: Prisma.DoctorScheduleInclude;
        }
    ): Promise<DoctorSchedule[]> {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.doctorSchedule.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include
        })
    }

    async create(data: Prisma.DoctorScheduleCreateInput): Promise<void> {


        const startDate = moment(data.startDate).hours(0).minutes(0).seconds(0).milliseconds(0)
        const endDate = moment(data.endDate).hours(0).minutes(0).seconds(0).milliseconds(0)

        const initHour = Math.floor(data.startTime / 60);
        const initMin = data.startTime % 60;

        const endHour = Math.floor(data.endTime);
        const endMin = data.endTime % 60;

        const addOneDay = data.endTime < data.startTime;

        while (startDate.isSameOrBefore(endDate)) {
            const startDateTime = moment(startDate).hours(initHour).minutes(initMin)
            const daysToAdd = addOneDay ? 1 : 0;
            const endDateTime = moment(startDateTime).hours(endHour).minutes(endMin).add(daysToAdd, 'day')
            if (data.weekdays && data.weekdays.indexOf(startDate.day() + '') < 0){
                startDate.add(1, 'day');
                continue;
            }

            data.startDate = moment(startDateTime).toDate()
            data.endDate = moment(endDateTime).toDate()

            const contador = await this.prisma.doctorSchedule.count({
                where: {
                    AND: [
                        {
                            doctor: {
                               is : {
                                id: data.doctor.connect.id
                               }
                            }
                        },
                        {
                            endDate: {
                                gte: data.startDate
                            }
                        },
                        {
                            startDate: {
                                lte: data.endDate
                            }
                        },
                        {
                            deleted: false
                        }
                    ]
                }
            })

            if (contador > 0) {
                startDate.add(1, 'day');
                continue;
            }

            const schedule = await this.prisma.doctorSchedule.create({
                data
            })

            this.expandSlots(schedule);
        }

    }

    async expandSlots(data: DoctorSchedule) {
        const startDateTime = moment(data.startDate);
        const endDateTime = moment(data.endDate);
        
        while(startDateTime.isSameOrBefore(moment(endDateTime).add( (data.consultationTimeInMinutes)*(-1), 'minutes' ))) {
            const endStepDateTime = moment(startDateTime).add(data.consultationTimeInMinutes, 'minutes');
            const slot:Prisma.DoctorScheduleSlotCreateInput = {
                doctorSchedule: {
                    connect: {
                        id: data.id
                    }
                },
                startTime: startDateTime.toDate(),
                endTime: endStepDateTime.toDate()
            }
            await this.doctorScheduleSlotService.create(slot);
            startDateTime.add(data.consultationTimeInMinutes, 'minutes');
        }
    }

    async update(params: {
        where: Prisma.DoctorScheduleWhereUniqueInput;
        data: Prisma.DoctorScheduleUpdateInput;
    }): Promise<DoctorSchedule> {
        
        const {where, data} = params;


        const whereSlots: Prisma.DoctorScheduleSlotWhereInput = {
            AND: [
                {
                    doctorScheduleId: where.id,
                },
                {
                    deleted: false,
                },
                {
                    patient: {
                        isNot: null
                    }
                }
            ]
        }

        const counter = await this.doctorScheduleSlotService.countByParam(whereSlots);

        if (counter > 0) {
            return Promise.reject('There are appointments with patients, please remove them')
        }

        await this.doctorScheduleSlotService.deleteToRecreateByDoctorScheduleSlot({
            doctorScheduleId: where.id
        })

        const toReturn = await this.prisma.doctorSchedule.update({
            data,
            where,
        })

        await this.expandSlots(toReturn);

        return toReturn;
    }

    async delete( where: Prisma.DoctorScheduleWhereUniqueInput): Promise<DoctorSchedule> {
        const data:Prisma.DoctorScheduleUpdateInput = {
            deleted: true
        }
        const toReturn = await this.prisma.doctorSchedule.update({
            where,
            data
        })        

        const slotsWhere : Prisma.DoctorScheduleSlotWhereInput = {
            doctorScheduleId: where.id
        }

        await this.doctorScheduleSlotService.deleteByDoctorScheduleSlot(slotsWhere);

        return toReturn;
    }

}