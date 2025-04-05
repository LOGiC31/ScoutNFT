import { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import supabase from './supabaseClient';
import { User } from '@supabase/supabase-js';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const checkUser = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error.message);
      setUser(null);
    } else {
      setUser(session?.user || null);
    }
  };

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });

    if (error) {
      console.error('Google login error:', error.message);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email ? user.email : user.user_metadata?.name || "User"}</h1>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h1>{isLoggingIn ? 'Login' : 'Signup'}</h1>
          <button onClick={handleGoogleLogin}>Sign in with Google</button>
          {isLoggingIn ? (
            <Login onLoginSuccess={() => checkUser()} />
          ) : (
            <Signup onSignupSuccess={() => checkUser()} />
          )}
          <button onClick={() => setIsLoggingIn(!isLoggingIn)}>
            Switch to {isLoggingIn ? 'Signup' : 'Login'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;