
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import DeepThinkInterface from '@/components/DeepThinkInterface';
import QuizMode from '@/components/QuizMode';
import Sidebar from '@/components/Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Placeholder for new features
  const FeaturePlaceholder = ({ title }: { title: string }) => (
    <div className="bg-white h-full rounded-lg p-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-gray-600 text-center mb-6">
        This feature is coming soon! We're currently working on it.
      </p>
      <Button onClick={() => setActiveTab('chat')}>
        Return to Chat
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-ovo">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 max-w-5xl">
          <div className="mb-4 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)}
              className="mr-2"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab === 'chat' ? 'Chat Assistant' : 
               activeTab === 'deepthink' ? 'Deep Think' : 
               activeTab === 'math' ? 'Math Assistant' :
               activeTab === 'code' ? 'Code Assistant' :
               activeTab === 'research' ? 'Bin Research' : 'Quiz Mode'}
            </h1>
          </div>
          
          <div className="ai-assistant-container max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
            {activeTab === 'chat' ? (
              <ChatInterface />
            ) : activeTab === 'deepthink' ? (
              <DeepThinkInterface />
            ) : activeTab === 'quiz' ? (
              <div className="chat-container">
                <QuizMode />
              </div>
            ) : activeTab === 'math' ? (
              <FeaturePlaceholder title="Math Assistant" />
            ) : activeTab === 'code' ? (
              <FeaturePlaceholder title="Code Assistant" />
            ) : (
              <FeaturePlaceholder title="Bin Research" />
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-4 text-center text-sm text-muted-foreground bg-white">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} BinesAI · Your Professional Learning Assistant</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
