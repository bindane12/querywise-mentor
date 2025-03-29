
import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Bot, User, Smile, Paperclip, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import FileUploader from './FileUploader';
import { generateGeminiResponse, GeminiMessage } from '@/lib/gemini-api';

interface Message {
  id: string;
  content: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm BinesAI, your personal learning assistant powered by Gemini Flash 2.0. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to the most recent message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert chat history to Gemini format
      const geminiMessages: GeminiMessage[] = [
        {
          role: "user",
          parts: [{ text: "You are BinesAI, a helpful and professional learning assistant. Respond to the following query: " + input }]
        }
      ];
      
      // Call Gemini API
      const aiResponseText = await generateGeminiResponse(geminiMessages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (content: string) => {
    toast({
      title: "File Processed Successfully",
      description: "Your document has been analyzed and is ready for discussion.",
    });
    
    setShowFileUpload(false);
    
    // Add an AI message acknowledging the file upload
    const aiMessage: Message = {
      id: Date.now().toString(),
      content: `I've analyzed your document. Here's a summary: ${content.substring(0, 200)}... Would you like me to explain any specific part in more detail?`,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="chat-container bg-white border border-gray-100">
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'ai' ? 'items-start' : 'items-start justify-end'} mb-4 fade-in`}
          >
            {message.sender === 'ai' && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue text-white mr-2">
                <Bot size={18} />
              </div>
            )}
            <div className={`${message.sender === 'ai' ? 'message-ai' : 'message-user'} shadow-sm`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs opacity-50 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {message.sender === 'user' && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue text-white ml-2">
                <User size={18} />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start fade-in">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue text-white mr-2">
              <Bot size={18} />
            </div>
            <div className="message-ai typing-animation shadow-sm">
              Thinking
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {showFileUpload ? (
        <div className="p-4 border-t border-gray-100">
          <FileUploader onFileProcessed={handleFileUpload} onCancel={() => setShowFileUpload(false)} />
        </div>
      ) : (
        <div className="chat-input-container border-t border-gray-100">
          <div className="flex gap-2 p-3 bg-gray-50 rounded-lg mx-4 my-2">
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowFileUpload(true)}
                title="Upload Document"
                className="text-gray-500 hover:text-brand-blue hover:bg-brand-blue/10"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                title="Add Image"
                className="text-gray-500 hover:text-brand-blue hover:bg-brand-blue/10"
              >
                <Image className="h-5 w-5" />
              </Button>
            </div>
            
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question or upload a document..."
              className="min-h-10 flex-1 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            />
            
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                title="Add Emoji"
                className="text-gray-500 hover:text-brand-blue hover:bg-brand-blue/10"
              >
                <Smile className="h-5 w-5" />
              </Button>
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90 text-white"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
