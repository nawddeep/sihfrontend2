import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, AlertTriangle } from "lucide-react";

export default function DragDropSignatureZone({ onFileSelected, loading = false }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // Validate file type (image only)
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB");
      return;
    }

    setSelectedFile(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);

    // Notify parent component
    if (onFileSelected) {
      onFileSelected(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-4">
      {!previewUrl ? (
        <motion.div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          animate={dragActive ? { scale: 1.02 } : { scale: 1 }}
          className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
            dragActive
              ? "border-primary-400 bg-primary-500/5"
              : "border-dark-600 bg-dark-900/40 hover:border-primary-300/60"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="signature-upload"
            disabled={loading}
          />

          <label
            htmlFor="signature-upload"
            className="flex flex-col items-center justify-center cursor-pointer gap-3"
          >
            <motion.div
              animate={dragActive ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Upload className="w-10 h-10 text-primary-400" />
            </motion.div>

            <div className="text-center">
              <p className="text-sm font-semibold text-dark-100">
                Drag signature image here or click to browse
              </p>
              <p className="text-xs text-dark-400 mt-1">
                Supported: PNG, JPG, GIF (Max 5MB)
              </p>
            </div>
          </label>

          {/* Loading spinner overlay */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-dark-950/60 rounded-lg flex items-center justify-center backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-400 rounded-full"
              />
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="border border-dark-700 rounded-lg p-4 bg-dark-900/60 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            {/* Preview Image */}
            <div className="flex-shrink-0">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative w-24 h-32 rounded-lg overflow-hidden border border-dark-600 bg-dark-800"
              >
                <img
                  src={previewUrl}
                  alt="Signature Preview"
                  className="w-full h-full object-cover"
                />

                {/* Success badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute top-1 right-1 bg-accent-500 rounded-full p-1"
                >
                  <CheckCircle2 className="w-4 h-4 text-dark-950" />
                </motion.div>
              </motion.div>
            </div>

            {/* File Details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-dark-100 truncate">{selectedFile.name}</h4>
              <p className="text-xs text-dark-400 mt-1">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1 mt-2 p-2 rounded-md bg-accent-500/10 border border-accent-500/30"
              >
                <CheckCircle2 className="w-4 h-4 text-accent-400 flex-shrink-0" />
                <span className="text-xs text-accent-300">Ready for analysis</span>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFile}
              disabled={loading}
              className="flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg border border-danger-500/40 text-danger-300 hover:bg-danger-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Change
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* File Info */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-3 rounded-lg bg-dark-900/60 border border-dark-700"
        >
          <div className="flex items-center gap-2 text-xs text-dark-300">
            <CheckCircle2 className="w-4 h-4 text-accent-400" />
            <span>Image uploaded successfully. Proceed to similarity analysis →</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
