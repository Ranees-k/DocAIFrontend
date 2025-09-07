import { Button } from "../components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Shield, Brain, FileSearch, Rocket } from "lucide-react";
// import heroImage from "../assets/hero-image.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      {/* Background Image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        // style={}
      />
      
      {/* Animated Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-accent/25 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-3 h-3 bg-primary rounded-full animate-float opacity-80 glow-effect" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-accent rounded-full animate-float opacity-60 glow-effect" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-40 w-4 h-4 bg-primary rounded-full animate-float opacity-70 glow-effect" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full animate-float opacity-90 glow-effect" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-6 sm:mb-8 shadow-glow animate-glow">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
              Powered by Advanced AI
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight animate-fade-in-up">
            <span className="text-gradient block mb-2 sm:mb-4">
              Smart Document
            </span>
            <span className="text-foreground block">
              Analysis Platform
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed animate-fade-in px-4" style={{ animationDelay: '0.3s' }}>
            Transform any document into actionable insights with our cutting-edge AI. 
            Upload, analyze, and understand your content like never before.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-fade-in px-4" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-black hover:shadow-glow text-white px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-bold rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group w-full sm:w-auto animate-glow"
            >
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 mr-3 group-hover:animate-bounce" />
              Start Analyzing Now
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-glow px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-bold rounded-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 group w-full sm:w-auto"
            >
              <Play className="w-5 h-5 mr-3 group-hover:animate-bounce" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 animate-fade-in px-4" style={{ animationDelay: '0.9s' }}>
          {[
            {
              icon: FileSearch,
              title: "Instant Analysis",
              description: "Upload any document and get comprehensive AI-powered insights within seconds",
              gradient: "from-primary to-accent"
            },
            {
              icon: Zap,
              title: "Lightning Speed",
              description: "Process multiple documents simultaneously with our optimized AI engine",
              gradient: "from-accent to-primary"
            },
            {
              icon: Shield,
              title: "Bank-Level Security",
              description: "Enterprise-grade encryption ensures your sensitive documents stay private",
              gradient: "from-primary to-accent"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group p-6 sm:p-8 glass-morphism rounded-3xl hover:shadow-glow hover:-translate-y-4 transition-all duration-700 cursor-pointer animate-scale-in border border-primary/20 hover:border-primary/40"
              style={{ animationDelay: `${1.2 + index * 0.2}s` }}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-glow group-hover:animate-glow group-hover:scale-110 transition-all duration-500`}>
                <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}