import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Mail, User, MessageSquare, Phone, Send, Brain, ArrowRight} from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.subject.trim()) return 'Subject is required';
    if (!formData.message.trim()) return 'Message is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address';
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form and close modal
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
        <DialogHeader className="text-center pb-6 pt-4 bg-gradient-to-r from-purple-50 to-pink-50 -m-6 mb-6 rounded-t-3xl">
          <div className="flex items-center justify-center gap-3 mb-4 px-6">    
            <DialogTitle className="text-3xl font-bold text-gray-800">Contact Our Team</DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 text-lg max-w-2xl mx-auto px-6">
            Get in touch with our experts to discuss your custom AI solution requirements
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div className="space-y-3">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-600" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-12 h-12 rounded-2xl border-purple-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-600" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-12 h-12 rounded-2xl border-purple-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-600" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-12 h-12 rounded-2xl border-purple-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <Label htmlFor="company" className="text-sm font-semibold text-gray-700">Company</Label>
              <div className="relative">
                <Brain className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-600" />
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Enter your company name"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="pl-12 h-12 rounded-2xl border-purple-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-3 mb-6">
            <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">Subject *</Label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-600" />
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleInputChange}
                className="pl-12 h-12 rounded-2xl border-purple-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3 mb-8">
            <Label htmlFor="message" className="text-sm font-semibold text-gray-700">Message *</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your project requirements, timeline, and any specific needs..."
              value={formData.message}
              onChange={handleInputChange}
              className="min-h-32 rounded-2xl border-purple-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pb-6">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-12 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 group disabled:opacity-50" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending Message...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Send className="w-5 h-5" />
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 