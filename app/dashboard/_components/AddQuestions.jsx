"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  LoaderCircle, 
  Briefcase, 
  Code, 
  Clock, 
  Target, 
  Building2, 
  PlusCircle 
} from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { Question } from "@/utils/schema";
import { useRouter } from "next/navigation";

const AddQuestions = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [questionJsonResponse, setQuestionJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(
      "Data",
      jobPosition,
      jobDesc,
      typeQuestion,
      company,
      jobExperience
    );

    const InputPrompt = `
    Job Positions: ${jobPosition},
    Job Description: ${jobDesc},
    Years of Experience: ${jobExperience},
    Which type of question: ${typeQuestion},
    This company previous question: ${company},
    Based on this information, please provide 5 interview questions with answers in JSON format.
    Each question and answer should be fields in the JSON. Ensure "Question" and "Answer" are fields.
    `;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockQuestionJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "")
        .trim();

      if (MockQuestionJsonResp) {
        const resp = await db
          .insert(Question)
          .values({
            mockId: uuidv4(),
            MockQuestionJsonResp: MockQuestionJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            typeQuestion: typeQuestion,
            company: company,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("YYYY-MM-DD"),
          })
          .returning({ mockId: Question.mockId });

        console.log("Inserted ID:", resp);

        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/pyq/" + resp[0]?.mockId);
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error.message);
      alert("There was an error processing the data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <div
        className="
          p-10 
          rounded-2xl 
          border-2 
          border-teal-600 
          bg-teal-50 
          hover:scale-105 
          hover:shadow-2xl 
          transition-all 
          duration-300 
          ease-in-out 
          cursor-pointer 
          group 
          relative 
          overflow-hidden
        "
        onClick={() => setOpenDialog(true)}
      >
        <div className="absolute -top-4 -right-4 opacity-20 group-hover:opacity-40 transition-opacity">
          <PlusCircle 
            className="
              w-24 
              h-24 
              text-teal-600 
              transform 
              group-hover:rotate-45 
              transition-all 
              duration-300
            "
          />
        </div>
        <div className="flex flex-col items-center relative z-10">
          <PlusCircle 
            className="
              w-12 
              h-12 
              text-teal-600 
              group-hover:scale-110 
              group-hover:text-teal-700 
              transition-all 
              duration-300 
              drop-shadow-lg 
              mb-3
            "
          />
          <h2 className="
            text-lg 
            text-center 
            text-teal-600 
            group-hover:text-teal-700 
            font-semibold 
            transition-colors
          ">
            + Add New Questions
          </h2>
        </div>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white shadow-2xl rounded-xl max-h-[97%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-teal-600 mb-4 flex items-center">
              <Target 
                className="
                  mr-3 
                  w-8 
                  h-8 
                  text-teal-600 
                  transform 
                  hover:rotate-12 
                  transition-transform 
                  drop-shadow-md
                "
              />
              What model questions are you seeking?
            </DialogTitle>
            <DialogDescription className="text-gray-600 mb-6">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <h2 className="
                    text-lg 
                    text-gray-700 
                    mb-4 
                    flex 
                    items-center
                  ">
                    <Briefcase 
                      className="
                        mr-3 
                        w-6 
                        h-6 
                        text-teal-500 
                        transform 
                        hover:scale-110 
                        transition-transform 
                        drop-shadow-md
                      "
                    />
                    Add Details about your job position
                  </h2>

                  <div className="mb-4">
                    <label className="flex items-center text-teal-600 font-medium mb-2">
                      <Briefcase 
                        className="
                          mr-2 
                          w-5 
                          h-5 
                          text-teal-500 
                          transform 
                          hover:rotate-6 
                          transition-transform 
                          drop-shadow-md
                        "
                      />
                      Job Role/Job Position
                    </label>
                    <Input
                      className="
                        w-full 
                        border-2 
                        border-gray-300 
                        focus:border-teal-600 
                        focus:ring-2 
                        focus:ring-teal-500 
                        rounded-lg 
                        transition-all 
                        duration-300
                      "
                      value={jobPosition}
                      placeholder="Ex. Full stack Developer"
                      required
                      onChange={handleInputChange(setJobPosition)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center text-teal-600 font-medium mb-2">
                      <Code 
                        className="
                          mr-2 
                          w-5 
                          h-5 
                          text-teal-500 
                          transform 
                          hover:scale-110 
                          transition-transform 
                          drop-shadow-md
                        "
                      />
                      Job Description / Tech Stack
                    </label>
                    <Textarea
                      className="
                        w-full 
                        border-2 
                        border-gray-300 
                        focus:border-teal-600 
                        focus:ring-2 
                        focus:ring-teal-500 
                        rounded-lg 
                        transition-all 
                        duration-300
                      "
                      value={jobDesc}
                      placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
                      required
                      onChange={handleInputChange(setJobDesc)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center text-teal-600 font-medium mb-2">
                      <Target 
                        className="
                          mr-2 
                          w-5 
                          h-5 
                          text-teal-500 
                          transform 
                          hover:rotate-12 
                          transition-transform 
                          drop-shadow-md
                        "
                      />
                      Type of Questions
                    </label>
                    <Input
                      className="
                        w-full 
                        border-2 
                        border-gray-300 
                        focus:border-teal-600 
                        focus:ring-2 
                        focus:ring-teal-500 
                        rounded-lg 
                        transition-all 
                        duration-300
                      "
                      value={typeQuestion}
                      placeholder="Ex. CPP, Leetcode, Domain based"
                      required
                      onChange={handleInputChange(setTypeQuestion)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center text-teal-600 font-medium mb-2">
                      <Building2 
                        className="
                          mr-2 
                          w-5 
                          h-5 
                          text-teal-500 
                          transform 
                          hover:scale-110 
                          transition-transform 
                          drop-shadow-md
                        "
                      />
                      Company You're Seeking
                    </label>
                    <Input
                      className="
                        w-full 
                        border-2 
                        border-gray-300 
                        focus:border-teal-600 
                        focus:ring-2 
                        focus:ring-teal-500 
                        rounded-lg 
                        transition-all 
                        duration-300
                      "
                      value={company}
                      placeholder="Ex. Microsoft, Apple, Google"
                      required
                      onChange={handleInputChange(setCompany)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center text-teal-600 font-medium mb-2">
                      <Clock 
                        className="
                          mr-2 
                          w-5 
                          h-5 
                          text-teal-500 
                          transform 
                          hover:rotate-12 
                          transition-transform 
                          drop-shadow-md
                        "
                      />
                      Years of Experience
                    </label>
                    <Input
                      className="
                        w-full 
                        border-2 
                        border-gray-300 
                        focus:border-teal-600 
                        focus:ring-2 
                        focus:ring-teal-500 
                        rounded-lg 
                        transition-all 
                        duration-300
                      "
                      placeholder="Ex. 5"
                      value={jobExperience}
                      max="50"
                      type="number"
                      required
                      onChange={handleInputChange(setJobExperience)}
                    />
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                    className="
                      border-teal-600 
                      text-teal-600 
                      hover:bg-teal-50 
                      hover:text-teal-700 
                      transition-colors 
                      group
                    "
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="
                      bg-teal-600 
                      hover:bg-teal-700 
                      text-white 
                      transition-colors 
                      duration-300 
                      flex 
                      items-center 
                      group
                    "
                  >
                    {loading ? (
                      <>
                        <LoaderCircle 
                          className="
                            animate-spin 
                            mr-2 
                            group-hover:rotate-180 
                            transition-transform
                          " 
                        />
                        Generating From AI
                      </>
                    ) : (
                      <>
                        <PlusCircle 
                          className="
                            mr-2 
                            group-hover:scale-110 
                            transition-transform
                          " 
                        />
                        Prep. Questions
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

export default AddQuestions;