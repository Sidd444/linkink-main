
"use client";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "../../node_modules/next/link";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2 hover-target" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { data: session } = useSession(); 

  return (
    <div className={cn("fixed top-10 inset-x-2 max-w-2xl mx-auto z-50 mt-2 ", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Shop Now</HoveredLink>
            <HoveredLink href="/interface-design">About us</HoveredLink>
            <HoveredLink href="/seo">Contact</HoveredLink>
            <HoveredLink href="/branding">Socials</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Collection">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="/images.jpeg"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="/images.jpeg"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="/images.jpeg"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="/images.jpeg"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Link">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Edit Link</HoveredLink>
            <HoveredLink href="/individual">Your inventory</HoveredLink>
            <HoveredLink href="/team">Custom Design</HoveredLink>
          </div>
        </MenuItem>
        <div className="ml-auto flex items-center space-x-4">
          {session ? (
            <>
              <span>{session.user.name}</span>
              <button onClick={() => signOut()} className="text-sm text-blue-500">
                Logout
              </button>
            </>
          ) : (
            <button className="text-sm text-blue-500">
              <Link href="/login">Sign in</Link>
            </button>
          )}
        </div>
      </Menu>
    </div>
  );
}
