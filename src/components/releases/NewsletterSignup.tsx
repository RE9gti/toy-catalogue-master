
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, informe um e-mail válido para receber nossas novidades.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades em primeira mão.",
        variant: "default"
      });
    }, 1000);
  };
  
  return (
    <div className="mt-16 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4">
              <Mail size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Receba Novidades Primeiro</h2>
            <p className="text-muted-foreground mb-6">
              Inscreva-se na nossa newsletter para ser o primeiro a saber sobre lançamentos, 
              promoções exclusivas e dicas para presentear.
            </p>
          </div>
          
          <div className="md:w-1/2 w-full">
            {isSubscribed ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Obrigado por se inscrever!</h3>
                <p className="text-muted-foreground">
                  Você agora receberá nossas newsletters com as melhores ofertas e novidades.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Seu melhor e-mail" 
                    className="flex-1 px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={isSubmitting || !email} className="whitespace-nowrap">
                    {isSubmitting ? 'Inscrevendo...' : 'Inscrever-se'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Ao se inscrever, você concorda com nossa Política de Privacidade. 
                  Prometemos não enviar spam!
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
