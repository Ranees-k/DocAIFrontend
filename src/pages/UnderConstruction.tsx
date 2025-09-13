import { Button } from "../components/ui/button";
import { ArrowLeft, Construction, Wrench, Clock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Construction Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/25 animate-pulse">
              <Construction className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <Wrench className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
            Under Construction
          </h1>
          
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent text-2xl sm:text-3xl font-bold mb-6">
            Something Amazing is Coming!
          </div>
          
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            We're working hard to bring you an incredible experience. 
            This feature will be available soon with all the functionality you need.
          </p>

          {/* Features Coming Soon */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-purple-100 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              What's Coming
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">Advanced AI Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">Real-time Processing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">Document Management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">Export & Sharing</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get Notified
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-sm text-gray-500">
            <p>Have questions? Contact us at <span className="text-purple-600 font-semibold">support@docai.com</span></p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default UnderConstruction; 