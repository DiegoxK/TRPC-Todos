import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navigation from "./navigation";
import { ArrowRightFromLine } from "lucide-react";

export default function MobileSideNav() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <ArrowRightFromLine />
      </SheetTrigger>
      <SheetContent side="left">
        <Navigation />
      </SheetContent>
    </Sheet>
  );
}
