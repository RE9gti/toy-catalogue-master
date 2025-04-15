
import React from 'react';
import { Button } from '@/components/ui/button';

const NewsletterSignup = () => {
  return (
    <div className="mt-16 bg-muted/50 rounded-xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Receba Novidades Primeiro</h2>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Inscreva-se na nossa newsletter para ser o primeiro a saber sobre lançamentos, promoções exclusivas e dicas para presentear.
      </p>
      <div className="flex max-w-md mx-auto gap-2">
        <input 
          type="email" 
          placeholder="Seu melhor e-mail" 
          className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary focus:outline-none"
        />
        <Button>Inscrever</Button>
      </div>
    </div>
  );
};

export default NewsletterSignup;
