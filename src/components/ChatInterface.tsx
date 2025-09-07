import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Send, Bot, User, Sparkles, AlertCircle, Loader2 } from "lucide-react";
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
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <Card className="glass-morphism border-red-200 shadow-glow">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-red-600 mb-2">No Document Uploaded</h3>
              <p className="text-gray-600 mb-4">
                Please upload a document first to start asking questions.
              </p>
              <Button 
                onClick={() => window.location.href = '/upload'}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Upload Document
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-24 h-24 sm:w-32 sm:h-32 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-10 sm:right-20 w-28 h-28 sm:w-36 sm:h-36 bg-accent/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex text-black items-center gap-2 bg-gradient-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-4 sm:mb-6 shadow-glow animate-glow">
            <Bot className="w-4 h-4 text-black sm:w-5 sm:h-5" />
            AI Chat Assistant
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gradient mb-4 sm:mb-6">
            Chat with Your Documents
          </h2>
          <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-4xl mx-auto">
            Ask anything about your uploaded files. Our AI provides instant, intelligent answers with context.
          </p>
          
          {/* File info */}
          {fileDetails && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg inline-block">
              <p className="text-sm text-green-700">
                <strong>Document:</strong> {fileDetails.filename}
              </p>
            </div>
          )}
        </div>

        <Card className="glass-morphism border-primary/20 shadow-glow animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-4 sm:pb-6 border-b border-primary/10">
            <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow animate-glow">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-black text-gradient">AI Assistant</div>
                <div className="text-xs sm:text-sm text-foreground/60 font-normal">Powered by Advanced AI</div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full shadow-glow ${
                  isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-primary animate-pulse'
                }`} />
                <span className="text-xs sm:text-sm text-foreground/60 font-medium">
                  {isLoading ? 'Processing...' : 'Online'}
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6">
            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-700">{error}</span>
                <Button
                  onClick={handleRetry}
                  size="sm"
                  variant="outline"
                  className="ml-auto text-red-600 border-red-300 hover:bg-red-50"
                >
                  Retry
                </Button>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 max-h-80 sm:max-h-96 overflow-y-auto">
              {messages.map((message, messageIndex) => (
                <div
                  key={message.id}
                  className={`flex gap-3 sm:gap-4 animate-fade-in ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  style={{ animationDelay: `${0.1 * messageIndex}s` }}
                >
                  {message.sender === "ai" && (
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shadow-glow flex-shrink-0">
                      <AvatarFallback className="bg-gradient-primary text-white">
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      message.sender === "user"
                        ? "bg-gradient-primary text-white shadow-glow"
                        : "glass-morphism border border-primary/20 shadow-glow"
                    }`}
                  >
                    <p className="text-sm sm:text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === "user" ? "text-white/70" : "text-foreground/50"
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shadow-glow flex-shrink-0">
                      <AvatarFallback className="bg-gradient-accent text-white">
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 sm:gap-4 justify-start animate-fade-in">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shadow-glow">
                    <AvatarFallback className="bg-gradient-primary text-white">
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="glass-morphism border border-primary/20 p-3 sm:p-4 rounded-2xl shadow-glow">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse glow-effect" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse glow-effect" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse glow-effect" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2 sm:gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything about your documents..."
                disabled={isLoading}
                className="flex-1 glass-morphism border-primary/30 focus:border-primary h-10 sm:h-12 rounded-2xl text-sm sm:text-base px-3 sm:px-4 transition-all duration-300 focus:shadow-glow disabled:opacity-50"
              />
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-black text-white hover:shadow-glow transition-all duration-500 hover:scale-110 hover:-translate-y-1 h-10 sm:h-12 px-4 sm:px-6 rounded-2xl group animate-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}