"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gt-light-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center min-h-screen py-12">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/gt-logo.svg"
                alt="Georgia Tech Logo"
                width={80}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold text-gt-navy sm:text-6xl">
              Stay <span className="text-gt-gold">Accountable</span>
            </h1>
            <p className="mt-6 text-lg text-gt-gray max-w-2xl mx-auto">
              Track your daily LeetCode progress and gym workouts. Share your
              journey with the Georgia Tech community and stay motivated
              together.
            </p>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/auth/signin"
              className="bg-gt-navy hover:bg-gt-gray text-white px-12 py-4 rounded-md text-xl font-medium transition-colors shadow-lg"
            >
              Join the Community
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gt-tech-gold/20 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center border-2 border-gt-tech-gold">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gt-navy">
                LeetCode Progress
              </h3>
              <p className="mt-2 text-gt-gray">
                Log your daily coding problems, track your learning, and note
                when you needed help.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gt-gold/20 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center border-2 border-gt-gold">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gt-navy">
                Gym Workouts
              </h3>
              <p className="mt-2 text-gt-gray">
                Submit one gym workout per day and maintain your fitness
                consistency.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gt-navy/20 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center border-2 border-gt-navy">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gt-navy">
                Yellow Jacket Community
              </h3>
              <p className="mt-2 text-gt-gray">
                Connect with fellow Yellow Jackets and stay motivated by the
                community&apos;s progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
