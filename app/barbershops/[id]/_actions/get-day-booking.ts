"use server"
import { db } from "@/prisma/prisma"
import { endOfDay, startOfDay } from "date-fns"

export const getDayBooking = async (barbershopId: string, date: Date) =>{
    const bookings = await db.booking.findMany({
        where: {
            barbershopId,
            date: {
                lte: endOfDay(date),
                gte: startOfDay(date)
            }
        }
    });
    return bookings;
}