"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, Link, LogInIcon, MenuIcon, UserCircle } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

const Header = () => {
    const { data, status } = useSession();
    const handleLogoutClick = () => signOut()
    const handleLoginCLick = () => signIn("google")

    return (
        <Card>
            <CardContent className="flex flex-row justify-between items-center p-5">
                <Image
                    src="/logo.png"
                    alt="FSW Barber"
                    width="120"
                    height="22"
                />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="w-8 h-8">
                            <MenuIcon size={16} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-0">
                        <SheetHeader className="text-left border-b border-secondary p-5">
                            <SheetTitle>
                                Menu
                            </SheetTitle>
                        </SheetHeader>

                        {data?.user ? (
                            <div className="flex justify-between items-center px-5 py-6">
                                <div className="flex items-center gap-2">
                                    <Avatar>
                                        <AvatarImage src={data.user?.image ?? ""} />
                                    </Avatar>
                                    <h2 className="font-bold">{data.user?.name}</h2>
                                </div>
                                <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
                                    <LogInIcon/>
                                </Button>
                            </div>
                        ):(
                            <div className="flex flex-col gap-3 px-5 py-6">
                                <div className="flex items-center gap-2">
                                    <UserCircle size={32}/>
                                    <h2 className="font-bold">Olá, faça seu login!</h2>
                                </div>
                                <Button variant="secondary" className="w-full justify-start" onClick={handleLoginCLick}>
                                    <LogInIcon size={18} className="mr-2"/>
                                    Fazer login
                                </Button>
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <Button variant="outline" className="justify-center" asChild>
                                <Link href="/">
                                    <HomeIcon className="mr-2" />
                                    Início
                                </Link>
                            </Button>

                            {data?.user && (
                                <Button variant="outline" className="justify-center" asChild>
                                    <Link href="/bookings">
                                        <CalendarIcon className="mr-2" />
                                        Agendamentos
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;