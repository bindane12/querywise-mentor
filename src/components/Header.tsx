
import React from 'react';
import { MessageSquare, FileQuestion, Calculator, Code, BookOpen, LogOut } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { signOut, user } = useAuth();
  
  return (
    <header className="border-b border-gray-800 bg-gray-900 p-4 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="font-patrick-hand text-xl text-white font-bold">B</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent font-poppins">
            BinesAI
          </h1>
          {user && <span className="hidden md:inline text-sm text-gray-400 ml-2">Hello, {user.user_metadata?.name || 'User'}</span>}
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger 
                value="chat" 
                className="flex items-center gap-1 text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Chat</span>
              </TabsTrigger>
              <TabsTrigger 
                value="deepthink" 
                className="flex items-center gap-1 text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Deep Think</span>
              </TabsTrigger>
              <TabsTrigger 
                value="math" 
                className="flex items-center gap-1 text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Math</span>
              </TabsTrigger>
              <TabsTrigger 
                value="code" 
                className="flex items-center gap-1 text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">Code</span>
              </TabsTrigger>
              <TabsTrigger 
                value="research" 
                className="flex items-center gap-1 text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Research</span>
              </TabsTrigger>
              <TabsTrigger 
                value="quiz" 
                className="flex items-center gap-1 text-gray-300 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <FileQuestion className="h-4 w-4" />
                <span className="hidden sm:inline">Quiz</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {user && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={signOut}
              className="ml-2 text-gray-300 hover:text-white hover:bg-gray-800"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
