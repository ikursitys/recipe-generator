"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./Navbar.module.css";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const session = useSession();
  console.log(session);

  const pathname = usePathname();

  return (
    <header className={classes.navbar}>
      {/* <Image className={classes.logo} src="" alt="logo" /> */}
      <div className={classes.logo}>Recipe Generator</div>
      <nav className={classes.navlinks}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/meal">Start</Link>
        {session?.data && <Link href="/saved">My recipes</Link>}

        {session?.data ? (
          <Link
            href="#"
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
          >
            Sign Out
          </Link>
        ) : (
          <Link href="/login">Sign In</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
