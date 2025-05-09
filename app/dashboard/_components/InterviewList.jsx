"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, BookOpen } from "lucide-react";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchInterviewList = async () => {
      try {
        setIsLoading(true);
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
          .orderBy(desc(MockInterview.id));

        setInterviewList(result);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviewList();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-6 bg-gradient-to-br from-white to-teal-50 min-h-screen">
      <div className="flex items-center mb-6 space-x-4">
        <Trophy className="w-12 h-12 text-teal-600 drop-shadow-lg transform hover:rotate-6 transition-transform" />
        <h2 className="font-bold text-3xl text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-800">
          Your Mock Interview Journey
        </h2>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <Skeleton className="w-16 h-16 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 bg-gray-200 rounded" />
                  <Skeleton className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : interviewList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviewList.map((interview) => (
            <div key={interview.id} className="group relative">
              <InterviewItemCard interview={interview} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6 p-12 bg-white rounded-xl shadow-md">
          <BookOpen className="w-24 h-24 text-gray-300 animate-bounce" />
          <p className="text-2xl font-semibold text-gray-600 text-center">
            No mock interviews yet
          </p>
          <p className="text-gray-500 text-center">
            Start your interview preparation journey today!
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out">
            Start First Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewList;
