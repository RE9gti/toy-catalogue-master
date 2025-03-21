
import React from 'react';
import { Button } from '@/components/ui/button';

type Credentials = {
  email: string;
  password: string;
};

type QuickLoginButtonsProps = {
  adminCredentials: Credentials;
  customerCredentials: Credentials;
  onSelectCredentials: (credentials: Credentials) => void;
};

export const QuickLoginButtons = ({
  adminCredentials,
  customerCredentials,
  onSelectCredentials,
}: QuickLoginButtonsProps) => {
  return (
    <>
      <div className="relative flex items-center justify-center mt-6 mb-4">
        <div className="absolute w-full border-t"></div>
        <div className="relative px-4 bg-card text-xs text-muted-foreground">
          Ou entre com
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => onSelectCredentials(adminCredentials)}
        >
          Conta Admin
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => onSelectCredentials(customerCredentials)}
        >
          Conta Cliente
        </Button>
      </div>
    </>
  );
};
