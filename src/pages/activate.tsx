import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle, XCircle, Loader2, Mail, ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../config/api';
import { toast } from '../hooks/use-toast';

interface ActivationState {
  status: 'loading' | 'success' | 'error' | 'expired';
  message: string;
}

const Activate = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [activationState, setActivationState] = useState<ActivationState>({
    status: 'loading',
    message: 'Activating your account...'
  });

  useEffect(() => {
    if (token) {
      activateAccount(token);
    } else {
      setActivationState({
        status: 'error',
        message: 'Invalid activation link'
      });
    }
  }, [token]);

  const activateAccount = async (activationToken: string) => {
    try {
      setActivationState({
        status: 'loading',
        message: 'Activating your account...'
      });

      const response = await fetch(`${API_BASE_URL}/auth/activate/${activationToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setActivationState({
          status: 'success',
          message: data.message || 'Your account has been successfully activated!'
        });

        toast({
          title: "Account Activated",
          description: "Your account is now active. You can now log in.",
        });

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        if (response.status === 410) {
          setActivationState({
            status: 'expired',
            message: data.message || 'This activation link has expired. Please request a new one.'
          });
        } else {
          setActivationState({
            status: 'error',
            message: data.message || 'Activation failed. Please try again.'
          });
        }
      }
    } catch (error: any) {
      console.error('Activation error:', error);
      setActivationState({
        status: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    }
  };

  const handleResendActivation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-activation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Activation Email Sent",
          description: "A new activation email has been sent to your email address.",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to resend activation email.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend activation email. Please try again.",
      });
    }
  };

  const getStatusIcon = () => {
    switch (activationState.status) {
      case 'loading':
        return <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />;
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />;
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      case 'expired':
        return <Mail className="w-16 h-16 text-orange-500 mx-auto mb-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (activationState.status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'expired':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full">
        <Card className={`shadow-lg ${getStatusColor()}`}>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              Account Activation
            </CardTitle>
            <CardDescription>
              {activationState.status === 'loading' && 'Please wait while we activate your account...'}
              {activationState.status === 'success' && 'Welcome to DocAI!'}
              {activationState.status === 'error' && 'Activation Failed'}
              {activationState.status === 'expired' && 'Activation Link Expired'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            {getStatusIcon()}
            
            <div className="space-y-4">
              <p className={`text-lg font-medium ${
                activationState.status === 'success' ? 'text-green-700' :
                activationState.status === 'error' ? 'text-red-700' :
                activationState.status === 'expired' ? 'text-orange-700' :
                'text-blue-700'
              }`}>
                {activationState.message}
              </p>

              {activationState.status === 'success' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    You will be redirected to the login page in a few seconds...
                  </p>
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Go to Login
                  </Button>
                </div>
              )}

              {activationState.status === 'error' && (
                <div className="space-y-3">
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="w-full"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={() => navigate('/login')}
                    variant="ghost"
                    className="w-full"
                  >
                    Go to Login
                  </Button>
                </div>
              )}

              {activationState.status === 'expired' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Your activation link has expired. You can request a new one.
                  </p>
                  <Button
                    onClick={handleResendActivation}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Resend Activation Email
                  </Button>
                  <Button
                    onClick={() => navigate('/login')}
                    variant="ghost"
                    className="w-full"
                  >
                    Go to Login
                  </Button>
                </div>
              )}

              {activationState.status === 'loading' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    This may take a few moments...
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="w-full text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Activate;
