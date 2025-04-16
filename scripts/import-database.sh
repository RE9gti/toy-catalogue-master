
#!/bin/bash

# Script para importar o banco de dados para o container MySQL

echo "Iniciando script de importação do banco de dados"

# Verificar se o container está rodando
CONTAINER_RUNNING=$(docker ps | grep toy_store_mysql | wc -l)

if [ "$CONTAINER_RUNNING" -eq "0" ]; then
    echo "O container do MySQL não está rodando!"
    echo "Iniciando containers com docker-compose..."
    docker-compose up -d
    
    echo "Esperando o MySQL inicializar..."
    sleep 20
fi

# Caminho para o arquivo SQL
SQL_FILE="./docs/database-schema.sql"

if [ ! -f "$SQL_FILE" ]; then
    echo "Arquivo de schema não encontrado: $SQL_FILE"
    exit 1
fi

echo "Importando schema do banco de dados..."
docker exec -i toy_store_mysql mysql -u re9 -prg51gti66 toy_store < $SQL_FILE

echo "Verificando se a importação foi bem-sucedida..."
TABLES=$(docker exec -i toy_store_mysql mysql -u re9 -prg51gti66 -e "USE toy_store; SHOW TABLES;" | grep -v "Tables_in")

if [ -z "$TABLES" ]; then
    echo "Erro: Nenhuma tabela foi criada!"
    exit 1
else
    echo "Importação concluída com sucesso! Tabelas criadas:"
    echo "$TABLES"
fi

echo "Banco de dados pronto para uso!"
