YARN ?= yarn
ENVS  = dev stg prd
HOSTS = inbox-prisma inbox-msg
GRAPHQL_HOST ?= http://localhost:4466

export GRAPHQL_HOST

start:
	docker-compose up

migrate:
	$(YARN) run prisma deploy

setup:
	$(YARN) install
	
build:

deploy: migrate

$(ENVS:%=deploy-%): deploy-%:
	GRAPHQL_HOST='$(GRAPHQL_HOST)/$*' $(MAKE) deploy

clean:

.PHONY: start migrate setup build deploy clean
