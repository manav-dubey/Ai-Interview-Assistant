"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import {
  Briefcase,
  Code,
  Clock,
  LoaderCircle,
  PlusCircle,
  Upload
} from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState(); 
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [resumeText, setResumeText] = useState();
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);

      try {
        const response = await fetch("http://localhost:5000/api/v1/interview/extract-resume", {
          method: "POST",
          body: formData,
        });
        console.log("Response:", response);
        const result = await response.json();
        setResumeText(result);
        console.log("Extracted Resume Data:", resumeText);
      } catch (error) {
        console.error("Error uploading resume:", error);
      }
    }
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("othert", jobPosition, jobDesc, jobExperience);
    await handleResumeUpload({ target: { files: [resume] } });
    console.log("Resume Text:", resumeText);

    const InputPrompt = `
    Hey you are creating a mock interview for the following job position. so please behave like u are the interviewer and ask questions based on the given below details
  Job Positions: ${jobPosition}, 
  Job Description: ${jobDesc}, 
  Years of Experience: ${jobExperience}.
  Resume details extracted: ${resumeText}.
  Based on this information, please provide 6 interview questions with 3-4 questions answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.
`;


    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: MockInterview.mockId });

      console.log("Inserted ID:", resp);

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/interview/" + resp[0]?.mockId);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xs">
      <div
        className="p-10 rounded-2xl border-2 border-teal-600 bg-teal-50 
        hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out 
        cursor-pointer group relative overflow-hidden"
        onClick={() => setOpenDialog(true)}
      >
        <div className="absolute -top-4 -right-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <PlusCircle
            className="w-24 h-24 text-teal-600 
            transform group-hover:rotate-45 
            transition-all duration-300"
          />
        </div>
        <div className="flex flex-col items-center relative z-10">
          <PlusCircle
            className="w-12 h-12 text-teal-600 
            group-hover:scale-110 
            group-hover:text-teal-700 
            transition-all duration-300 
            drop-shadow-lg mb-3"
          />
          <h2 className="text-lg text-center text-teal-600 
            group-hover:text-teal-700 
            font-semibold 
            transition-colors">
            + Add New Interview
          </h2>
        </div>
      </div>
      <Dialog open={openDailog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white shadow-2xl rounded-xl max-h-[98%]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-teal-600 mb-4 flex items-center">
              <Briefcase
                className="mr-3 w-8 h-8 
                text-teal-600 
                transform hover:rotate-12 
                transition-transform 
                drop-shadow-md"
              />
              Create Your Mock Interview
            </DialogTitle>
            <DialogDescription className="text-gray-600 mb-6">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <h2 className="text-lg text-gray-700 mb-4 flex items-center">
                    <Code
                      className="mr-3 w-6 h-6 
                      text-teal-500 
                      transform hover:scale-110 
                      transition-transform 
                      drop-shadow-md"
                    />
                    Provide details about your job position and experience
                  </h2>

                  <div className="mb-4">
                    <label className="flex items-center text-teal-600 font-medium mb-2">
                      <Briefcase
                        className="mr-2 w-5 h-5 
                        text-teal-500 
                        transform hover:rotate-6 
                        transition-transform 
                        drop-shadow-md"
                      />
                      Job Role/Position
                    </label>
                    <Input
                      className="w-full border-2 border-gray-300 
                      focus:border-teal-600 focus:ring-2 focus:ring-teal-500 
                      rounded-lg transition-all duration-300"
                      placeholder="Ex. Full stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center text-teal-600 font-medium mb-2">
                      <Code
                        className="mr-2 w-5 h-5 
                        text-teal-500 
                        transform hover:scale-110 
                        transition-transform 
                        drop-shadow-md"
                      />
                      Job Description / Tech Stack
                    </label>
                    <Textarea
                      className="w-full border-2 border-gray-300 
                      focus:border-teal-600 focus:ring-2 focus:ring-teal-500 
                      rounded-lg transition-all duration-300"
                      placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center text-teal-600 font-medium mb-2">
                      <Clock
                        className="mr-2 w-5 h-5 
                        text-teal-500 
                        transform hover:rotate-12 
                        transition-transform 
                        drop-shadow-md"
                      />
                      Years of Experience
                    </label>
                    <Input
                      className="w-full border-2 border-gray-300 
                      focus:border-teal-600 focus:ring-2 focus:ring-teal-500 
                      rounded-lg transition-all duration-300"
                      placeholder="Ex. 5"
                      max="50"
                      type="number"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center text-teal-600 font-medium mb-2">
                      <Upload
                        className="mr-2 w-5 h-5 
                        text-teal-500 
                        transform hover:scale-110 
                        transition-transform 
                        drop-shadow-md"
                      />
                      Upload Resume
                    </label>
                    <Input
                      type="file"
                      accept="application/pdf"
                      className="w-full border-2 border-gray-300 
                      focus:border-teal-600 focus:ring-2 focus:ring-teal-500 
                      rounded-lg transition-all duration-300"
                      onChange={(e) => setResume(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                    className="border-teal-600 text-teal-600 
                    hover:bg-teal-50 hover:text-teal-700 
                    transition-colors flex items-center"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-teal-600 hover:bg-teal-700 
                    text-white transition-colors duration-300 
                    flex items-center group"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle
                          className="animate-spin mr-2 
                          group-hover:rotate-180 
                          transition-transform"
                        />
                        Generating From AI
                      </>
                    ) : (
                      <>
                        <PlusCircle
                          className="mr-2 
                          group-hover:scale-110 
                          transition-transform"
                        />
                        Start Interview
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;