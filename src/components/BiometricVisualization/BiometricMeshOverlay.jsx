/**
 * Biometric Mesh Overlay Component
 * 
 * Displays face mesh with confidence scores and liveness detection
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, CheckCircle, AlertCircle } from 'lucide-react';

export default function BiometricMeshOverlay({ confidence = 92, isLive = true }) {
  const canvasRef = useRef(null);
  const [meshData, setMeshData] = useState(null);

  // Generate mock face mesh landmarks
  useEffect(() => {
    const landmarks = generateFaceMesh();
    setMeshData(landmarks);
  }, []);

  // Draw mesh on canvas
  useEffect(() => {
    if (!canvasRef.current || !meshData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 500;

    // Clear canvas
    ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw face outline
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(200, 250, 120, 150, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Draw landmarks
    meshData.landmarks.forEach((landmark, idx) => {
      const x = landmark.x * canvas.width;
      const y = landmark.y * canvas.height;

      // Draw point
      ctx.fillStyle = `rgba(59, 130, 246, ${0.5 + landmark.confidence / 200})`;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw key features
    drawFeature(ctx, meshData.leftEye, 'left eye', canvas);
    drawFeature(ctx, meshData.rightEye, 'right eye', canvas);
    drawFeature(ctx, meshData.nose, 'nose', canvas);
    drawFeature(ctx, meshData.mouth, 'mouth', canvas);
    drawFeature(ctx, meshData.jawline, 'jawline', canvas);
  }, [meshData]);

  function drawFeature(ctx, feature, name, canvas) {
    if (!feature || !feature.points) return;

    ctx.strokeStyle = feature.color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    feature.points.forEach((point, idx) => {
      const x = point.x * canvas.width;
      const y = point.y * canvas.height;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    if (feature.closed) ctx.closePath();
    ctx.stroke();

    // Draw label
    const labelX = (feature.points[0].x * canvas.width + feature.points[feature.points.length - 1].x * canvas.width) / 2;
    const labelY = (feature.points[0].y * canvas.height + feature.points[feature.points.length - 1].y * canvas.height) / 2;

    ctx.fillStyle = feature.color;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${name} (${feature.confidence}%)`, labelX, labelY - 10);
  }

  function generateFaceMesh() {
    // Generate 468 face landmarks (mediapipe standard)
    const landmarks = Array.from({ length: 468 }).map(() => ({
      x: Math.random() * 0.8 + 0.1,
      y: Math.random() * 0.8 + 0.1,
      confidence: Math.random() * 30 + 70,
    }));

    return {
      landmarks,
      leftEye: {
        points: [
          { x: 0.35, y: 0.35 },
          { x: 0.45, y: 0.32 },
          { x: 0.48, y: 0.38 },
          { x: 0.38, y: 0.41 },
        ],
        confidence: 95,
        color: 'rgba(34, 197, 94, 0.8)',
        closed: true,
      },
      rightEye: {
        points: [
          { x: 0.55, y: 0.35 },
          { x: 0.65, y: 0.32 },
          { x: 0.68, y: 0.38 },
          { x: 0.58, y: 0.41 },
        ],
        confidence: 94,
        color: 'rgba(34, 197, 94, 0.8)',
        closed: true,
      },
      nose: {
        points: [
          { x: 0.5, y: 0.45 },
          { x: 0.5, y: 0.55 },
        ],
        confidence: 92,
        color: 'rgba(59, 130, 246, 0.8)',
        closed: false,
      },
      mouth: {
        points: [
          { x: 0.4, y: 0.65 },
          { x: 0.6, y: 0.65 },
          { x: 0.6, y: 0.72 },
          { x: 0.4, y: 0.72 },
        ],
        confidence: 88,
        color: 'rgba(249, 115, 22, 0.8)',
        closed: true,
      },
      jawline: {
        points: [
          { x: 0.25, y: 0.3 },
          { x: 0.2, y: 0.5 },
          { x: 0.25, y: 0.7 },
          { x: 0.5, y: 0.8 },
          { x: 0.75, y: 0.7 },
          { x: 0.8, y: 0.5 },
          { x: 0.75, y: 0.3 },
        ],
        confidence: 91,
        color: 'rgba(168, 85, 247, 0.8)',
        closed: true,
      },
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-govNavy-700">Face Mesh Analysis</h3>
        {isLive && (
          <span className="ml-auto inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-600"
            />
            Live
          </span>
        )}
      </div>

      {/* Canvas */}
      <div className="bg-slate-900 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
          role="img"
          aria-label="Face mesh visualization with confidence scores"
        />
      </div>

      {/* Confidence and Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-600 font-semibold mb-2">Overall Confidence</p>
          <motion.div
            className="text-3xl font-bold text-blue-700"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5 }}
          >
            {confidence}%
          </motion.div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-xs text-green-600 font-semibold mb-2">Liveness Status</p>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-lg font-bold text-green-700">Verified</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
