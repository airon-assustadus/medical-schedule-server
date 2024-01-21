

export type AvailableSlotsRequest = {
    doctorId: number;
    startDate: Date | string;
    endDate: Date | string;
}

export type AvailableSlotsResponse = {
    dates?: Array<{
        day: String,
        slots?: Array<{
            doctorScheduleSlotId: number,
            time: string
        }>
    }>
}