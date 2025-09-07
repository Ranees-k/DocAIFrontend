import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Upload, File, X, CheckCircle, AlertCircle, FileText, Loader2 } from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface FileUploadProps {
  uploadProgress: number;
  uploadError: string | null;
  onFileDetailsChange?: (fileDetails: any) => void;
}

export default function FileUpload({
  uploadProgress,
  uploadError,
  onFileDetailsChange
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;
  const [uploadedFile, setUploadedFile] = useState<boolean>(false);
  const [fileDetails, setFileDetails] = useState<any>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgressLocal, setUploadProgressLocal] = useState<number>(0);

  // Validation functions
  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (file.size > maxSize) {
      return 'File size must be less than 10MB';
    }

    if (!allowedTypes.includes(file.type)) {
      return 'Only PDF, TXT, DOC, and DOCX files are allowed';
    }

    return null;
  };

  const validateUser = (): string | null => {
    if (!userId) {
      return 'Please log in to upload files';
    }
    return null;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clear previous errors
    setUploadedFile(false);
    setFileDetails(null);

    // Validate user
    const userError = validateUser();
    if (userError) {
      toast({
        title: "Authentication Required",
        description: userError,
      });
      return;
    }

    // Validate file
    const fileError = validateFile(file);
    if (fileError) {
      toast({
        title: "Invalid File",
        description: fileError,
      });
      return;
    }

    // Start upload
    setIsUploading(true);
    setUploadProgressLocal(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgressLocal(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      const response = await fetch("http://localhost:5001/file/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgressLocal(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Upload failed: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.document?.id) {
        toast({
          title: "File uploaded successfully",
          description: "You can now ask questions about your document",
        });
        
        setUploadedFile(true);
        setFileDetails(result.document);
        
        // Pass fileDetails to parent
        onFileDetailsChange?.(result.document);
      } else {
        throw new Error('Invalid response from server');
      }

    } catch (error: any) {
      console.error("Upload failed", error);
      toast({
        title: "Upload Failed",
        description: error.message || "An error occurred during upload",
      });
    } finally {
      setIsUploading(false);
      setUploadProgressLocal(0);
    }
  };

  const handleClick = () => {
    if (!isUploading && !uploadedFile) {
      fileInputRef.current?.click();
    }
  };

  const onFileRemove = () => {
    setUploadedFile(false);
    setFileDetails(null);
    setUploadProgressLocal(0);
    
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Notify parent component that file was removed
    onFileDetailsChange?.(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    if (!fileName) return <File className="h-8 w-8 text-gray-500" />;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'txt':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-8 w-8 text-blue-600" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl mt-10 mx-auto shadow-lg">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Upload className="h-6 w-6 text-blue-600" />
          Upload Document
        </CardTitle>
        <CardDescription className="text-gray-600">
          Upload your document to start asking questions. Supported formats: PDF, TXT, DOC, DOCX
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        {!uploadedFile ? (
          <div
            onClick={handleClick}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
              isUploading 
                ? 'opacity-50 cursor-not-allowed border-gray-200' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.txt,.doc,.docx"
              className="hidden"
              disabled={isUploading}
            />
            
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-blue-100 rounded-full">
                {isUploading ? (
                  <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                ) : (
                  <Upload className="h-12 w-12 text-blue-600" />
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-xl font-semibold text-gray-700">
                  {isUploading ? 'Uploading...' : 'Click to browse files'}
                </p>
                <p className="text-gray-500">
                  {isUploading ? 'Please wait while your file is being processed' : 'or drag and drop your file here'}
                </p>
              </div>
              
              {!isUploading && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    PDF
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    TXT
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    DOC
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    DOCX
                  </span>
                </div>
              )}
              
              <p className="text-sm text-gray-400 mt-4">
                Maximum file size: 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {getFileIcon(fileDetails?.filename)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {fileDetails?.filename}
                    </h3>   
                    <p className="text-xs text-gray-400 mt-1">
                      Last modified: {fileDetails?.uploaded_at ? new Date(fileDetails.uploaded_at).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onFileRemove}
                  disabled={isUploading}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Uploading...</span>
                  <span className="text-blue-600 font-semibold">{Math.round(uploadProgressLocal)}%</span>
                </div>
                <Progress value={uploadProgressLocal} className="w-full h-2" />
                <p className="text-xs text-gray-500 text-center">
                  Please wait while your file is being processed
                </p>
              </div>
            )}

            {/* Error Message */}
            {uploadError && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">Upload Failed</p>
                  <p className="text-sm text-red-700">{uploadError}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {uploadedFile && !uploadError && !isUploading && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800">File Ready!</p>
                  <p className="text-sm text-green-700">
                    Your document has been uploaded successfully and is ready for questions.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
