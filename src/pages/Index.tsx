
import React, { useState } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import QuizMode from '@/components/QuizMode';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 container mx-auto p-4">
        <div className="ai-assistant-container max-w-4xl">
          {activeTab === 'chat' ? (
            <ChatInterface />
          ) : (
            <div className="chat-container">
              <QuizMode />
            </div>
          )}
        </div>
      </main>
      
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} EduAssist AI · Your Professional Learning Assistant</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
