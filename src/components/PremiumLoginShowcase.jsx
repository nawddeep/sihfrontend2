import React, { useState } from 'react';
import { Lock, Shield, Zap, Eye, EyeOff } from 'lucide-react';

export default function PremiumLoginShowcase() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-aurora-neon bg-neon-grid relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/20 rounded-full filter blur-3xl animate-aurora-drift" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/20 rounded-full filter blur-3xl animate-aurora-drift" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-500/15 rounded-full filter blur-3xl animate-aurora-drift" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          {/* Premium Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block p-4 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl border border-primary-500/30 mb-6 neon-glow-box">
              <Shield className="w-12 h-12 text-primary-400 animate-pulse-neon" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 via-accent-400 to-purple-400 bg-clip-text text-transparent mb-2 text-glow">
              SecureExam
            </h1>
            <p className="text-primary-300/80 text-sm tracking-widest font-semibold">
              NATIONAL EXAM SECURITY PORTAL
            </p>
          </div>

          {/* Premium Login Card */}
          <div className="glass-card rounded-2xl border-2 border-transparent bg-gradient-to-br from-primary-950/40 to-accent-950/40 backdrop-blur-xl p-8 mb-8 border-glow">
            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-primary-300 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent-400" />
                  Select Your Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Student', 'Centre Staff', 'Security', 'Authority'].map((role) => (
                    <button
                      key={role}
                      className="py-3 px-4 rounded-lg border-2 border-primary-500/40 bg-primary-950/60 text-primary-300 hover:border-accent-400 hover:bg-accent-950/40 hover:text-accent-300 transition-all duration-300 text-sm font-semibold neon-button"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-primary-300 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-dark-900/60 border-2 border-primary-500/30 text-white placeholder-dark-400 focus:border-primary-400 focus:outline-none transition-all duration-300 focus:shadow-neon-blue focus:ring-primary-500/20 focus:ring-4"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-primary-300 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-lg bg-dark-900/60 border-2 border-primary-500/30 text-white placeholder-dark-400 focus:border-primary-400 focus:outline-none transition-all duration-300 focus:shadow-neon-blue focus:ring-primary-500/20 focus:ring-4"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-dark-400 hover:text-primary-300 cursor-pointer transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  Remember me
                </label>
                <a href="#" className="text-accent-400 hover:text-accent-300 transition-colors font-semibold">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button className="w-full py-4 px-6 rounded-lg font-bold text-dark-950 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 hover:from-primary-300 hover:via-accent-300 hover:to-primary-300 transition-all duration-300 neon-button uppercase tracking-widest text-sm shadow-neon-blue flex items-center justify-center gap-2">
                <Lock className="w-5 h-5" />
                Secure Login
              </button>
            </div>
          </div>

          {/* Footer Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Centres Online', value: '2,847' },
              { label: 'Exams Active', value: '156' },
              { label: 'Verified Docs', value: '98.4%' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-4 text-center border border-primary-500/20 hover:border-accent-400/50 transition-all duration-300"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-dark-400 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-dark-500 text-center mt-8 leading-relaxed">
            This portal uses advanced encryption and biometric verification for secure exam administration.
            <br />
            <span className="text-primary-400 font-semibold">Your data is protected.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
