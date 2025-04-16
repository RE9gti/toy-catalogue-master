
#!/bin/bash

# Script para fazer backup do banco de dados do container MySQL

echo "Iniciando backup do banco de dados"

# Verificar se o container está rodando
CONTAINER_RUNNING=$(docker ps | grep toy_store_mysql | wc -l)

if [ "$CONTAINER_RUNNING" -eq "0" ]; then
    echo "O container do MySQL não está rodando!"
    exit 1
fi

# Criar diretório de backups se não existir
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# Nome do arquivo de backup com timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/toy_store_backup_$TIMESTAMP.sql"

echo "Criando backup para: $BACKUP_FILE"
docker exec toy_store_mysql mysqldump -u re9 -prg51gti66 toy_store > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "Backup concluído com sucesso!"
    echo "Arquivo salvo em: $BACKUP_FILE"
    
    # Criar versão comprimida
    gzip -f "$BACKUP_FILE"
    echo "Backup comprimido: $BACKUP_FILE.gz"
else
    echo "Erro ao criar backup!"
fi
