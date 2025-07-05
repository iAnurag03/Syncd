import { SignedIn, SignedOut, SignInButton, SignOutButton} from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";


const Topbar = () => {
  const isAdmin = false;
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900 backdrop-blur-md z-10 rounded-lg">
      <div className="flex gap-2 items-center">Syncd</div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="size-4 mr-2" />
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
