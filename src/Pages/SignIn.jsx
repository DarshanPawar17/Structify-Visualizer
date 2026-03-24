import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DynamicDSVisual from "../components/ui/DynamicDSVisual";
import { useAuth } from "../hooks/useAuth";

const SignIn = () => {
  const { googleSignIn, emailSignIn, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await emailSignIn(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col font-sans overflow-hidden">
      <Navbar />
      
      <main className="flex-1 flex flex-col md:flex-row animate-blur-reveal">
        {/* Left Side: Illustration (Desktop Only) */}
        <div className="hidden md:flex md:w-1/2 bg-[#efeff1] items-center justify-center p-10 relative overflow-hidden text-center">
          <div className="w-full h-full max-w-2xl aspect-square flex items-center justify-center">
            <DynamicDSVisual />
          </div>
          
          {/* Overlay text to explain the visual */}
          <div className="absolute bottom-16 left-0 right-0 max-w-xs mx-auto space-y-2 pointer-events-none">
            <span className="label-sm text-primary font-bold tracking-[0.2em]">Structify Visualizer</span>
            <p className="body-md text-on-surface opacity-40 italic">
              Experience data structures in an immersive 3D environment.
            </p>
          </div>

          {/* Subtle floating overlay elements for depth */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Right Side: Sign-In Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-16">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="display-lg text-on-surface">Welcome Back</h1>
              <p className="body-md text-on-surface opacity-60">
                Continue your journey in visualising complex data structures.
              </p>
            </div>

            {/* Error Message */}
            {(error || authError) && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-sm text-red-700">{error || authError}</p>
              </div>
            )}

            {/* Social Login */}
            <div className="space-y-4">
              <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-[#e2e8f0] py-4 rounded-xl shadow-sm hover:shadow-md transition-all premium-hover group disabled:opacity-50"
              >
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  className="w-5 h-5"
                />
                <span className="label-sm text-on-surface group-hover:opacity-80">
                  {loading ? "Signing in..." : "Sign in with Google"}
                </span>
              </button>
            </div>

            <div className="relative flex items-center py-5">
              <div className="flex-grow border-t border-[#e2e8f0]"></div>
              <span className="flex-shrink mx-4 label-sm text-on-surface opacity-40">Or email</span>
              <div className="flex-grow border-t border-[#e2e8f0]"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="label-sm text-on-surface opacity-60 ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  required
                  className="w-full px-5 py-4 bg-white border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface body-md"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="label-sm text-on-surface opacity-60">Password</label>
                  <Link to="/forgot-password" title="Forgot Password" className="label-sm text-primary opacity-80 hover:opacity-100 no-underline">
                    Forgot?
                  </Link>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  className="w-full px-5 py-4 bg-white border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface body-md"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#5f5e5e] text-white py-4 rounded-xl label-sm tracking-[0.2em] hover:bg-[#4a4949] transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Sign In"}
              </button>
            </form>

            <p className="body-md text-center text-on-surface opacity-60">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="p-8 text-center bg-[#f9f9f9] border-t border-[#f1f1f1]">
        <p className="label-sm text-on-surface opacity-30 tracking-widest">
          Structify &bull; Precision &bull; Clarity
        </p>
      </footer>
    </div>
  );
};

export default SignIn;
