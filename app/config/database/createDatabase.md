docker run --network=pg --name pg -idt -p 5433:5433 \
 -e "POSTGRES_PASSWORD=controladoria" \
 -e "POSTGRES_USER=controladoria" \
 -e "POSTGRES_DB=controladoria"\
 postgres:alpine

docker run --network=pg --name pgadmin -idt -p 8080:80 \
 -e "PGADMIN_DEFAULT_EMAIL=admin@admin.com" \
 -e "PGADMIN_DEFAULT_PASSWORD=admin" \
  dpage/pgadmin4


https://imasters.com.br/banco-de-dados/postgresql-docker-executando-uma-instancia-e-o-pgadmin-4-partir-de-containers

