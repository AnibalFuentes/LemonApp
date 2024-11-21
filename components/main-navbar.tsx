'use client'
import Link from "next/link";
import { NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { usePathname } from "next/navigation";
import { Category } from "@/types";
interface MainNavProps{
    data: Category[];
}
const MainNav:React.FC<MainNavProps> = ({data}) => {
    

  const pathname = usePathname();
  const routes = data.map((route) => ({
    href: `category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));
    return (
         <>
    <NavigationMenuList>
        <NavigationMenuItem>
          {routes.map((route) => (
              <Link href="route.href" legacyBehavior passHref key={route.href}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {route.label}
              </NavigationMenuLink>
            </Link>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList> 
          </>
      );
}
 
export default MainNav;