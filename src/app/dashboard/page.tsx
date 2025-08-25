"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { LeetCodeForm } from "@/components/leetcode-form";
import { GymForm } from "@/components/gym-form";
import { SubmissionsFeed } from "@/components/submissions-feed";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasSubmittedGymToday, setHasSubmittedGymToday] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const checkGymSubmissionToday = useCallback(async () => {
    try {
      const response = await fetch("/api/gym");
      if (response.ok) {
        const submissions = await response.json();
        const today = new Date().toDateString();
        const hasSubmitted = submissions.some(
          (sub: { user: { id: string }; createdAt: string }) =>
            sub.user.id === session?.user?.id &&
            new Date(sub.createdAt).toDateString() === today
        );
        setHasSubmittedGymToday(hasSubmitted);
      }
    } catch (error) {
      console.error("Error checking gym submission:", error);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/signin");
      return;
    }

    checkGymSubmissionToday();
  }, [session, status, router, checkGymSubmissionToday]);

  const handleLeetCodeSubmit = async (data: {
    problemName: string;
    solvedWithHelp: boolean;
    learnings: string;
  }) => {
    try {
      const response = await fetch("/api/leetcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error submitting LeetCode:", error);
      alert("Error submitting LeetCode problem");
    }
  };

  const handleGymSubmit = async (data: { workout: string }) => {
    try {
      const response = await fetch("/api/gym", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit");
      }

      setHasSubmittedGymToday(true);
      setRefreshKey((prev) => prev + 1);
    } catch (error: unknown) {
      console.error("Error submitting gym workout:", error);
      alert(
        error instanceof Error ? error.message : "Error submitting gym workout"
      );
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gt-light-gradient">
      <Navbar />

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gt-navy">
            Welcome back, {session.user?.name}!
          </h1>
          <p className="mt-2 text-gt-gray">
            Track your daily progress and stay accountable with the Yellow
            Jacket community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <LeetCodeForm onSubmit={handleLeetCodeSubmit} />
            <GymForm
              onSubmit={handleGymSubmit}
              hasSubmittedToday={hasSubmittedGymToday}
            />
          </div>

          <div className="lg:col-span-2">
            <SubmissionsFeed key={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
