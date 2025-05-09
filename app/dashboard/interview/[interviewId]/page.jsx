"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { useContext } from 'react';
import { WebCamContext } from "../../layout";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);
  
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
      
    setInterviewData(result[0]);
  };

  return (
    <div className="bg-white min-h-screen py-4">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg border-t-4 border-teal-800 p-8 space-y-6">
          <h2 className="font-bold text-3xl text-center text-gray-800 flex items-center justify-center">
            <Play className="w-10 h-10 mr-4 text-teal-800" />
            Let's Get Started
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Play className="w-5 h-5 text-teal-800" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Job Details
                  </h2>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Job Role/Position: </strong>
                    {interviewData?.jobPosition}
                  </p>
                  <p className="text-gray-700">
                    <strong>Job Description/Stack: </strong>
                    {interviewData?.jobDesc}
                  </p>
                  <p className="text-gray-700">
                    <strong>Years of Experience: </strong>
                    {interviewData?.jobExperience}
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-lg font-semibold text-yellow-700">
                    Important Information
                  </h2>
                </div>
                <p className="text-yellow-600">
                  {process.env.NEXT_PUBLIC_INFORMATION}
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex items-center justify-center">
                {webCamEnabled ? (
                  <Webcam
                    onUserMedia={() => setWebCamEnabled(true)}
                    onUserMediaError={() => setWebCamEnabled(false)}
                    height={300}
                    width={300}
                    mirrored={true}
                    className="rounded-xl shadow-md"
                  />
                ) : (
                  <WebcamIcon className="h-72 w-full text-gray-400" />
                )}
              </div>
              
              <Button
                onClick={() => setWebCamEnabled((prev) => !prev)}
                className="w-full bg-teal-600 hover:bg-teal-800 flex items-center justify-center space-x-2"
              >
                <WebcamIcon className="w-4 h-4" />
                <span>{webCamEnabled ? "Close WebCam" : "Enable WebCam"}</span>
              </Button>
              
              <div className="flex justify-end">
                <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
                  <Button className="bg-teal-600 hover:bg-teal-800 flex items-center space-x-2">
                    <Play className="w-4 h-4" />
                    <span>Start Interview</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;