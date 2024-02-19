"use server"

import { db } from "@/prisma/prisma";

interface SaveBookingParams {
    barbershopId: string;
    ServiceId: string;
    userId: string;
    date: Date;
}

export const saveBooking = async (params: SaveBookingParams) => {
    await db.booking.create({
        data: {
            barbershopId: params.barbershopId,
            userId: params.userId,
            serviceId: params.ServiceId,
            date: params.date
        }
    })
}
 