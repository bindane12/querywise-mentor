
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronRight, Calculator, Divide, Plus, Minus, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const MathAssistant = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsCalculating(true);

    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Simple expression evaluator
        let answer = '';
        
        // Check if it's a simple arithmetic operation
        if (/^[\d\s\+\-\*\/\(\)\.\^]+$/.test(input)) {
          try {
            // Use Function constructor to evaluate mathematical expressions
            // This is safer than eval() but still only for trusted input
            const result = Function(`'use strict'; return (${input})`)();
            answer = `${result}`;
          } catch (error) {
            answer = "I couldn't calculate that expression. Please check your formula.";
          }
        } else {
          // For non-arithmetic questions, provide helpful responses
          if (input.toLowerCase().includes('derivative')) {
            answer = "To calculate derivatives, I need to know the function. For example, the derivative of x² is 2x.";
          } else if (input.toLowerCase().includes('integral')) {
            answer = "For integrals, I need the specific function. For example, the integral of 2x is x² + C.";
          } else if (input.toLowerCase().includes('equation')) {
            answer = "I can help solve equations. For linear equations ax + b = c, the solution is x = (c - b) / a.";
          } else {
            answer = "I can help with arithmetic calculations, algebra, calculus concepts, and more. Please be specific with your mathematical question.";
          }
        }

        setHistory([...history, { question: input, answer }]);
        setInput('');
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem processing your request",
          variant: "destructive"
        });
      } finally {
        setIsCalculating(false);
      }
    }, 500);
  };

  const renderMathExamples = () => {
    const examples = [
      { text: "Calculate: 125 * 37", value: "125 * 37" },
      { text: "Calculate: (15 + 3) / 2", value: "(15 + 3) / 2" },
      { text: "Help with derivatives", value: "How do I calculate the derivative of x²?" },
      { text: "Explain integration", value: "Explain how to integrate 2x" }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
        {examples.map((example, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start text-left bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={() => setInput(example.value)}
          >
            <ChevronRight className="mr-2 h-4 w-4" />
            {example.text}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] bg-gray-900 rounded-lg overflow-hidden p-4">
      <Card className="flex-1 flex flex-col bg-gray-900 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-blue-400 flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            Math Assistant
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto pb-2">
          {history.length > 0 ? (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index}>
                  <div className="flex gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      U
                    </div>
                    <div className="bg-gray-800 rounded-lg rounded-tl-none p-3 text-gray-100">
                      {item.question}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold font-patrick-hand">B</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg rounded-tl-none p-3 text-gray-100">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col text-center p-4">
              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-600">
                  <Minus className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600">
                  <X className="h-5 w-5 text-white" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-600">
                  <Divide className="h-5 w-5 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Math Assistant</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Calculate expressions, solve equations, and get help with various math concepts.
              </p>
              
              {renderMathExamples()}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-2">
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a math expression or ask a question..."
              className="flex-1 bg-gray-800 border-gray-700 focus-visible:ring-blue-600"
            />
            <Button 
              type="submit" 
              disabled={isCalculating || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isCalculating ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Calculate"
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MathAssistant;
