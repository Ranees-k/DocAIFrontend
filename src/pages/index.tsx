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
    <div className="min-h-screen bg-background">
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
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <span className="font-bold text-lg">DocAI</span>
              </div>
              <p className="text-sm text-foreground/60">
                Intelligent document analysis powered by advanced AI technology.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-foreground/60">
                {/* <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li> */}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-foreground/60">
                {/* <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li> */}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-foreground/60">
                {/* <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li> */}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center">
            <p className="text-sm text-foreground/60">
              © 2024 DocAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;