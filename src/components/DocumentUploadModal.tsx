import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { DocumentFile } from '../types';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (newDoc: DocumentFile) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess
}) => {
  const [filename, setFilename] = useState('');
  const [fileType, setFileType] = useState('PDF Specification');
  const [content, setContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filename || !content) return;

    setIsUploading(true);
    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, fileType, content })
      });

      const data = await res.json();
      if (data.document) {
        onUploadSuccess(data.document);
        setFilename('');
        setContent('');
        onClose();
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0F1115] border border-slate-800 rounded-lg max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-7 h-7 rounded flex items-center justify-center"
        >
          ✕
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider font-mono">
            <UploadCloud className="w-4 h-4" />
            Upload Document to AutoHive Index
          </div>
          <h2 className="text-xl font-bold text-white">Add Knowledge File</h2>
          <p className="text-xs text-slate-400">
            Uploaded files are indexed for Content Finder Q&A, Patent Scout prior art checking, and Document Summarization.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1 font-mono">Document Filename</label>
            <input
              type="text"
              required
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="e.g. System_Security_Specification_2026.pdf"
              className="w-full bg-black/50 border border-slate-800 rounded px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 font-mono">File Category / Type</label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full bg-black/50 border border-slate-800 rounded px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
            >
              <option>PDF Specification</option>
              <option>Research Paper</option>
              <option>Patent Draft</option>
              <option>Project Spec / Architecture</option>
              <option>Market Analysis Report</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1 font-mono">Document Content / Text Payload</label>
            <textarea
              rows={5}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste document text or specification payload here..."
              className="w-full bg-black/50 border border-slate-800 rounded p-3 text-slate-200 focus:outline-none focus:border-blue-500 font-mono text-[11px]"
            ></textarea>
          </div>

          <div className="pt-2 flex gap-3 font-mono">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-800 text-slate-300 font-medium py-2 rounded hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded transition shadow-sm"
            >
              {isUploading ? 'Indexing File...' : 'Index & Save File'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
