
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MapPin, Clock, Info } from 'lucide-react';

const ContactInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="mr-2 text-primary" size={20} />
          Informações de Contato
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Phone className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-medium">Telefones</h3>
            <p className="text-muted-foreground">(11) 9999-9999</p>
            <p className="text-muted-foreground">(11) 8888-8888</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Mail className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-medium">E-mail</h3>
            <p className="text-muted-foreground">contato@brinquedos.com</p>
            <p className="text-muted-foreground">suporte@brinquedos.com</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <MapPin className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-medium">Endereço</h3>
            <p className="text-muted-foreground">
              Av. Paulista, 1000 - Bela Vista
            </p>
            <p className="text-muted-foreground">
              São Paulo - SP, 01310-100
            </p>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Clock className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-medium">Horário de Atendimento</h3>
            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Segunda a Sexta:</span>
                <span>08:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado:</span>
                <span>09:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo e Feriados:</span>
                <span>Fechado</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
