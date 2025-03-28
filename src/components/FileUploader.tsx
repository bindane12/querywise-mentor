
import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FileUploaderProps {
  onFileProcessed: (content: string) => void;
  onCancel: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileProcessed, onCancel }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Only accept certain file types
    const acceptedTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!acceptedTypes.includes(selectedFile.type)) {
      alert('Only PDF, TXT, and DOCX files are supported');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const processFile = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate file processing with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // In a real implementation, you would use a file reading API here
          const demoContent = `This is a simulated document analysis for "${file.name}". 
          
In a complete implementation, we would process the document content using a text extraction API and AI analysis.

Key Topics Identified:
1. Learning methodologies
2. Cognitive development
3. Educational technology integration
4. Assessment strategies

The document appears to focus on modern educational approaches with an emphasis on personalized learning paths and technology integration in the classroom.`;
          
          onFileProcessed(demoContent);
          setIsUploading(false);
          setFile(null);
          setUploadProgress(0);
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div 
          className="upload-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-brand-blue mb-4" />
          <h3 className="text-lg font-medium mb-1">Upload Document</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Drag and drop your file here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, TXT, DOCX (max 10MB)
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            accept=".pdf,.txt,.docx"
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <File className="h-8 w-8 text-brand-blue mr-3" />
              <div>
                <h3 className="font-medium text-sm">{file.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setFile(null)}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {isUploading ? (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                Analyzing document... {uploadProgress}%
              </p>
            </div>
          ) : (
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={onCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={processFile}>
                Process Document
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
