"use client";
import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter();
    const handleBackClick = () =>{
        router.back()
    }
    return (
        <div>
            <div className="relative h-[250px] w-full">
                <Image src={barbershop.imageUrl} alt={barbershop.name} fill />
                <Button size="icon" variant="outline" className="absolute top-4 left-4 z-50" onClick={handleBackClick}>
                    <ChevronLeftIcon />
                </Button>
                <Button size="icon" variant="outline" className="absolute top-4 right-4 z-50">
                    <MenuIcon />
                </Button>
            </div>
            <div className="px-5 py-3">
                <h1 className="font-bold text-xl">{barbershop.name}</h1>
                <div className="flex items-center gap-1 mt-2">
                    <MapIcon size={18} className="stroke-primary" />
                    <p className="text-sm">{barbershop.address}</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <StarIcon size={18} className="stroke-primary" />
                    <p className="text-sm">5,0 (100 avaliações)</p>
                </div>
            </div>
        </div>
    );
}

export default BarbershopInfo;