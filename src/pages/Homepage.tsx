
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const Homepage = () => {
  const { user, isLoading, signIn } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      signIn();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation Bar */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src={logo} alt="AI Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-semibold text-white">BinesAI</h1>
        </div>
        
        <Button 
          onClick={signIn}
          variant="outline" 
          className="bg-transparent border border-gray-700 hover:bg-white/10 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center max-w-6xl">
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 space-y-6 md:pr-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Professional AI Learning Assistant
            </h2>
            
            <p className="text-lg text-gray-300 mt-4 max-w-lg">
              Enhance your knowledge with our advanced AI tools. Get accurate answers, solve problems, and learn faster with BinesAI.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 rounded-full px-8 flex items-center gap-2 text-base"
              >
                Get Started
                <ArrowRight size={18} />
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg" 
                variant="outline"
                className="border-gray-700 hover:bg-white/10 rounded-full px-8 text-base"
              >
                Explore Features
              </Button>
            </div>
          </div>
          
          {/* Right Column - Visual Elements */}
          <div className="hidden md:flex w-full md:w-1/2 justify-center mt-12 md:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl blur-3xl opacity-30"></div>
              <div className="glass-card bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg rounded-tl-none max-w-sm">
                    <p className="text-gray-200">
                      Hello! I'm your AI assistant. How can I help you learn today?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 justify-end">
                  <div className="bg-gray-800 p-4 rounded-lg rounded-tr-none max-w-sm">
                    <p className="text-gray-200">
                      Can you explain how neural networks work?
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="bg-gray-900 py-20 px-4">
          <div className="container mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center">Our Capabilities</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Chat Assistant",
                  description: "Get instant answers and educational guidance on any topic."
                },
                {
                  title: "Deep Think Mode",
                  description: "Tackle complex problems with advanced reasoning capabilities."
                },
                {
                  title: "Math Helper",
                  description: "Solve equations and understand concepts step-by-step."
                },
                {
                  title: "Code Assistant",
                  description: "Learn programming concepts and debug your code."
                },
                {
                  title: "Research Aid",
                  description: "Access quality information and academic resources."
                },
                {
                  title: "Quiz Mode",
                  description: "Test your knowledge and receive detailed explanations."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all">
                  <h4 className="text-xl font-semibold mb-3 text-blue-400">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} BinesAI · Your Professional Learning Assistant</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
