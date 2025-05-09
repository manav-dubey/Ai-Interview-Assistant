import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Play } from 'lucide-react';

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-teal-600 p-5 space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className='font-semibold text-teal-600 text-2xl flex items-center gap-2'>
            {question?.jobPosition}
          </h2>
          <p className='text-sm text-gray-600 flex items-center space-x-2'>
            <span>🚀 {question?.jobExperience} Years of Experience</span>
          </p>
        </div>
        <div className="bg-teal-100 p-3 rounded-full">
          <Play className="w-6 h-6 text-teal-600" />
        </div>
      </div>
      
      <div className="text-xs text-gray-400 flex items-center justify-between">
        <span>Created: {question.createdAt}</span>
      </div>

      <div className='grid grid-cols-1 gap-3 mt-4'>
        <Button 
          onClick={onStart} 
          className="flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700"
        >
          <Play className="w-4 h-4" />
          <span>Start</span>
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;