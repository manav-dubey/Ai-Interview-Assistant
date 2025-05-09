import Head from "next/head";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Play } from "lucide-react";

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works - Interview AI</title>
        <meta
          name="description"
          content="Learn how our Interview AI works."
        />
      </Head>
      <main className="bg-white min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg border-t-4 border-teal-600 p-8 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
              <Play className="w-10 h-10 mr-4 text-teal-600" />
              How It Works
            </h1>
            
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  value: "item-1",
                  title: "Step 1: Prepare for the Interview",
                  content: "Get ready by selecting the type of interview and providing some details about the job position."
                },
                {
                  value: "item-2",
                  title: "Step 2: Start the AI Interview",
                  content: "Our AI will ask you a series of questions and evaluate your responses in real-time."
                },
                {
                  value: "item-3",
                  title: "Step 3: Receive Feedback",
                  content: "Get detailed feedback on your performance, including strengths and areas for improvement."
                }
              ].map((step) => (
                <AccordionItem 
                  key={step.value} 
                  value={step.value} 
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 rounded-lg"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <div className="bg-teal-100 p-2 rounded-full">
                        <Play className="w-5 h-5 text-teal-600" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                        {step.title}
                      </h2>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3">
                    <p className="text-gray-700 pl-14">
                      {step.content}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
    </>
  );
};

export default HowItWorks;