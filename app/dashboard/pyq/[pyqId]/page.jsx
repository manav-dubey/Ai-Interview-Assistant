"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { BookOpenText, ChevronDown, AlertTriangle } from "lucide-react";

const QuestionDetailsPage = ({ params }) => {
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        setIsLoading(true);
        const result = await db
          .select()
          .from(Question)
          .where(eq(Question.mockId, params.pyqId));
        
        const parsedQuestionData = JSON.parse(result[0].MockQuestionJsonResp);
        setQuestionData(parsedQuestionData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching question details:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchQuestionDetails();
  }, [params.pyqId]);

  const ThreeDIcon = ({ children, className = "" }) => (
    <div className={`relative transform transition-all duration-300 
      hover:scale-110 hover:rotate-3 
      ${className}`}>
      <div className="absolute inset-0 bg-teal-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
      <div className="relative z-10 bg-white rounded-full p-4 shadow-2xl">
        {children}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-4">
        <div className="text-center p-10 bg-white rounded-3xl shadow-2xl border-4 border-teal-200">
          <ThreeDIcon className="mx-auto mb-6">
            <BookOpenText className="text-teal-600" size={64} />
          </ThreeDIcon>
          <p className="text-2xl font-semibold text-teal-600 mt-4 animate-pulse">
            Loading Questions...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4">
        <div className="text-center p-10 bg-white rounded-3xl shadow-2xl border-4 border-red-200">
          <ThreeDIcon className="mx-auto mb-6">
            <AlertTriangle className="text-red-500" size={64} />
          </ThreeDIcon>
          <p className="text-2xl font-semibold text-red-600 mt-4">
            Error Loading Questions
          </p>
        </div>
      </div>
    );
  }

  if (!questionData || questionData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-4">
        <div className="text-center p-10 bg-white rounded-3xl shadow-2xl border-4 border-teal-200">
          <ThreeDIcon className="mx-auto mb-6">
            <BookOpenText className="text-teal-600" size={64} />
          </ThreeDIcon>
          <p className="text-2xl font-semibold text-teal-600 mt-4">
            No Questions Found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-teal-200">
          <div className="bg-teal-600 text-white py-6 px-6 flex items-center">
            <ThreeDIcon className="mr-6">
              <BookOpenText size={40} className="text-teal-600" />
            </ThreeDIcon>
            <h1 className="text-3xl font-bold">
              Practice Questions
            </h1>
          </div>

          <div className="p-6 sm:p-8">
            <Accordion 
              type="single" 
              collapsible 
              className="space-y-6"
            >
              {questionData.map((item, index) => (
                <AccordionItem 
                  value={`item-${index + 1}`} 
                  key={index} 
                  className="border-2 border-teal-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-teal-300 hover:shadow-lg"
                >
                  <AccordionTrigger className="group px-5 py-4 bg-teal-50 hover:bg-teal-100 transition-color">
                    <div className="flex items-center w-full">
                      <ChevronDown className="mr-4 text-teal-600 transition-transform group-data-[state=open]:rotate-180" size={24} />
                      <span className="text-left text-lg font-semibold text-teal-800 flex-grow ">
                        {item.Question}?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-5 bg-white text-base leading-relaxed text-gray-700 border-t-2 border-teal-100 ">
                    {item.Answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailsPage;