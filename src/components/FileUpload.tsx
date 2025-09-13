import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Upload, File, X, CheckCircle, AlertCircle, FileText, Loader2, Sparkles, Zap, ArrowRight } from 'lucide-react';
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

      const response = await fetch(`${process.env.REACT_APP_API_URL}/file/upload`, {
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
    <div className="w-full max-w-4xl bg mt-10 mx-auto px-4 sm:px-6">
      {/* Header Section */}
 

      {/* Main Upload Area */}
      <div className="relative">
        {/* Background Elements */}
        
        <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-0">
            {!uploadedFile ? (
              <div
                onClick={handleClick}
                className={`relative p-16 text-center cursor-pointer transition-all duration-500 group ${
                  isUploading 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:scale-[1.02]'
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
                
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex flex-col items-center space-y-8">
                  {/* Icon Container */}
                  <div className="relative">
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                      isUploading 
                        ? 'bg-gradient-to-r from-purple-200 to-pink-200' 
                        : 'bg-gradient-to-r from-purple-600 to-purple-800 group-hover:from-purple-700 group-hover:to-purple-900 group-hover:scale-110 shadow-2xl'
                    }`}>
                      {isUploading ? (
                        <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
                      ) : (
                        <Upload className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-300" />
                      )}
                    </div>
                    
          
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-gray-800">
                      {isUploading ? 'Processing...' : 'Drop Your File Here'}
                    </h3>
                    <p className="text-xl text-gray-600 max-w-md">
                      {isUploading 
                        ? 'Our AI is analyzing your document' 
                        : 'Click to browse or drag & drop your document'
                      }
                    </p>
                  </div>
                  
                  {/* File Type Pills */}
                  {!isUploading && (
                    <div className="flex flex-wrap justify-center gap-3">
                      {[
                        { type: 'PDF', color: 'from-red-500 to-red-600' },
                        { type: 'TXT', color: 'from-blue-500 to-blue-600' },
                        { type: 'DOC', color: 'from-green-500 to-green-600' },
                        { type: 'DOCX', color: 'from-purple-500 to-purple-600' }
                      ].map(({ type, color }) => (
                        <span 
                          key={type}
                          className={`px-4 py-2 bg-gradient-to-r ${color} text-white rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-transform duration-200`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Features */}
                  <div className="flex items-center gap-8 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-purple-600" />
                      <span>Instant Analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      <span>AI Powered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-purple-600" />
                      <span>Max 10MB</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8">
                {/* File Display */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-lg">
                        {getFileIcon(fileDetails?.filename)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {fileDetails?.filename}
                        </h3>   
                        <p className="text-gray-500">
                          Added {fileDetails?.uploaded_at ? new Date(fileDetails.uploaded_at).toLocaleDateString() : 'recently'}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={onFileRemove}
                      disabled={isUploading}
                      className="text-gray-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-50 rounded-xl p-3"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                        AI Processing Document
                      </span>
                      <span className="text-purple-600 font-bold text-lg">{Math.round(uploadProgressLocal)}%</span>
                    </div>
                    <Progress 
                      value={uploadProgressLocal} 
                      className="w-full h-3 bg-purple-100 rounded-full" 
                    />
                    <p className="text-center text-gray-600">
                      Extracting insights and preparing for analysis...
                    </p>
                  </div>
                )}

                {/* Status Messages */}
                {uploadError && (
                  <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-200 rounded-2xl mb-6">
                    <div className="p-2 bg-red-100 rounded-xl">
                      <AlertCircle className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-800">Processing Failed</p>
                      <p className="text-red-700">{uploadError}</p>
                    </div>
                  </div>
                )}

                {uploadedFile && !uploadError && !isUploading && (
                  <div className="flex items-center gap-4 p-5 bg-green-50 border border-green-200 rounded-2xl">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-800">Ready for Analysis!</p>
                      <p className="text-green-700">
                        Your document is processed and ready for questions.
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-4 py-2 rounded-xl">
                      Start Chat
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
