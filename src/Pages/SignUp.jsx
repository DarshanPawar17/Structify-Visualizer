import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import DynamicDSVisual from "../components/ui/DynamicDSVisual";
import { useAuth } from "../hooks/useAuth";

const SignUp = () => {
  const { signUp, error: authError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await signUp(email, password, name);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to create an account. Please try again.");
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
          
          <div className="absolute bottom-16 left-0 right-0 max-w-xs mx-auto space-y-2 pointer-events-none">
            <span className="label-sm text-primary font-bold tracking-[0.2em]">Structify Visualizer</span>
            <p className="body-md text-on-surface opacity-40 italic">
              Experience data structures in an immersive 3D environment.
            </p>
          </div>

          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Right Side: Sign-Up Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-16 overflow-y-auto">
          <div className="w-full max-w-md space-y-8 my-auto">
            <div className="space-y-2">
              <h1 className="display-lg text-on-surface">Join Structify</h1>
              <p className="body-md text-on-surface opacity-60">
                Unlock the full potential of data structure visualization.
              </p>
            </div>

            {/* Error Message */}
            {(error || authError) && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-sm text-red-700">{error || authError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="space-y-2">
                <label className="label-sm text-on-surface opacity-60 ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe" 
                  required
                  className="w-full px-5 py-4 bg-white border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface body-md"
                />
              </div>

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
                <label className="label-sm text-on-surface opacity-60 ml-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                  minLength={6}
                  className="w-full px-5 py-4 bg-white border border-[#e2e8f0] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface body-md"
                />
              </div>

              <div className="space-y-2">
                <label className="label-sm text-on-surface opacity-60 ml-1">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="body-md text-center text-on-surface opacity-60">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
