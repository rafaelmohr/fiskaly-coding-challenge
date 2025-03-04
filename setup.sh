#!/bin/bash

PG_USER="postgres"

docker compose up -d

sleep 5

docker compose exec -d postgres psql -U "$PG_USER" -f /postgres/createTable.sql
docker compose exec -d postgres psql -U "$PG_USER" -f /postgres/importCustomers.sql
