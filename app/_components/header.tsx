"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon, Sidebar } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";

const Header = () => {
    
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
                        <SideMenu/>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;