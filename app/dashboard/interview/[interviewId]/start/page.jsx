"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useState } from "react";
import { useEffect } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    GetInterviewDetails();
    setTimeout(() => {
      setIsDisabled(false)
    }, 8000);
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    console.log(jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
  };


  const handleNextClick = () => {
    // Disable the button for 20 seconds
    setIsDisabled(true);

    // Increment the question index
    setActiveQuestionIndex(activeQuestionIndex + 1);

    // Re-enable the button after 20 seconds
    setTimeout(() => {
      setIsDisabled(false);
    }, 10000); // 10 seconds

  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10">
        {/* Questin Section */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex gap-3 my-5 md:my-0 md:justify-end md:gap-6">
        {/* {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )} */}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button onClick={handleNextClick} disabled={isDisabled}>
          Next Question
        </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;

// "use client";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { eq } from "drizzle-orm";
// import React, { useState } from "react";
// import { useEffect } from "react";
// import QuestionSection from "./_components/QuestionSection";
// import RecordAnswerSection from "./_components/RecordAnswerSection";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const StartInterview = ({ params }) => {
//   const [interviewData, setInterviewData] = useState();
//   const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
//   const [isDisabled, setIsDisabled] = useState(true);
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
//   useEffect(() => {
//     GetInterviewDetails();
//     setTimeout(() => {
//       setIsDisabled(false)
//     }, 8000);
//   }, []);

//   const GetInterviewDetails = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, params.interviewId));

//     const jsonMockResp = JSON.parse(result[0].jsonMockResp);
//     console.log(jsonMockResp);
//     setMockInterviewQuestion(jsonMockResp);
//     setInterviewData(result[0]);
//   };


//   const handleNextClick = () => {
//     // Disable the button for 20 seconds
//     setIsDisabled(true);

//     // Increment the question index
//     setActiveQuestionIndex(activeQuestionIndex + 1);

//     // Re-enable the button after 20 seconds
//     setTimeout(() => {
//       setIsDisabled(false);
//     }, 10000); // 10 seconds

//   };
//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 my-10">
//         {/* Questin Section */}
//         <QuestionSection
//           mockInterviewQuestion={mockInterviewQuestion}
//           activeQuestionIndex={activeQuestionIndex}
//         />

//         {/* Video/audio Recording */}
//         <RecordAnswerSection
//           mockInterviewQuestion={mockInterviewQuestion}
//           activeQuestionIndex={activeQuestionIndex}
//           interviewData={interviewData}
//         />
//       </div>
//       <div className="flex gap-3 my-5 md:my-0 md:justify-end md:gap-6">
//         {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
//           <Button onClick={handleNextClick} disabled={isDisabled}>
//           Next Question
//         </Button>
//         )}
//         {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
//           <Link
//             href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
//           >
//             <Button>End Interview</Button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StartInterview;