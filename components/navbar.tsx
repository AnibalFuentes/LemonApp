import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import MainNav from "./main-navbar";
import { getCategories } from "@/actions/get-categories";
import NavbarActions from "./navbar-action";

export const revalidate = 0;
const Navbar = async () => {
  const categories = await getCategories();
  return (
    <div className="border-b relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
      <NavigationMenu >
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <p className="font-bold text-xl">STORE</p>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <MainNav data={categories} />
      </NavigationMenu>
        <NavbarActions/>
    </div>
  );
};

export default Navbar;
