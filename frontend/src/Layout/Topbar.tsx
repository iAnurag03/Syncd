import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton} from "@clerk/clerk-react";
import { AudioWaveform, LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../components/ui/Button";
import {cn} from "@/lib/utils"
import { useAuthStore } from "@/store/useAuthStore";


const Topbar = () => {
  const {isAdmin} = useAuthStore();
  console.log(isAdmin)
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900 backdrop-blur-md z-10 rounded-lg">
      <div className="flex gap-2 items-center"><AudioWaveform className="h-6 w-6 text-[#e7436c]"/>Syncd</div>
      <div className="flex items-center gap-4 ">
        {isAdmin && (
          <Link to={"/admin"} className={cn(buttonVariants({variant:"outline"})) }  >
            <LayoutDashboardIcon className="size-4 mr-2 " />Dashboard
          </Link>
        )}
        <header>
          <SignedOut>
            <Button asChild className="bg-[#e7436c]">
               <SignInButton forceRedirectUrl={"/auth-callback"} />
            </Button>
          </SignedOut>
          <SignedIn>
            <Button asChild className="bg-[#e7436c]"><SignOutButton/></Button>
           
          </SignedIn> 
        </header>
      </div>
    </div>
  );
};

export default Topbar;
