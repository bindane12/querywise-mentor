
import React, { useState } from 'react';
import { Check, X, ChevronRight, RefreshCw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

const quizTopics = [
  { id: 'general', name: 'General Knowledge' },
  { id: 'science', name: 'Science' },
  { id: 'history', name: 'History' },
  { id: 'literature', name: 'Literature' },
];

// Demo questions - in a real app, these would come from an API based on the selected topic
const demoQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the process by which plants make their own food using sunlight?',
    options: [
      { id: 'a', text: 'Photosynthesis' },
      { id: 'b', text: 'Respiration' },
      { id: 'c', text: 'Transpiration' },
      { id: 'd', text: 'Germination' },
    ],
    correctOptionId: 'a',
    explanation: 'Photosynthesis is the process used by plants to create energy from sunlight. During photosynthesis, plants use carbon dioxide, water, and light energy to produce glucose and oxygen.'
  },
  {
    id: '2',
    text: 'Which of these is NOT a type of learning style according to the VARK model?',
    options: [
      { id: 'a', text: 'Visual' },
      { id: 'b', text: 'Auditory' },
      { id: 'c', text: 'Empathetic' },
      { id: 'd', text: 'Kinesthetic' },
    ],
    correctOptionId: 'c',
    explanation: 'The VARK model identifies four primary types of learners: Visual, Auditory, Reading/Writing, and Kinesthetic. "Empathetic" is not part of this model.'
  },
  {
    id: '3',
    text: 'What is the term for the ability to understand and manage your own emotions, and those of the people around you?',
    options: [
      { id: 'a', text: 'Cognitive intelligence' },
      { id: 'b', text: 'Emotional intelligence' },
      { id: 'c', text: 'Critical thinking' },
      { id: 'd', text: 'Problem-solving' },
    ],
    correctOptionId: 'b',
    explanation: 'Emotional intelligence (EQ) is the ability to understand, use, and manage your own emotions in positive ways to relieve stress, communicate effectively, empathize with others, overcome challenges and defuse conflict.'
  },
  {
    id: '4',
    text: 'Which learning theory suggests that people learn through observation, imitation, and modeling?',
    options: [
      { id: 'a', text: 'Constructivism' },
      { id: 'b', text: 'Behaviorism' },
      { id: 'c', text: 'Social learning theory' },
      { id: 'd', text: 'Cognitivism' },
    ],
    correctOptionId: 'c',
    explanation: 'Social learning theory, developed by Albert Bandura, proposes that new behaviors can be acquired by observing and imitating others. It combines elements of behavioral and cognitive learning theories.'
  },
  {
    id: '5',
    text: 'What technique involves recalling information from memory at spaced intervals to improve long-term retention?',
    options: [
      { id: 'a', text: 'Mind mapping' },
      { id: 'b', text: 'Spaced repetition' },
      { id: 'c', text: 'Rote memorization' },
      { id: 'd', text: 'Cramming' },
    ],
    correctOptionId: 'b',
    explanation: 'Spaced repetition is a learning technique where review sessions are spaced out over time, forcing you to recall information at increasing intervals. Research shows this is more effective for long-term memory than massed practice (cramming).'
  },
];

const QuizMode: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('general');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  
  // In a real app, we would fetch questions based on the selected topic
  // For now, we'll just use our demo questions regardless of the topic
  const questions = demoQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    resetQuiz();
  };
  
  const handleOptionSelect = (value: string) => {
    if (!hasAnswered) {
      setSelectedOptionId(value);
    }
  };
  
  const checkAnswer = () => {
    if (selectedOptionId) {
      setHasAnswered(true);
      if (selectedOptionId === currentQuestion.correctOptionId) {
        setScore(score + 1);
      }
    }
  };
  
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  if (quizCompleted) {
    const scorePercentage = (score / questions.length) * 100;
    
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-brand-blue/10 p-6">
              <Trophy className="h-16 w-16 text-brand-blue" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          
          <div className="mb-8">
            <p className="text-4xl font-bold text-brand-blue mb-2">
              {score} / {questions.length}
            </p>
            <p className="text-muted-foreground">
              {scorePercentage >= 80 ? 'Excellent work!' : 
               scorePercentage >= 60 ? 'Good job!' : 
               'Keep practicing!'}
            </p>
          </div>
          
          <Progress value={scorePercentage} className="h-2 mb-6" />
          
          <Button 
            onClick={resetQuiz} 
            className="w-full"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-6">
        <Select value={selectedTopic} onValueChange={handleTopicChange}>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Select Topic" />
          </SelectTrigger>
          <SelectContent>
            {quizTopics.map((topic) => (
              <SelectItem key={topic.id} value={topic.id}>
                {topic.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium">
          Score: {score}
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-1 mb-8" />
      
      <Card className="flex-1 mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">{currentQuestion.text}</h3>
          
          <RadioGroup 
            value={selectedOptionId || ""} 
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div 
                key={option.id} 
                className={`flex items-center space-x-2 rounded-md border p-3 
                  ${hasAnswered && option.id === currentQuestion.correctOptionId ? 'bg-green-50 border-green-200' : ''}
                  ${hasAnswered && selectedOptionId === option.id && option.id !== currentQuestion.correctOptionId ? 'bg-red-50 border-red-200' : ''}
                `}
              >
                <RadioGroupItem 
                  value={option.id} 
                  id={`option-${option.id}`}
                  disabled={hasAnswered}
                />
                <Label 
                  htmlFor={`option-${option.id}`}
                  className="flex-1 cursor-pointer py-1"
                >
                  {option.text}
                </Label>
                {hasAnswered && option.id === currentQuestion.correctOptionId && (
                  <Check className="h-5 w-5 text-green-600" />
                )}
                {hasAnswered && selectedOptionId === option.id && option.id !== currentQuestion.correctOptionId && (
                  <X className="h-5 w-5 text-red-600" />
                )}
              </div>
            ))}
          </RadioGroup>
          
          {hasAnswered && (
            <div className="mt-6 p-4 bg-muted rounded-md">
              <h4 className="font-medium mb-2">Explanation</h4>
              <p className="text-sm text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        {!hasAnswered ? (
          <Button 
            onClick={checkAnswer} 
            disabled={!selectedOptionId}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={moveToNextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizMode;
