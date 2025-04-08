
import React from 'react';
import { BookOpen, X, MessageSquare, Code, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const { signOut, user } = useAuth();
  
  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-30 w-72 bg-gray-900 border-r border-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out font-ovo",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="font-patrick-hand text-xl text-white font-bold">B</span>
          </div>
          <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">BinesAI</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-800 text-gray-400">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {user && (
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-2">
            {user.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="User avatar" 
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-medium">
                  {(user.user_metadata?.name || 'User').charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-gray-200 truncate">
                {user.user_metadata?.name || user.email || 'User'}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={signOut}
              className="hover:bg-gray-800 text-gray-400"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="p-4">
        <h3 className="mb-2 text-sm font-medium text-gray-400">FEATURES</h3>
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start text-gray-300 hover:bg-gray-800",
              activeTab === 'chat' ? "bg-blue-900/50 text-blue-400" : ""
            )}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat Assistant
          </Button>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start text-gray-300 hover:bg-gray-800",
              activeTab === 'deepthink' ? "bg-purple-900/50 text-purple-400" : ""
            )}
            onClick={() => setActiveTab('deepthink')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Deep Think
          </Button>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start text-gray-300 hover:bg-gray-800",
              activeTab === 'code' ? "bg-blue-900/50 text-blue-400" : ""
            )}
            onClick={() => setActiveTab('code')}
          >
            <Code className="mr-2 h-4 w-4" />
            Code Assistant
          </Button>
          <Button 
            variant="ghost" 
            className={cn(
              "w-full justify-start text-gray-300 hover:bg-gray-800",
              activeTab === 'research' ? "bg-purple-900/50 text-purple-400" : ""
            )}
            onClick={() => setActiveTab('research')}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Bin Research
          </Button>
        </div>
      </div>
      
      <Separator className="bg-gray-800" />
      
      <div className="p-4">
        <h3 className="mb-2 text-sm font-medium text-gray-400">AI MODELS (BETA)</h3>
        <div className="space-y-1">
          <div className="px-3 py-2 text-sm flex justify-between items-center text-gray-300">
            <span>Gemini Flash 2.0</span>
            <Badge variant="outline" className="text-green-400 border-green-400/50">Active</Badge>
          </div>
          <div className="px-3 py-2 text-sm flex justify-between items-center text-gray-300">
            <span>GPT 4.0</span>
            <Badge variant="outline" className="text-gray-400 border-gray-500/50">Not Available</Badge>
          </div>
          <div className="px-3 py-2 text-sm flex justify-between items-center text-gray-300">
            <span>Gemini 2.5 Experimental</span>
            <Badge variant="outline" className="text-gray-400 border-gray-500/50">Not Available</Badge>
          </div>
          <div className="px-3 py-2 text-sm flex justify-between items-center text-gray-300">
            <span>Llama 4 Scout</span>
            <Badge variant="outline" className="text-gray-400 border-gray-500/50">Not Available</Badge>
          </div>
        </div>
      </div>
      
      <Separator className="bg-gray-800" />
      
      <div className="p-4 flex-1 overflow-hidden">
        <h3 className="mb-2 text-sm font-medium text-gray-400">RECENT CHATS</h3>
        <ScrollArea className="h-[calc(100vh-420px)]">
          <div className="flex flex-col items-center justify-center text-center py-8 text-gray-400">
            <p className="text-sm">No recent chats yet</p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Sidebar;
