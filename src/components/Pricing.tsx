import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Check, Star, Zap, Crown, Sparkles } from "lucide-react";

export function Pricing() {
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
      gradient: "from-primary to-accent"
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
      gradient: "from-accent to-primary"
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
      gradient: "from-primary to-accent"
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      <div className="absolute top-20 left-10 sm:left-20 w-24 h-24 sm:w-32 sm:h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 sm:right-20 w-32 h-32 sm:w-40 sm:h-40 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-glow opacity-30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-4 sm:mb-6 shadow-glow animate-glow">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            Transparent Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gradient mb-4 sm:mb-6">
            Choose Your Power Level
          </h2>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            Start free and unlock advanced features as you grow. Every plan includes our cutting-edge AI technology.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-700 hover:shadow-glow hover:-translate-y-6 animate-fade-in group cursor-pointer glass-morphism ${
                plan.popular 
                  ? "border-primary shadow-glow scale-105 lg:scale-110 z-10 animate-glow" 
                  : "border-primary/20 hover:border-primary/50"
              }`}
              style={{ animationDelay: plan.delay }}
            >
              {plan.popular && (
                <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 animate-bounce-in">
                  <div className={`bg-gradient-to-r ${plan.gradient} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-glow animate-glow`}>
                    🔥 Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 sm:pb-8 relative">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110 bg-gradient-to-r ${plan.gradient} shadow-glow group-hover:animate-glow`}>
                  <plan.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-4xl sm:text-5xl font-black text-gradient">{plan.price}</span>
                  <span className="text-foreground/60 text-base sm:text-lg font-medium">/month</span>
                </div>
                <CardDescription className="text-sm sm:text-base text-foreground/70">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="px-4 sm:px-6">
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 animate-slide-in-left" style={{ animationDelay: `${0.1 * featureIndex}s` }}>
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-glow`}>
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="text-sm sm:text-sm text-foreground/90 group-hover:text-foreground transition-colors leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full transition-all duration-500 hover:scale-105 hover:-translate-y-2 text-sm sm:text-base font-bold py-4 sm:py-6 rounded-2xl bg-gradient-to-r ${plan.gradient} hover:shadow-glow animate-glow`}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="glass-morphism rounded-3xl p-6 sm:p-8 lg:p-12 border border-primary/20">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gradient mb-4 sm:mb-6">
              Need Something Custom?
            </h3>
            <p className="text-foreground/70 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              We create tailored AI solutions for enterprise clients. Let's discuss your unique requirements.
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-primary text-primary hover:bg-primary/10 hover:shadow-glow transition-all duration-500 hover:scale-110 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-bold rounded-2xl"
            >
              <Sparkles className="w-5 h-5 mr-3" />
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}