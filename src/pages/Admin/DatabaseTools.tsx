
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Download, Upload, Database, FileArchive, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { backupDatabase, importDatabase, exportTableData } from '@/utils/dbBackup';

const DatabaseTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('backup');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [lastBackupDate, setLastBackupDate] = useState<string | null>(null);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [selectedTables, setSelectedTables] = useState<string[]>([
    'products', 'categories', 'subcategories', 'users', 'orders'
  ]);

  const tables = [
    { id: 'products', name: 'Produtos' },
    { id: 'categories', name: 'Categorias' },
    { id: 'subcategories', name: 'Subcategorias' },
    { id: 'users', name: 'Usuários' },
    { id: 'orders', name: 'Pedidos' },
    { id: 'order_items', name: 'Itens de Pedidos' },
    { id: 'reviews', name: 'Avaliações' },
    { id: 'addresses', name: 'Endereços' },
    { id: 'coupons', name: 'Cupons' },
  ];

  const handleBackup = async () => {
    try {
      setIsLoading(true);
      setProgress(0);
      
      // Progress simulation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);
      
      const result = await backupDatabase();
      
      clearInterval(interval);
      setProgress(100);
      
      if (result.success) {
        setLastBackupDate(new Date().toLocaleString());
        toast({
          title: "Backup realizado com sucesso",
          description: `O backup foi salvo como ${result.filename}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao realizar backup",
          description: result.error || "Ocorreu um erro inesperado",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao realizar backup",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      toast({
        variant: "destructive",
        title: "Nenhum arquivo selecionado",
        description: "Por favor, selecione um arquivo SQL para importar",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setProgress(0);
      
      // Progress simulation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 200);
      
      const result = await importDatabase(importFile);
      
      clearInterval(interval);
      setProgress(100);
      
      if (result.success) {
        toast({
          title: "Importação concluída com sucesso",
          description: "Os dados foram importados para o banco de dados",
        });
        setImportFile(null);
      } else {
        toast({
          variant: "destructive",
          title: "Erro na importação",
          description: result.error || "Ocorreu um erro inesperado",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na importação",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const handleExport = async () => {
    if (selectedTables.length === 0) {
      toast({
        variant: "destructive",
        title: "Nenhuma tabela selecionada",
        description: "Por favor, selecione pelo menos uma tabela para exportar",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      setProgress(0);
      
      // Progress simulation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);
      
      const result = await exportTableData(selectedTables);
      
      clearInterval(interval);
      setProgress(100);
      
      if (result.success) {
        toast({
          title: "Exportação concluída com sucesso",
          description: `Os dados foram exportados para ${result.filename}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro na exportação",
          description: result.error || "Ocorreu um erro inesperado",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na exportação",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const toggleTableSelection = (tableId: string) => {
    setSelectedTables(prev => 
      prev.includes(tableId) 
        ? prev.filter(id => id !== tableId) 
        : [...prev, tableId]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.sql')) {
        setImportFile(file);
      } else {
        toast({
          variant: "destructive",
          title: "Formato inválido",
          description: "Por favor, selecione um arquivo SQL válido",
        });
      }
    }
  };

  return (
    <AdminLayout title="Ferramentas de Banco de Dados">
      <div className="grid gap-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>
            As operações de importação e backup do banco de dados são sensíveis e podem afetar todos os dados do sistema.
            Realize essas operações com cautela e sempre faça um backup antes de importar dados.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="backup" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="import">Importar</TabsTrigger>
            <TabsTrigger value="export">Exportar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle>Backup do Banco de Dados</CardTitle>
                <CardDescription>
                  Crie um backup completo do banco de dados. O arquivo será gerado em formato SQL e disponibilizado para download.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lastBackupDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Último backup: {lastBackupDate}</span>
                    </div>
                  )}
                  
                  {isLoading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleBackup} 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Database className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? "Gerando backup..." : "Criar Backup"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="import">
            <Card>
              <CardHeader>
                <CardTitle>Importar Dados</CardTitle>
                <CardDescription>
                  Importe dados de um arquivo SQL para o banco de dados. Esta operação pode substituir dados existentes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="sql-file" className="text-sm font-medium mb-2">
                      Arquivo SQL
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        id="sql-file"
                        type="file"
                        accept=".sql"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isLoading}
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('sql-file')?.click()}
                        disabled={isLoading}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Selecionar Arquivo
                      </Button>
                      {importFile && (
                        <Badge variant="outline" className="ml-2">
                          {importFile.name}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {isLoading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleImport} 
                  disabled={isLoading || !importFile}
                  className="w-full"
                >
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? "Importando..." : "Importar Dados"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="export">
            <Card>
              <CardHeader>
                <CardTitle>Exportar Dados</CardTitle>
                <CardDescription>
                  Exporte dados selecionados em formato SQL ou CSV. Escolha as tabelas que deseja exportar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Selecione as tabelas</h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {tables.map(table => (
                        <div key={table.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`table-${table.id}`}
                            checked={selectedTables.includes(table.id)}
                            onChange={() => toggleTableSelection(table.id)}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={`table-${table.id}`} className="text-sm">
                            {table.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {isLoading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progresso</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleExport} 
                  disabled={isLoading || selectedTables.length === 0}
                  className="w-full"
                >
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? "Exportando..." : "Exportar Dados"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default DatabaseTools;
