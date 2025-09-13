import { Button } from "../components/ui/button";
import { ArrowRight, Play, Zap, Shield, Brain, FileSearch, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239366ea' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
            <Brain className="w-5 h-5" />
            Powered by Advanced AI
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent block mb-4">
              Smart Document
            </span>
            <span className="text-gray-900 block">
              Analysis Platform
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Transform any document into actionable insights with our cutting-edge AI. 
            Upload, analyze, and understand your content like never before.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/under-construction')}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 group w-full sm:w-auto"
            >
              <Rocket className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
              Start Analyzing Now
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/under-construction')}
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-bold rounded-xl transition-all duration-300 group w-full sm:w-auto"
            >
              <Play className="w-5 h-5 mr-3" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 mb-7 gap-6 sm:gap-8 px-3">
          {[
            {
              icon: FileSearch,
              title: "Instant Analysis",
              description: "Upload any document and get comprehensive AI-powered insights within seconds",
              gradient: "from-purple-500 to-purple-700"
            },
            {
              icon: Zap,
              title: "Lightning Speed",
              description: "Process multiple documents simultaneously with our optimized AI engine",
              gradient: "from-purple-600 to-pink-600"
            },
            {
              icon: Shield,
              title: "Bank-Level Security",
              description: "Enterprise-grade encryption ensures your sensitive documents stay private",
              gradient: "from-purple-700 to-purple-900"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="group p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-purple-100 hover:border-purple-200"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 mx-auto shadow-md group-hover:scale-105 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}