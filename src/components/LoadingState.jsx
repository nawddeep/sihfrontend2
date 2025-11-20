import React from "react";

export default function LoadingState({ message = "Loading...", subMessage }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="space-y-3 text-center">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-400">{message}</p>
        {subMessage && (
          <p className="text-xs text-slate-500">{subMessage}</p>
        )}
      </div>
    </div>
  );
}

