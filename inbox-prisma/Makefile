YARN ?= yarn
GRAPHQL_HOST ?= 'http://localhost:4466'

start:
	docker-compose up

migrate:
	GRAPHQL_HOST=$(GRAPHQL_HOST) $(YARN) run prisma deploy

setup:
	$(YARN) install
	
build:

deploy: migrate

clean:


.PHONY: start migrate setup build deploy clean
