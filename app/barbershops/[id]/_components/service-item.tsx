"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns";


interface ServiceItemProps {
    service: Service
    barbershop: Barbershop
    isAuthenticated: boolean
}

const ServiceItem = ({ service, barbershop, isAuthenticated }: ServiceItemProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [hour, setHour] = useState<String | undefined>();

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn("google");
        }
    }
    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : []
    }, [date])

    const handleHourClick = (time: String) => {
        setHour(time)
    }
    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined);
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
                            <Sheet>
                                <SheetTrigger>
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
                                        <div className="flex gap-3 px-5 py-6 border-t border-secondary  [&&:-webkit-scrollbar]:hidden">
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
                                        <Button disabled={!date || !hour}>Confirmar reserva</Button>
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