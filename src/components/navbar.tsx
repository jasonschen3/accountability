"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-sm border-b border-gt-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <Image
              src="/gt-logo.svg"
              alt="Georgia Tech Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <Link href="/dashboard" className="text-xl font-bold text-gt-navy">
              GT Accountability
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-gt-gray">
                  Hello, {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-gt-gray hover:bg-gt-navy text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-gt-navy hover:bg-gt-gray text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
