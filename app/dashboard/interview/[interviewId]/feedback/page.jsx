"use client";

// Core React and Next.js imports
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// Lucide icons
import { ChevronDown, Award, CheckCircle, XCircle } from "lucide-react";

// Database and ORM imports
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";

// UI Component imports
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

// Main Feedback Component
const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Fetch feedback on component mount
  useEffect(() => {
    GetFeedback();
  }, []);

  // Async function to retrieve feedback
  const GetFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // Memoized calculation of overall rating
  const overallRating = useMemo(() => {
    if (feedbackList?.length > 0) {
      const totalRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.rating),
        0
      );
      return (totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  // Determine rating color and icon
  const getRatingColor = (rating) => {
    if (rating >= 7) return "text-green-500";
    if (rating >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  const getRatingIcon = (rating) => {
    if (rating >= 7) return <CheckCircle className="inline-block mr-2 w-6 h-6 text-green-500" />;
    if (rating >= 5) return <Award className="inline-block mr-2 w-6 h-6 text-yellow-500" />;
    return <XCircle className="inline-block mr-2 w-6 h-6 text-red-500" />;
  };

  // Render function
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {feedbackList?.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-500">
              No Interview Feedback Record Found
            </h2>
          </div>
        ) : (
          <div className="p-6 sm:p-10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Award className="w-16 h-16 text-yellow-500 animate-bounce" />
              </div>
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
                Congratulations
              </h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Here's Your Interview Feedback
              </h3>
              
              <div className="flex justify-center items-center space-x-4 mb-6">
                <span className="text-lg text-gray-600">Overall Rating:</span>
                <div className={`flex items-center text-2xl font-bold ${getRatingColor(overallRating)}`}>
                  {getRatingIcon(overallRating)}
                  {overallRating}
                  <span className="text-black ml-1">/10</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 max-w-xl mx-auto">
                Below are your interview questions, answers, and personalized feedback 
                to help you improve and grow professionally.
              </p>
            </div>

            <div className="space-y-4">
              {feedbackList?.map((item, index) => (
                <Collapsible 
                  key={index} 
                  open={activeIndex === index}
                  onOpenChange={(open) => setActiveIndex(open ? index : null)}
                  className="border-2 border-gray-100 rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <CollapsibleTrigger 
                    className={`
                      w-full p-4 flex justify-between items-center 
                      ${activeIndex === index 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-white text-gray-700'}
                      hover:bg-blue-50 hover:text-blue-700
                      transition-colors duration-200 rounded-xl
                    `}
                  >
                    <span className="font-semibold text-left flex-grow pr-4 truncate">
                      {item.question}
                    </span>
                    <ChevronDown 
                      className={`
                        w-5 h-5 transform transition-transform duration-300
                        ${activeIndex === index ? 'rotate-180' : ''}
                      `} 
                    />
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="p-4 bg-gray-50 rounded-b-xl">
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { 
                          label: "Rating", 
                          value: item.rating, 
                          className: "bg-red-50 text-red-800",
                          icon: <Award className="w-5 h-5 text-red-500 mr-2" />
                        },
                        { 
                          label: "Your Answer", 
                          value: item.userAns, 
                          className: "bg-blue-50 text-blue-800",
                          icon: <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                        },
                        { 
                          label: "Correct Answer", 
                          value: item.correctAns, 
                          className: "bg-green-50 text-green-800",
                          icon: <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        },
                        { 
                          label: "Feedback", 
                          value: item.feedback, 
                          className: "bg-purple-50 text-purple-800",
                          icon: <Award className="w-5 h-5 text-purple-500 mr-2" />
                        }
                      ].map((section, idx) => (
                        <div 
                          key={idx} 
                          className={`
                            ${section.className} 
                            p-4 rounded-lg 
                            border border-opacity-50 
                            flex items-start
                            transition-all duration-300
                            hover:shadow-md
                          `}
                        >
                          <div className="flex-shrink-0 mr-3">{section.icon}</div>
                          <div>
                            <h4 className="font-bold mb-2 text-sm">{section.label}</h4>
                            <p className="text-sm">{section.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button 
                onClick={() => router.replace("/dashboard")}
                className="
                  bg-gradient-to-r from-green-400 to-blue-500 
                  hover:from-green-500 hover:to-blue-600 
                  text-white font-bold py-3 px-6 rounded-full 
                  transition-all duration-300 
                  transform hover:scale-105 hover:shadow-lg
                "
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;