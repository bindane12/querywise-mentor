
import React, { useState, useRef } from 'react';
import { Upload, File, X, FileText, FileImage } from 'lucide-react';
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
  const [preview, setPreview] = useState<string | null>(null);
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
    // Accept more file types
    const acceptedTypes = [
      'application/pdf', 
      'text/plain', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    if (!acceptedTypes.includes(selectedFile.type)) {
      alert('Only PDF, TXT, DOCX, and common image formats are supported');
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview for image files
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
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
          // Generate appropriate content based on file type
          let content = '';
          
          if (file.type.startsWith('image/')) {
            content = `I've analyzed the image "${file.name}". 
            
This appears to be a visual file that contains information which I can help analyze and explain. The image has been processed successfully.

Would you like me to:
1. Describe what's visible in the image
2. Extract any text content from the image
3. Analyze specific elements within the image`;
          } else {
            content = `I've analyzed the document "${file.name}". 
            
In a complete implementation, we would process the document content using a text extraction API and AI analysis.

Key Topics Identified:
1. Learning methodologies
2. Cognitive development
3. Educational technology integration
4. Assessment strategies

The document appears to focus on modern educational approaches with an emphasis on personalized learning paths and technology integration in the classroom.`;
          }
          
          onFileProcessed(content);
          setIsUploading(false);
          setFile(null);
          setPreview(null);
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
          <h3 className="text-lg font-medium mb-1">Upload File</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Drag and drop your file here or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, TXT, DOCX, JPEG, PNG, GIF (max 10MB)
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            accept=".pdf,.txt,.docx,.jpg,.jpeg,.png,.gif,.webp"
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {file.type.startsWith('image/') ? (
                <FileImage className="h-8 w-8 text-brand-blue mr-3" />
              ) : (
                <FileText className="h-8 w-8 text-brand-blue mr-3" />
              )}
              <div>
                <h3 className="font-medium text-sm">{file.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB • {file.type}
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
          
          {preview && (
            <div className="mb-4 relative rounded-md overflow-hidden border">
              <img 
                src={preview} 
                alt="File preview" 
                className="w-full h-auto max-h-48 object-contain bg-gray-50"
              />
            </div>
          )}
          
          {isUploading ? (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                {file.type.startsWith('image/') ? 'Analyzing image' : 'Analyzing document'}... {uploadProgress}%
              </p>
            </div>
          ) : (
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={onCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={processFile}>
                {file.type.startsWith('image/') ? 'Process Image' : 'Process Document'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
