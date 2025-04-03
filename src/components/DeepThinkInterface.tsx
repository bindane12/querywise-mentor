
import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { generateDeepseekResponse } from '@/lib/deepseek-api';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  role: "user" | "assistant";
  content: string;
}

const DeepThinkInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Hello! I'm Bines DeepThink, powered by advanced AI. I'm designed for deep, thoughtful responses to complex questions. How can I assist you today?"
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim() === '') return;
    
    const userMessage: Message = {
      role: 'user',
      content: inputValue
    };
    
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare the message history for the API
      const messageHistory: Message[] = messages.slice(-5).concat(userMessage);
      
      // Call the Deepseek API
      const response = await generateDeepseekResponse(messageHistory);
      
      // Add the response to our messages
      const assistantMessage: Message = {
        role: 'assistant',
        content: response
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    // First handle ### as bold headers
    let formattedContent = content.replace(/###\s*(.*?)(\n|$)/g, '<strong>$1</strong>\n');
    
    // Convert text with ** to bold
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Handle lists
    const listItems = formattedContent.split(/\n\s*-\s*/);
    
    if (listItems.length > 1) {
      // We have list items
      return (
        <>
          {listItems[0].split(/<strong>|<\/strong>/).map((part, i) => {
            if (i % 2 === 1) {
              return <strong key={`p-${i}`}>{part}</strong>;
            }
            return <span key={`p-${i}`} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br/>') }} />;
          })}
          <ul className="list-disc list-inside mt-2">
            {listItems.slice(1).map((item, idx) => (
              <li key={idx} className="mb-1">
                {item.split(/<strong>|<\/strong>/).map((part, i) => {
                  if (i % 2 === 1) {
                    return <strong key={`li-${idx}-${i}`}>{part}</strong>;
                  }
                  return <span key={`li-${idx}-${i}`} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br/>') }} />;
                })}
              </li>
            ))}
          </ul>
        </>
      );
    }
    
    // No list, just handle the formatting for bold
    return formattedContent.split(/<strong>|<\/strong>/).map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i}>{part}</strong>;
      }
      return <span key={i} dangerouslySetInnerHTML={{ __html: part.replace(/\n/g, '<br/>') }} />;
    });
  };

  return (
    <div className="h-[calc(100vh-200px)] bg-white flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div 
              key={index}
              className={cn(
                "flex p-4 rounded-lg max-w-[90%]",
                message.role === "user"
                  ? "ml-auto bg-brand-blue/10 text-gray-800"
                  : "mr-auto bg-gray-100 text-gray-800"
              )}
            >
              <div className="leading-relaxed">
                {formatMessage(message.content)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="mr-auto bg-gray-100 text-gray-800 flex p-4 rounded-lg items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>Thinking deeply...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="flex items-end p-4 border-t gap-2">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a complex question for deep thinking..."
          className="flex-1 min-h-[100px] resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div className="flex flex-col space-y-2">
          <Button 
            type="submit"
            disabled={isLoading || inputValue.trim() === ''}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              setMessages([{
                role: "assistant",
                content: "Hello! I'm Bines DeepThink, powered by advanced AI. I'm designed for deep, thoughtful responses to complex questions. How can I assist you today?"
              }]);
            }}
            className="bg-white"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeepThinkInterface;
