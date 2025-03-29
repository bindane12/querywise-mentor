
import React from 'react';
import { MessageSquare, FileQuestion } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="border-b bg-white p-4 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-brand-purple to-brand-blue p-1.5 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold font-ovo text-xl">B</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent font-ovo">
            BinesAI
          </h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-brand-blue"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger 
              value="quiz" 
              className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-brand-blue"
            >
              <FileQuestion className="h-4 w-4" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;
