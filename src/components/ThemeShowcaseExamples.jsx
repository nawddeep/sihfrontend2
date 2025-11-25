import React from 'react';
import { AlertTriangle, CheckCircle2, Zap, Eye, Lock, Shield, Bell, TrendingUp } from 'lucide-react';

export default function ThemeShowcaseExamples() {
  return (
    <div className="min-h-screen bg-aurora-neon bg-neon-grid p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-glow bg-gradient-to-r from-primary-400 via-accent-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Theme Showcase
          </h1>
          <p className="text-primary-300/80 text-lg">
            All the animations, colors, and effects available in your theme
          </p>
        </div>

        {/* Section 1: Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-300 flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent-400" />
            Buttons & Interactive Elements
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Neon Primary Button */}
            <button className="py-4 px-6 rounded-lg font-bold text-dark-950 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 hover:from-primary-300 hover:via-accent-300 hover:to-primary-300 transition-all duration-300 neon-button uppercase tracking-widest shadow-neon-blue">
              Neon Primary Button
            </button>

            {/* Success Button */}
            <button className="py-4 px-6 rounded-lg font-bold text-dark-950 bg-success-500 hover:bg-success-400 transition-all duration-300 neon-button uppercase tracking-widest shadow-neon-green">
              Success Action
            </button>

            {/* Danger Button */}
            <button className="py-4 px-6 rounded-lg font-bold text-white bg-danger-500 hover:bg-danger-400 transition-all duration-300 neon-button uppercase tracking-widest shadow-neon-red">
              Danger Action
            </button>

            {/* Purple Button */}
            <button className="py-4 px-6 rounded-lg font-bold text-white bg-purple-500 hover:bg-purple-400 transition-all duration-300 neon-button uppercase tracking-widest shadow-neon-purple">
              Purple Action
            </button>
          </div>
        </section>

        {/* Section 2: Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-300 flex items-center gap-2">
            <Eye className="w-6 h-6 text-accent-400" />
            Card Styles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Glass Card with Glow */}
            <div className="glass-card rounded-xl p-6 border border-primary-500/30 neon-glow-box">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6 text-success-400 animate-pulse-neon" />
                <h3 className="font-bold text-primary-300">Verified</h3>
              </div>
              <p className="text-dark-300 text-sm">All documents have been verified successfully.</p>
            </div>

            {/* Alert Card */}
            <div className="glass-card rounded-xl p-6 border-2 border-danger-500/50 shadow-neon-red">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-danger-400 animate-cyber-flicker" />
                <h3 className="font-bold text-danger-300">Alert</h3>
              </div>
              <p className="text-dark-300 text-sm">Suspicious activity detected. Review required.</p>
            </div>

            {/* Info Card */}
            <div className="glass-card rounded-xl p-6 border-2 border-primary-500/30 shadow-glow-md">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="w-6 h-6 text-primary-400 animate-pulse-neon" />
                <h3 className="font-bold text-primary-300">Notification</h3>
              </div>
              <p className="text-dark-300 text-sm">New exam session started. Check dashboard.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Badges & Tags */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-300 flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent-400" />
            Badges & Status Tags
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Verified', color: 'bg-success-950/60 border-success-500/40 text-success-300' },
              { label: 'Pending', color: 'bg-warning-950/60 border-warning-500/40 text-warning-300' },
              { label: 'Fraud Alert', color: 'bg-danger-950/60 border-danger-500/40 text-danger-300' },
              { label: 'Premium', color: 'bg-accent-950/60 border-accent-500/40 text-accent-300' },
              { label: 'Active', color: 'bg-primary-950/60 border-primary-500/40 text-primary-300' },
            ].map((badge) => (
              <span key={badge.label} className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all hover:shadow-glow-md ${badge.color}`}>
                {badge.label}
              </span>
            ))}
          </div>
        </section>

        {/* Section 4: Animated Text */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-300 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent-400" />
            Animated Text & Effects
          </h2>
          <div className="space-y-4">
            {/* Text Glow */}
            <div className="p-6 glass-card rounded-xl border border-primary-500/30">
              <h3 className="text-3xl font-bold text-glow bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Glowing Text Effect
              </h3>
              <p className="text-dark-300 mt-2">Text with neon glow animation</p>
            </div>

            {/* Shimmer */}
            <div className="p-6 glass-card rounded-xl border border-primary-500/30">
              <div className="shimmer bg-gradient-to-r from-primary-400 via-accent-400 to-purple-400 bg-clip-text text-transparent inline-block">
                <h3 className="text-2xl font-bold">Shimmer Effect</h3>
              </div>
              <p className="text-dark-300 mt-2">Shimmering gradient animation</p>
            </div>

            {/* Cyber Flicker */}
            <div className="p-6 glass-card rounded-xl border border-danger-500/30">
              <h3 className="text-2xl font-bold text-danger-300 cyber-flicker">
                Cyber Flicker Effect
              </h3>
              <p className="text-dark-300 mt-2">Authentic glitch/flicker animation</p>
            </div>
          </div>
        </section>

        {/* Section 5: Animations Showcase */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-300 flex items-center gap-2">
            <Lock className="w-6 h-6 text-accent-400" />
            Animation Classes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                name: 'Neon Glow', 
                class: 'animate-neon-glow', 
                desc: 'Blue & pink color-shifting glow' 
              },
              { 
                name: 'Cyber Flicker', 
                class: 'animate-cyber-flicker', 
                desc: 'Authentic glitch effect' 
              },
              { 
                name: 'Aurora Drift', 
                class: 'animate-aurora-drift', 
                desc: 'Smooth floating motion' 
              },
              { 
                name: 'Pulse Neon', 
                class: 'animate-pulse-neon', 
                desc: 'Scale & opacity pulse' 
              },
            ].map((anim) => (
              <div key={anim.name} className="glass-card rounded-xl p-6 border border-primary-500/30">
                <div className={`h-16 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center mb-4 ${anim.class}`}>
                  <span className="font-bold text-white">Live Effect</span>
                </div>
                <h3 className="font-bold text-primary-300 mb-1">{anim.name}</h3>
                <p className="text-dark-300 text-sm mb-3">{anim.desc}</p>
                <code className="text-xs bg-dark-900/60 px-3 py-2 rounded text-primary-400 block">
                  {anim.class}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Shadow/Glow Effects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-300">Neon Shadow Effects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Blue', shadow: 'shadow-neon-blue', color: 'from-primary-600 to-primary-400' },
              { name: 'Pink', shadow: 'shadow-neon-pink', color: 'from-accent-600 to-accent-400' },
              { name: 'Purple', shadow: 'shadow-neon-purple', color: 'from-purple-600 to-purple-400' },
              { name: 'Green', shadow: 'shadow-neon-green', color: 'from-success-600 to-success-400' },
              { name: 'Red', shadow: 'shadow-neon-red', color: 'from-danger-600 to-danger-400' },
            ].map((glow) => (
              <div 
                key={glow.name} 
                className={`h-32 rounded-xl bg-gradient-to-br ${glow.color} p-6 flex items-center justify-center font-bold text-white transition-all hover:scale-105 ${glow.shadow}`}
              >
                {glow.name} Glow
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Complex Example - Dashboard Card */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary-300 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent-400" />
            Complex Example - Premium Dashboard Card
          </h2>
          <div className="glass-card rounded-2xl border-2 border-primary-500/30 overflow-hidden neon-glow-box">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Exam Security Status
              </h3>
              <p className="text-primary-100 text-sm mt-1">Real-time monitoring & verification</p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Stats Row */}
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: 'Active Centres', value: '2,847', color: 'primary' },
                  { label: 'Verified Exams', value: '156', color: 'success' },
                  { label: 'Fraud Alerts', value: '12', color: 'danger' },
                  { label: 'Pending Review', value: '8', color: 'warning' },
                ].map((stat) => (
                  <div key={stat.label} className={`p-4 rounded-lg bg-${stat.color}-950/40 border border-${stat.color}-500/30 text-center`}>
                    <div className={`text-2xl font-bold text-${stat.color}-400 mb-1`}>
                      {stat.value}
                    </div>
                    <div className={`text-xs text-${stat.color}-300/80`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-primary-500/20">
                <button className="py-3 px-4 rounded-lg bg-primary-500 hover:bg-primary-400 text-white font-semibold transition-all shadow-neon-blue neon-button">
                  View Detailed Reports
                </button>
                <button className="py-3 px-4 rounded-lg bg-accent-500 hover:bg-accent-400 text-white font-semibold transition-all shadow-neon-pink neon-button">
                  Review Alerts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-12 border-t border-primary-500/20">
          <p className="text-dark-400 text-sm">
            This is the <span className="text-accent-400 font-bold">BEST THEME</span> you'll ever see.
            <br />
            Built with ⚡ neon power and 💫 pure CSS magic.
          </p>
        </div>
      </div>
    </div>
  );
}
