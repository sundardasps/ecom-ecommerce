import { UserIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { CartSheet } from "../layout/CartSheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

import { useSelector } from "react-redux";

export function Navbar() {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {/* Brand */}
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Ecom</Link>
          </NavigationMenuLink>

          {/* Desktop category links */}
          <div className="hidden md:flex gap-2 ">
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()}`}
            >
              <Link to="/collections/all?gender=Men">Man</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()}`}
            >
              <Link to="/collections/all?gender=Women">Woman</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()}`}
            >
              <Link to="/collections/all?category=Top Wear">TopWear</Link>
            </NavigationMenuLink>
            <NavigationMenuLink
              asChild
              className={`${navigationMenuTriggerStyle()}`}
            >
              <Link to="/collections/all?category=Bottom Wear">BottomWear</Link>
            </NavigationMenuLink>
          </div>

          <div className="flex   items-center  justify-center gap-2">
            {user && user.role === "admin" && (
              <NavigationMenuLink asChild>
                <Link
                  to="/admin"
                  aria-label="profile"
                  className="block bg-black px-2 rounded text-xs text-white"
                >
                  Admin
                </Link>
              </NavigationMenuLink>
            )}

            {/* Desktop user icon */}

            <Link to="/profile" aria-label="profile">
              <UserIcon />
            </Link>

            {/* Cart always visible */}
            <div className=" hidden md:flex">
              <CartSheet cart={cart} />
            </div>
            {/* Search bar */}
            <div className="">
              <SearchBar />
            </div>
            {/* <div>
              <ModeToggle />
            </div> */}
            {/* Mobile actions: Cart + Drawer trigger */}
            <div className=" flex items-center gap-2 md:hidden">
              <CartSheet cart={cart} />
              <Drawer direction="left">
                <DrawerTrigger
                  className={navigationMenuTriggerStyle()}
                  aria-label="Open menu"
                >
                  <HiBars3BottomRight />
                </DrawerTrigger>
                <DrawerContent className="p-4 bg-white">
                  <DrawerHeader>
                    <DrawerTitle>Menu</DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col gap-2 p-2">
                    <Link
                      to="/collections/all?gender=Men"
                      className="py-2"
                      data-slot="navigation-menu-link"
                    >
                      Man
                    </Link>
                    <Link
                      to="/collections/all?gender=Women"
                      className="py-2"
                      data-slot="navigation-menu-link"
                    >
                      Woman
                    </Link>
                    <Link
                      to="/collections/all?category=Top Wear"
                      className="py-2"
                      data-slot="navigation-menu-link"
                    >
                      TopWear
                    </Link>
                    <Link
                      to="/collections/all?category=Bottom Wear"
                      className="py-2"
                      data-slot="navigation-menu-link"
                    >
                      BottomWear
                    </Link>
                    <Link
                      to="/profile"
                      className="py-2"
                      data-slot="navigation-menu-link"
                    >
                      Account
                    </Link>
                  </div>
                  <div className="p-2">
                    <DrawerClose className={navigationMenuTriggerStyle()}>
                      Close
                    </DrawerClose>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
