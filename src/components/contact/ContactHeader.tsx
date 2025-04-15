
import React from 'react';
import { Mail } from 'lucide-react';

const ContactHeader = () => {
  return (
    <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 to-accent/5 p-8">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl font-bold mb-3">Entre em Contato</h1>
        <p className="text-muted-foreground">
          Estamos aqui para ajudar! Envie-nos suas dúvidas, sugestões ou pedidos especiais 
          através do formulário abaixo, ou utilize qualquer outro canal de atendimento.
        </p>
      </div>
      <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
        <Mail size={240} />
      </div>
    </div>
  );
};

export default ContactHeader;
