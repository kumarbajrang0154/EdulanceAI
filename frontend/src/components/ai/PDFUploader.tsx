import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { uploadPdfForSummarization, type UploadResponse } from '../../services/ai';

interface PDFUploaderProps {
  onSuccess: (data: UploadResponse['note']) => void;
  onError: (error: string) => void;
  isLoading?: boolean;
}

const PDFUploader = ({ onSuccess, onError, isLoading = false }: PDFUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isBusy = isLoading || isSubmitting;

  const validateFile = (file: File): string | null => {
    if (file.type !== 'application/pdf') {
      return 'Only PDF files are allowed';
    }
    if (file.size > 25 * 1024 * 1024) {
      return 'File size must be less than 25MB';
    }
    if (file.size === 0) {
      return 'File is empty';
    }
    return null;
  };

  const handleFile = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      onError(error);
      return;
    }

    setSelectedFile(file);
    setIsSubmitting(true);
    try {
      const response = await uploadPdfForSummarization(file);
      onSuccess(response.note);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { errors?: string[]; message?: string } } };
      const errorMessage = axiosError.response?.data?.errors?.[0] || axiosError.response?.data?.message || 'Upload failed';
      onError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
      setSelectedFile(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    if (isBusy) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (isBusy) return;
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isBusy) return;
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => {
          if (!isBusy) fileInputRef.current?.click();
        }}
        className={`relative rounded-2xl border-2 border-dashed p-12 text-center ${isBusy ? 'cursor-not-allowed' : 'cursor-pointer'} transition-all duration-200 ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-slate-300 bg-slate-50 hover:border-slate-400'
        } ${isBusy ? 'opacity-60' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          className="hidden"
          disabled={isBusy}
        />

        <div className="flex flex-col items-center gap-3">
          {isLoading || isSubmitting ? (
            <>
              <div className="w-12 h-12 rounded-full border-4 border-slate-300 border-t-blue-600 animate-spin" />
              <p className="text-slate-600 font-medium">
                {selectedFile ? `Processing ${selectedFile.name}...` : 'Processing...'}
              </p>
              <p className="text-xs text-slate-500">This may take a minute</p>
            </>
          ) : (
            <>
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
                />
              </svg>
              <p className="text-slate-900 font-semibold">Drop your PDF here or click to upload</p>
              <p className="text-sm text-slate-600">Maximum file size: 25MB</p>
              <p className="text-xs text-slate-500 mt-2">
                Supported format: PDF
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFUploader;
