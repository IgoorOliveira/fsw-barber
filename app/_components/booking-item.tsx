import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true,
        }
    }>
}
const BookingItem = ({ booking }: BookingItemProps) => {
    const isBookingConfirmed = isFuture(booking.date);
    return (
        <Card>
            <CardContent className="p-0 flex">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                    {isBookingConfirmed ? (
                        <Badge variant="default" className="w-fit">Confirmado</Badge>
                    ) : (<Badge variant="secondary" className="w-fit">Finalizado</Badge>)
                    }

                    <h2 className="font-bold">{booking.service.name}</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src={booking.barbershop.imageUrl} />
                            <AvatarFallback>B</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm">{booking.barbershop.name}</h3>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center border-l border-secondary flex-1">
                    <p className="text-sm capitalize">{format(booking.date, "MMMM", {
                        locale: ptBR
                    })}</p>
                    <p className="text-2xl">{format(booking.date, "dd")}</p>
                    <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default BookingItem;