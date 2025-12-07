import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function UploadProgress({ files, onRemove }) {
  return (
    <div className="space-y-4">
      {files.map((file, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                {file.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                {file.status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                {file.status === 'uploading' && <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{file.name}</p>
                <p className="text-xs text-gray-400">{file.type}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {file.status === 'uploading' && (
                <div className="w-24">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${file.progress || 0}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{file.progress || 0}%</p>
                </div>
              )}
              
              {file.status === 'success' && (
                <span className="text-xs text-green-500 font-medium">Completed</span>
              )}
              
              {file.status === 'error' && (
                <span className="text-xs text-red-500 font-medium">Error</span>
              )}
              
              <button 
                onClick={() => onRemove(index)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Remove file"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
