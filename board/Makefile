YARN ?= yarn
NODE ?= node
CF   ?= cf
APP  ?= inbox-msg
STG  ?= dev
CONF  = src/config/index.json
SRC   = $(CONF) $(shell find src -type f)
PUB   = $(shell find public -type f)

PRISMA_HOST    ?=
PRISMA_SERVICE ?= $(APP)
PRISMA_STAGE   ?= $(STG)

ifdef PRISMA_HOST
	GRAPHQL_HOST ?= $(PRISMA_HOST)/$(PRISMA_SERVICE)/$(PRISMA_STAGE)
else
	GRAPHQL_HOST ?= http://localhost:4466
endif

export GRAPHQL_HOST

all: build

yarn.lock node_modules: package.json
	$(YARN) install

build/index.html: public/index.html $(SRC) $(PUB)
	$(YARN) build

setup: yarn.lock node_modules

$(CONF):
	@mkdir -p $(@D)
	$(NODE) create-config.js > $@

build: build/index.html

manifest-%.yml:
	echo "version: $*" > $@

migrate:
	$(YARN) run prisma deploy

deploy: manifest-vars.yml build migrate
	$(CF) zero-downtime-push $(APP) -f manifest.yml --vars-file $<

deploy-dev: manifest-$(STG).yml build migrate
	$(CF) zero-downtime-push $(APP)-$(STG) -f manifest.yml --vars-file $<

clean:
	-rm -r build

start: public/index.html $(SRC) $(PUB)
	$(YARN) start

start-backend:
	docker-compose up

.PHONY: deploy clean start sure
