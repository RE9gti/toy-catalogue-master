
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ = () => {
  const faqItems: FAQItem[] = [
    {
      q: "Como posso rastrear meu pedido?",
      a: "Você pode rastrear seu pedido acessando a área 'Meus Pedidos' no seu perfil e clicando em 'Rastrear' no pedido desejado."
    },
    {
      q: "Qual é o prazo de entrega?",
      a: "O prazo de entrega varia de acordo com a sua localização, mas geralmente é entre 3 e 10 dias úteis."
    },
    {
      q: "Como funciona a troca ou devolução?",
      a: "Aceitamos trocas e devoluções em até 7 dias após o recebimento do produto. Entre em contato conosco para iniciar o processo."
    },
    {
      q: "Vocês oferecem frete grátis?",
      a: "Sim! Oferecemos frete grátis para compras acima de R$ 150,00 para todo o Brasil."
    }
  ];

  return (
    <div className="mt-12 bg-muted/30 rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqItems.map((item, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-lg">{item.q}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
