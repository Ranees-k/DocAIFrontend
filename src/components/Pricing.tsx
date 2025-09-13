import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Check, Star, Zap, Crown, Sparkles, Brain, ArrowRight } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Pricing() {
  const [showContactModal, setShowContactModal] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for individuals getting started",
      icon: Star,
      features: [
        "10 documents per month",
        "Basic AI analysis",
        "PDF & image support",
        "Email support",
        "24/7 access"
      ],
      buttonText: "Start Free",
      popular: false,
      delay: "0.2s",
      gradient: "from-purple-500 to-purple-700"
    },
    {
      name: "Professional",
      price: "$29",
      description: "Ideal for professionals and small teams",
      icon: Zap,
      features: [
        "Unlimited documents",
        "Advanced AI analysis",
        "All file formats supported",
        "Priority support",
        "API access",
        "Custom integrations",
        "Team collaboration",
        "Advanced analytics"
      ],
      buttonText: "Go Professional",
      popular: true,
      delay: "0.4s",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      name: "Enterprise",
      price: "$149",
      description: "Designed for large organizations",
      icon: Crown,
      features: [
        "Everything in Professional",
        "White-label solution",
        "Custom AI models",
        "Dedicated account manager",
        "On-premise deployment",
        "SLA guarantee",
        "Advanced security",
        "Custom training"
      ],
      buttonText: "Contact Sales",
      popular: false,
      delay: "0.6s",
      gradient: "from-purple-700 to-purple-900"
    }
  ];

  return (
    <>
      <section id="pricing" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-pink-100/30" />
        <div className="absolute top-20 left-10 sm:left-20 w-24 h-24 sm:w-32 sm:h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 sm:right-20 w-32 h-32 sm:w-40 sm:h-40 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <Brain className="w-5 h-5" />
              Transparent Pricing
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Choose Your Power Level
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Start free and unlock advanced features as you grow. Every plan includes our cutting-edge AI technology.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 group cursor-pointer bg-white/80 backdrop-blur-sm border-0 rounded-3xl overflow-hidden ${
                  plan.popular 
                    ? "shadow-2xl shadow-purple-500/25 scale-105 lg:scale-110 z-10" 
                    : "shadow-lg hover:shadow-purple-500/10"
                }`}
              >
                <CardHeader className="text-center pb-6 relative pt-8">
                  <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 bg-gradient-to-r ${plan.gradient} shadow-lg`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-2 mb-4">
                    <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-gray-600 text-base sm:text-lg font-medium">/month</span>
                  </div>
                  <CardDescription className="text-sm sm:text-base text-gray-600">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-6 h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full transition-all duration-300 hover:scale-105 text-sm sm:text-base font-semibold py-4 rounded-2xl bg-gradient-to-r ${plan.gradient} hover:shadow-lg hover:shadow-purple-500/25 group`}
                    size="lg"
                    onClick={() => navigate('/under-construction')}
                  >
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 sm:mt-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-purple-200 shadow-xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Need Something Custom?
                </span>
              </h3>
              <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                We create tailored AI solutions for enterprise clients. Let's discuss your unique requirements.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 px-8 py-4 text-base sm:text-lg font-semibold rounded-2xl group"
                onClick={() => setShowContactModal(true)}
              >
                <Sparkles className="w-5 h-5 mr-3" />
                Contact Our Team
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </>
  );
}