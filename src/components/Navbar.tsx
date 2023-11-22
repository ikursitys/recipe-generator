"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const Navbar = () => {
  const session = useSession();

  return (
    <header className={classes.navbar}>
      <Link href="/" className={classes.logo}>
        Recipe Generator
      </Link>
      <nav className={classes.navlinks}>
        <input
          className={classes.toggler}
          type="checkbox"
          id={classes.toggler}
        />
        <label
          className={classes["burger-container"]}
          htmlFor={classes.toggler}
        >
          <div className={classes.burger}></div>
        </label>

        <ul className={classes.menu}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/meal">Start</Link>
          </li>

          {session?.data && (
            <li>
              <Link href="/saved">My recipes</Link>
            </li>
          )}

          {session?.data ? (
            <li>
              <Link
                href="#"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign Out
              </Link>
            </li>
          ) : (
            <li>
              <Link href="/login">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
