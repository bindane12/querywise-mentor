
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logo} alt="BinesAI Logo" className="h-10" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent font-poppins">
            BinesAI
          </h1>
        </div>
        
        <Button 
          onClick={signIn}
          variant="outline" 
          className="bg-transparent border-white/20 hover:bg-white/10"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            "Sign In with Google"
          )}
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-teal-400 bg-clip-text text-transparent">
            Your Professional Learning Assistant
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Enhance your learning experience with our AI-powered educational tools. 
            Chat, solve math problems, write code, conduct research, and test your knowledge.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={signIn}
              size="lg" 
              className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white border-0"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate('/dashboard')}
              size="lg" 
              variant="outline"
              className="border-white/20 hover:bg-white/10"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">Powerful Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI Chat Assistant",
                description: "Engage with our AI assistant for quick answers and educational guidance."
              },
              {
                title: "Deep Think Mode",
                description: "Tackle complex problems with our advanced DeepSeek-powered reasoning engine."
              },
              {
                title: "Math Assistant",
                description: "Solve mathematical equations and understand concepts with step-by-step explanations."
              },
              {
                title: "Code Assistant",
                description: "Get help with programming, debug code, and learn coding best practices."
              },
              {
                title: "Research Tool",
                description: "Access quality information and academic resources for your research needs."
              },
              {
                title: "Quiz Mode",
                description: "Test your knowledge and receive detailed explanations to enhance understanding."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all">
                <h4 className="text-xl font-bold mb-3 text-blue-400">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-400">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} BinesAI · Your Professional Learning Assistant</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
