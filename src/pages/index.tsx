import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import FileUpload from "../components/FileUpload";
import { ChatInterface } from "../components/ChatInterface";
import { Pricing } from "../components/Pricing";
import { useState } from "react";

const Index = () => {
  const [fileDetails, setFileDetails] = useState<any>(null);

  const handleFileDetailsChange = (details: any) => {
    setFileDetails(details);
    console.log("File details received in parent:", details);
    
    // If details is null, it means file was removed
    if (details === null) {
      console.log("File was removed, clearing file details");
    }
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-to-b bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      <main>
        <Hero />
        <FileUpload 
          uploadProgress={0}
          uploadError={null}
          onFileDetailsChange={handleFileDetailsChange}
        />
        <ChatInterface fileDetails={fileDetails} />
        <Pricing />
      </main>
      
      {/* Footer */}
      <footer id="footer" className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
   
          
          <div className="m-6 pt-6 text-center">
            <p className="text-sm text-foreground/60">
              © 2024 DocAI. All rights reserved.
            </p>
          </div>
      </footer>
    </div>
  );
};

export default Index;