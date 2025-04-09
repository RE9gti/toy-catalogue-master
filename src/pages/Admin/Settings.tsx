
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Toy Store',
    storeDescription: 'Sua loja online de brinquedos',
    email: 'contato@toystore.com',
    phone: '(11) 99999-9999',
    address: 'Rua dos Brinquedos, 123 - São Paulo, SP',
    socialMedia: {
      facebook: 'https://facebook.com/toystore',
      instagram: 'https://instagram.com/toystore',
      twitter: 'https://twitter.com/toystore'
    }
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'no-reply@toystore.com',
    smtpPassword: '••••••••••••',
    senderName: 'Toy Store',
    senderEmail: 'no-reply@toystore.com',
    enableOrderConfirmation: true,
    enableShippingUpdates: true,
    enableNewsletter: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    currency: 'BRL',
    currencySymbol: 'R$',
    acceptCreditCard: true,
    acceptBoleto: true,
    acceptPix: true
  });

  const handleSaveStoreSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações da loja foram atualizadas com sucesso.",
    });
  };

  const handleSaveEmailSettings = () => {
    toast({
      title: "Configurações de e-mail salvas",
      description: "As configurações de e-mail foram atualizadas com sucesso.",
    });
  };

  const handleSavePaymentSettings = () => {
    toast({
      title: "Configurações de pagamento salvas",
      description: "As configurações de pagamento foram atualizadas com sucesso.",
    });
  };

  return (
    <AdminLayout title="Configurações">
      <Tabs defaultValue="store">
        <TabsList className="mb-6">
          <TabsTrigger value="store">Loja</TabsTrigger>
          <TabsTrigger value="email">E-mail</TabsTrigger>
          <TabsTrigger value="payment">Pagamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Loja</CardTitle>
              <CardDescription>Gerencie as informações básicas da sua loja.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveStoreSettings();
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Nome da Loja</Label>
                    <Input 
                      id="storeName" 
                      value={storeSettings.storeName}
                      onChange={(e) => setStoreSettings({
                        ...storeSettings,
                        storeName: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={storeSettings.email}
                      onChange={(e) => setStoreSettings({
                        ...storeSettings,
                        email: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeDescription">Descrição da Loja</Label>
                  <Textarea 
                    id="storeDescription" 
                    value={storeSettings.storeDescription}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      storeDescription: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      phone: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input 
                    id="address" 
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({
                      ...storeSettings,
                      address: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Redes Sociais</h3>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input 
                      id="facebook" 
                      value={storeSettings.socialMedia.facebook}
                      onChange={(e) => setStoreSettings({
                        ...storeSettings,
                        socialMedia: {
                          ...storeSettings.socialMedia,
                          facebook: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input 
                      id="instagram" 
                      value={storeSettings.socialMedia.instagram}
                      onChange={(e) => setStoreSettings({
                        ...storeSettings,
                        socialMedia: {
                          ...storeSettings.socialMedia,
                          instagram: e.target.value
                        }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input 
                      id="twitter" 
                      value={storeSettings.socialMedia.twitter}
                      onChange={(e) => setStoreSettings({
                        ...storeSettings,
                        socialMedia: {
                          ...storeSettings.socialMedia,
                          twitter: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>
                
                <Button type="submit">Salvar Configurações</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de E-mail</CardTitle>
              <CardDescription>Configure as opções de envio de e-mail da sua loja.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveEmailSettings();
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">Servidor SMTP</Label>
                    <Input 
                      id="smtpServer" 
                      value={emailSettings.smtpServer}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        smtpServer: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">Porta SMTP</Label>
                    <Input 
                      id="smtpPort" 
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        smtpPort: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">Usuário SMTP</Label>
                    <Input 
                      id="smtpUsername" 
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        smtpUsername: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Senha SMTP</Label>
                    <Input 
                      id="smtpPassword" 
                      type="password" 
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        smtpPassword: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Nome do Remetente</Label>
                    <Input 
                      id="senderName" 
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        senderName: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">E-mail do Remetente</Label>
                    <Input 
                      id="senderEmail" 
                      value={emailSettings.senderEmail}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        senderEmail: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notificações</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableOrderConfirmation">Confirmação de Pedido</Label>
                    <Switch 
                      id="enableOrderConfirmation" 
                      checked={emailSettings.enableOrderConfirmation}
                      onCheckedChange={(checked) => setEmailSettings({
                        ...emailSettings,
                        enableOrderConfirmation: checked
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableShippingUpdates">Atualizações de Envio</Label>
                    <Switch 
                      id="enableShippingUpdates" 
                      checked={emailSettings.enableShippingUpdates}
                      onCheckedChange={(checked) => setEmailSettings({
                        ...emailSettings,
                        enableShippingUpdates: checked
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableNewsletter">Newsletter</Label>
                    <Switch 
                      id="enableNewsletter" 
                      checked={emailSettings.enableNewsletter}
                      onCheckedChange={(checked) => setEmailSettings({
                        ...emailSettings,
                        enableNewsletter: checked
                      })}
                    />
                  </div>
                </div>
                
                <Button type="submit">Salvar Configurações</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
              <CardDescription>Configure as opções de pagamento da sua loja.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSavePaymentSettings();
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Input 
                      id="currency" 
                      value={paymentSettings.currency}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        currency: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currencySymbol">Símbolo da Moeda</Label>
                    <Input 
                      id="currencySymbol" 
                      value={paymentSettings.currencySymbol}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        currencySymbol: e.target.value
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Métodos de Pagamento</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="acceptCreditCard">Cartão de Crédito</Label>
                    <Switch 
                      id="acceptCreditCard" 
                      checked={paymentSettings.acceptCreditCard}
                      onCheckedChange={(checked) => setPaymentSettings({
                        ...paymentSettings,
                        acceptCreditCard: checked
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="acceptBoleto">Boleto</Label>
                    <Switch 
                      id="acceptBoleto" 
                      checked={paymentSettings.acceptBoleto}
                      onCheckedChange={(checked) => setPaymentSettings({
                        ...paymentSettings,
                        acceptBoleto: checked
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="acceptPix">Pix</Label>
                    <Switch 
                      id="acceptPix" 
                      checked={paymentSettings.acceptPix}
                      onCheckedChange={(checked) => setPaymentSettings({
                        ...paymentSettings,
                        acceptPix: checked
                      })}
                    />
                  </div>
                </div>
                
                <Button type="submit">Salvar Configurações</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Settings;
