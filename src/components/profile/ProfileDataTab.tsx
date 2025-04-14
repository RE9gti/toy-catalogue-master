
import React, { useState } from 'react';
import { User } from '@/types/user';
import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit } from 'lucide-react';

const ProfileDataTab = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileData);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Meus Dados</CardTitle>
            <CardDescription>Gerencie suas informações pessoais</CardDescription>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome Completo</label>
                <Input 
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Seu nome completo"
                  className="border-2 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail</label>
                <Input 
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="seu-email@exemplo.com"
                  className="border-2 focus:border-primary"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Telefone</label>
                <Input 
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="(00) 00000-0000"
                  className="border-2 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CPF</label>
                <Input 
                  disabled 
                  value="000.000.000-00" 
                  placeholder="CPF" 
                  className="bg-gray-50"
                />
                <p className="text-xs text-muted-foreground">O CPF não pode ser alterado.</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Endereço Principal</label>
              <Textarea 
                name="address"
                value={profileData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Seu endereço completo"
                className="border-2 focus:border-primary"
              />
            </div>
          </div>
          
          {isEditing && (
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Salvar Alterações
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileDataTab;
