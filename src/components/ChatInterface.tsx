import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Send, Bot, User, AlertCircle, Loader2, Brain, MessageCircle } from "lucide-react";
import { toast } from "../hooks/use-toast";
import { API_BASE_URL } from '../config/api';

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface FileDetails {
  id: string;
  filename: string;
  file_type: string;
  uploaded_at: string;
}

export function ChatInterface({ fileDetails }: { fileDetails: FileDetails | null }) {
  console.log(fileDetails, "fileDetails");
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I've analyzed your uploaded documents. What would you like to know about them?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;

  // Validation functions
  const validateInput = (input: string): string | null => {
    if (!input.trim()) {
      return "Please enter a question";
    }
    if (input.length < 3) {
      return "Question must be at least 3 characters long";
    }
    if (input.length > 500) {
      return "Question must be less than 500 characters";
    }
    return null;
  };

  const validateFileDetails = (): string | null => {
    if (!fileDetails) {
      return "No document uploaded. Please upload a document first.";
    }
    if (!fileDetails.id) {
      return "Invalid document. Please upload a new document.";
    }
    return null;
  };

  const validateUser = (): string | null => {
    if (!userId) {
      return "Please log in to ask questions";
    }
    return null;
  };

  const handleSend = async () => {
    // Clear previous errors
    setError(null);
    
    // Validate input
    const inputError = validateInput(input);
    if (inputError) {
      setError(inputError);
      toast({
        title: "Invalid Input",
        description: inputError,
      });
      return;
    }

    // Validate file details
    const fileError = validateFileDetails();
    if (fileError) {
      setError(fileError);
      toast({
        title: "No Document",
        description: fileError,
      });
      return;
    }

    // Validate user
    const userError = validateUser();
    if (userError) {
      setError(userError);
      toast({
        title: "Authentication Required",
        description: userError,
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setIsLoading(true);
    setInput("");

    try {
      const response = await fetch(`${API_BASE_URL}/query/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          query: input,
          documentId: fileDetails!.id,
          userId: userId,
          limit: 10
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.answer) {
        throw new Error("No answer received from the server");
      }

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Show success toast
      toast({
        title: "Response Received",
        description: "AI has provided an answer to your question",
      });
      
    } catch (error: any) {
      console.error("Chat error:", error);
      setError(error.message);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error: ${error.message}`,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRetry = () => {
    setError(null);
    if (messages.length > 1) {
      // Remove the last AI message (error message) and retry
      setMessages(prev => prev.slice(0, -1));
      const lastUserMessage = messages[messages.length - 2];
      if (lastUserMessage && lastUserMessage.sender === "user") {
        setInput(lastUserMessage.content);
      }
    }
  };

  // Show error state if no file uploaded
  if (!fileDetails) {
    return (
      <div className="w-full max-w-4xl mt-10 mx-auto px-4 sm:px-6">
        <Card className="bg-white/80 mb-10 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Document Available</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Please upload a document first to start asking questions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mt-10 mx-auto px-4 sm:px-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-full text-sm font-semibold mb-4 shadow-lg">
          <MessageCircle className="w-5 h-5" />
          AI Chat Assistant
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Chat with Your Documents
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ask anything about your uploaded files. Our AI provides instant, intelligent answers with context.
        </p>
        
        {/* File info */}
        {fileDetails && (
          <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl px-4 py-2">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            <span className="text-sm text-purple-700 font-medium">
              <strong>Document:</strong> {fileDetails.filename}
            </span>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="relative">
        <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 p-6">
            <CardTitle className="flex items-center gap-4 text-xl">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800">AI Assistant</div>
                <div className="text-sm text-gray-600 font-normal">Powered by Advanced AI</div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
                }`} />
                <span className="text-sm text-gray-600 font-medium">
                  {isLoading ? 'Processing...' : 'Online'}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-red-800">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
                <Button
                  onClick={handleRetry}
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50 rounded-xl"
                >
                  Retry
                </Button>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-6 mb-8 max-h-96 overflow-y-auto pr-2">
              {messages.map((message, messageIndex) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "ai" && (
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                        <Bot className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg"
                        : "bg-gradient-to-r from-gray-50 to-purple-50 border border-purple-100"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === "user" ? "text-white/70" : "text-gray-500"
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {message.sender === "user" && (
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-r from-gray-600 to-gray-800 text-white">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-4 justify-start">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gradient-to-r from-gray-50 to-purple-50 border border-purple-100 p-4 rounded-2xl">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about your documents..."
                disabled={isLoading}
                className="flex-1 h-12 rounded-2xl border-purple-200 focus:border-purple-500 focus:ring-purple-500/20 text-sm px-4 transition-all duration-300 disabled:opacity-50"
              />
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white h-12 px-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}