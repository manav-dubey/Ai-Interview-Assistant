"use client";

import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { WebCamContext } from "@/app/dashboard/layout";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ProfessionalWebcamSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="w-full h-64 opacity-80">
    <rect x="50" y="50" width="200" height="100" rx="10" ry="10" 
      fill="#1A1A2E" 
      stroke="#4A4E69" 
      strokeWidth="3"
    />

    <circle cx="150" cy="100" r="35" 
      fill="#0D1B2A" 
      stroke="#415A77" 
      strokeWidth="2"
    />

    <circle cx="155" cy="95" r="12" 
      fill="rgba(255,255,255,0.2)" 
    />

    <circle cx="230" cy="70" r="5" 
      fill="#E94560" 
    />

    <path 
      d="M70 75 Q100 85, 130 75 M70 125 Q100 115, 130 125" 
      fill="none" 
      stroke="#415A77" 
      strokeWidth="1" 
      strokeDasharray="3 3"
    />
  </svg>
);

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast("Error starting recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];

        const result = await model.generateContent([
          "Transcribe the following audio:",
          { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
        ]);
        if(!result){
          toast.error("Error transcribing audio. Please try again.");
        }
        const transcription = result.response.text();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      setLoading(true);
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.Question +
        ", User Answer:" +
        userAnswer +
        " , Depends on question and user answer for given interview question" +
        " please give us rating for answer and feedback as area of improvement if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      let MockJsonResp = result.response.text();
      console.log(MockJsonResp);

      MockJsonResp = MockJsonResp.replace("```json", "").replace("```", "");

      let jsonFeedbackResp;
      try {
        jsonFeedbackResp = JSON.parse(MockJsonResp);
      } catch (e) {
        throw new Error("Invalid JSON response: " + MockJsonResp);
      }

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.Question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.Answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResp?.feedback,
        rating: jsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD"),
      });

      if (resp) {
        toast("User Answer recorded successfully");
      }
      setUserAnswer("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast("An error occurred while recording the user answer");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      {/* Camera Section */}
      <div className="w-full max-w-xl bg-gray-50 border border-gray-200 rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-center items-center p-4 bg-gray-900">
          {webCamEnabled ? (
            <Webcam
              mirrored={true}
              className="h-64 w-full object-cover rounded-lg"
            />
          ) : (
            <ProfessionalWebcamSVG />
          )}
        </div>
      </div>

      {/* Button Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
        <Button 
          onClick={() => setWebCamEnabled((prev) => !prev)}
          className="w-full bg-teal-900 hover:bg-gray-700 transition-colors"
        >
          {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
        </Button>

        <Button
          variant="outline"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
          className={`w-full ${
            isRecording 
              ? "border-red-400 text-red-400 hover:bg-red-50" 
              : "border-gray-800 text-gray-800 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            {isRecording ? "Stop Recording" : "Record Answer"}
          </div>
        </Button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="w-full max-w-xl">
          <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-center">
            Processing your answer...
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordAnswerSection;