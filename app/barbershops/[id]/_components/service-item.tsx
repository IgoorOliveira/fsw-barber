"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Booking, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format, setHours, setMinutes } from "date-fns";
import { saveBooking } from "../_actions/save-booking";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getDayBooking } from "../_actions/get-day-booking";

interface ServiceItemProps {
    service: Service
    barbershop: Barbershop
    isAuthenticated: boolean
}

const ServiceItem = ({ service, barbershop, isAuthenticated }: ServiceItemProps) => {
    const router = useRouter();
    const { data } = useSession();
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [hour, setHour] = useState<String | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [sheetIsOpen, setSheetIsOpen] = useState(false);
    const [dayBookings, setDayBookings] = useState<Booking[]>([]);

    useEffect(() => {
        if (!date) {
            return
        }
        const refreshAvailableHours = async () => {
            const _dayBookings = await getDayBooking(barbershop.id, date);
            setDayBookings(_dayBookings);
        }
        refreshAvailableHours();
    }, [date]);

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn("google");
        }
    }
    const timeList = useMemo(() => {
        if (!date) {
            return []
        }
        return generateDayTimeList(date).filter((time) => {
            const timeHour = Number(time.split(":")[0]);
            const timeMinutes = Number(time.split(":")[1]);

            const booking = dayBookings.find((booking) => {
                const bookingHour = booking.date.getHours();
                const bookingMinutes = booking.date.getMinutes();

                return bookingHour === timeHour && bookingMinutes === timeMinutes;
            })
            if (!booking) {
                return true
            }
            return false
        })

    }, [date, dayBookings])


    const handleHourClick = (time: String) => {
        setHour(time)
    }
    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined);
    }


    const handleBookingSubmit = async () => {

        if (!date || !hour || !data?.user) {
            return
        }
        const dateHour = Number(hour.split(":")[0]);
        const dateMinutes = Number(hour.split(":")[1]);
        const newDate = setMinutes(setHours(date, dateHour), dateMinutes);
        setIsLoading(true);
        try {
            await saveBooking({
                barbershopId: barbershop.id,
                ServiceId: service.id,
                date: newDate,
                userId: (data.user as any).id
            })
            setHour(undefined);
            setDate(undefined);
            toast("Reserva realizada com sucesso!", {
                description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
                    locale: ptBR,
                }),
                action: {
                    label: "Visualizar",
                    onClick: () => router.push("/bookings"),
                },
            })
            setSheetIsOpen(false);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex items-center gap-2">
                    <div className="relative min-w-[110px] max-w-[110px] min-h-[110px] max-h-[110px]">
                        <Image
                            className="rounded-lg"
                            src={service.imageUrl}
                            alt={service.name}
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>
                        <div className="flex items-center justify-between mt-3">
                            <p className="font-bold text-primary text-sm">{Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(Number(service.price))}</p>
                            <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="secondary" onClick={handleBookingClick}>Reservar</Button>
                                </SheetTrigger>
                                <SheetContent className="p-0 overflow-y-scroll">
                                    <SheetHeader className="text-left border-b border-secondary px-5 py-6">
                                        <SheetTitle>
                                            Fazer Reserva
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="py-6">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            className=""
                                            locale={ptBR}
                                            fromDate={new Date()}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize"
                                                },
                                                cell: {
                                                    width: "100%"
                                                },
                                                button: {
                                                    width: "100%"
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px"
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px"
                                                },
                                                caption: {
                                                    textTransform: "capitalize"
                                                }
                                            }}
                                        />
                                    </div>
                                    {date && (
                                        <div className="flex gap-3 px-5 py-6 border-t border-secondary overflow-x-auto [&&:-webkit-scrollbar]:hidden">
                                            {timeList.map((time, index) => (
                                                <Button onClick={() => handleHourClick(time)} className="rounded-full" variant={
                                                    time == hour ? "default" : "outline"
                                                } key={index}>{time}</Button>
                                            ))}
                                        </div>
                                    )}
                                    <div className="px-5 py-6 border-t border-secondary">
                                        <Card>
                                            <CardContent className="p-3 flex flex-col gap-3">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <h3 className="text-sm font-bold">{Intl.NumberFormat("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL"
                                                    }).format(Number(service.price))}</h3>
                                                </div>
                                                {date && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-400">Data</h3>
                                                        <h4 className="text-sm">{format(date, "dd 'de' MMMM", {
                                                            locale: ptBR
                                                        })}</h4>
                                                    </div>
                                                )}
                                                {hour && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-400">Horário</h3>
                                                        <h4 className="text-sm">{hour}</h4>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm text-gray-400">Barbearia</h3>
                                                    <h4 className="text-sm">{barbershop.name}</h4>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <SheetFooter className="px-5">
                                        <Button onClick={handleBookingSubmit} disabled={!date || !hour || isLoading}>
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Confirmar reserva
                                        </Button>
                                    </SheetFooter>

                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;