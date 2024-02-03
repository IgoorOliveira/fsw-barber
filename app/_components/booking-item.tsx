import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
const BookingItem = () => {
    return (
        <Card>
            <CardContent className="p-5 flex justify-between py-0">
                <div className="flex flex-col gap-2 py-5">
                    <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Confirmado</Badge>
                    <h2 className="font-bold">Corte masculino</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                            <AvatarImage src="https://github.com/IgoorOliveira.png" />
                            <AvatarFallback>IO</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm">Tuta's Cabeleireiros</h3>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center border-l border-secondary px-3">
                    <p className="text-sm">Fevereiro</p>
                    <p className="text-2xl">06</p>
                    <p className="text-sm">09:45</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default BookingItem;