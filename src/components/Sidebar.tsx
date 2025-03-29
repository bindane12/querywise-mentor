
import React, { useState } from 'react';
import { BookOpen, Cpu, Clock, X, MessageSquare, FileQuestion, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type ChatHistoryItem = {
  id: string;
  title: string;
  timestamp: Date;
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const [activeModel, setActiveModel] = useState('gemini-flash');
  const mockChatHistory: ChatHistoryItem[] = [
    { id: '1', title: 'Learning Python Basics', timestamp: new Date(Date.now() - 3600000) },
    { id: '2', title: 'Machine Learning Concepts', timestamp: new Date(Date.now() - 86400000) },
    { id: '3', title: 'Statistical Analysis Help', timestamp: new Date(Date.now() - 172800000) },
  ];
  
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-30 w-72 bg-white border-r shadow-lg transform transition-transform duration-300 ease-in-out font-ovo",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-brand-purple">BinesAI</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 text-sm font-medium text-gray-500">FEATURES</h3>
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start",
              activeTab === 'chat' ? "bg-brand-blue/10 text-brand-blue" : ""
            )}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat Assistant
          </Button>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start",
              activeTab === 'quiz' ? "bg-brand-blue/10 text-brand-blue" : ""
            )}
            onClick={() => setActiveTab('quiz')}
          >
            <FileQuestion className="mr-2 h-4 w-4" />
            Quiz Mode
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="p-4">
        <h3 className="mb-2 text-sm font-medium text-gray-500">AI MODEL</h3>
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start",
              activeModel === 'gemini-flash' ? "bg-brand-blue/10 text-brand-blue" : ""
            )}
            onClick={() => setActiveModel('gemini-flash')}
          >
            <Cpu className="mr-2 h-4 w-4" />
            Gemini Flash 2.0
          </Button>
          <Button 
            variant="ghost" 
            disabled
            className="w-full justify-start opacity-60"
          >
            <Lock className="mr-2 h-4 w-4" />
            GPT-4o Mini
            <Badge variant="outline" className="ml-2 text-xs">Not Available</Badge>
          </Button>
          <Button 
            variant="ghost" 
            disabled
            className="w-full justify-start opacity-60"
          >
            <Lock className="mr-2 h-4 w-4" />
            GPT-4o
            <Badge variant="outline" className="ml-2 text-xs">Not Available</Badge>
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="p-4 flex-1 overflow-hidden">
        <h3 className="mb-2 text-sm font-medium text-gray-500">RECENT CHATS</h3>
        <ScrollArea className="h-[calc(100vh-290px)]">
          <div className="space-y-1">
            {mockChatHistory.map((chat) => (
              <Button 
                key={chat.id}
                variant="ghost" 
                className="w-full justify-start"
              >
                <Clock className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="truncate w-full text-left">{chat.title}</span>
                  <span className="text-xs text-gray-500">
                    {chat.timestamp.toLocaleDateString()}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
