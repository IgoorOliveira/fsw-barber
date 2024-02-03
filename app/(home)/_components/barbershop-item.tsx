import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopItemProps {
    barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    return (
        <div>
            <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
                <CardContent className="px-1 py-0">
                    <div className="relative h-[159px] w-full">
                        <div className="absolute top-3 left-3 z-50">
                            <Badge variant="secondary" className="flex gap-1 items-center opacity-75">
                                <StarIcon size={12} className="fill-primary stroke-primary"/>
                                <span className="text-xs">5.0</span>
                            </Badge>
                        </div>
                        <Image
                            src={barbershop.imageUrl}
                            fill
                            alt={barbershop.name}
                            style={{
                                objectFit: "cover"
                            }}
                            className=" rounded-xl"
                        />
                    </div>
                    <div className="px-2 pb-3">
                        <h2 className="font-bold mt-2 overflow-hidden text-nowrap text-ellipsis">{barbershop.name}</h2>
                        <p className="text-sm text-gray-400 overflow-hidden text-nowrap text-ellipsis">{barbershop.address}</p>
                        <Button className="mt-3 w-full" variant="secondary">Reservar</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default BarbershopItem;