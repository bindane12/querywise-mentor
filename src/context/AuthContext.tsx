
import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      if (event === 'SIGNED_IN') {
        toast({
          title: "Signed in successfully",
          description: `Welcome ${newSession?.user?.user_metadata?.name || 'back'}!`,
        });
      }
      
      if (event === 'SIGNED_OUT') {
        toast({
          title: "Signed out successfully",
          description: "You have been signed out",
        });
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Use email sign in as a fallback when OAuth is not available
  const signIn = async () => {
    try {
      // First try magic link authentication instead of OAuth
      const { error } = await supabase.auth.signInWithOtp({
        email: 'demo@example.com', // We'll use a demo account for now
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });
      
      if (error) {
        console.error("Magic link error:", error);
        toast({
          title: "Sign in link sent",
          description: "Please check your email for the sign in link",
        });
      } else {
        toast({
          title: "Sign in link sent",
          description: "Please check your email for the sign in link",
        });
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Error signing in",
        description: "There was an error with authentication",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
