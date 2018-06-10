YARN ?= yarn
NODE ?= node
CF   ?= cf
APP  ?= inbox-msg
CONF  = src/config/index.json
SRC   = $(CONF) $(shell find src -type f)
PUB   = $(shell find public -type f)
GRAPHQL_HOST ?= 'http://localhost:4466'

all: build

yarn.lock node_modules: package.json
	$(YARN) install

build/index.html: public/index.html $(SRC) $(PUB)
	$(YARN) build

setup: yarn.lock node_modules

src/config/index.json:
	@mkdir -p $(@D)
	GRAPHQL_HOST=$(GRAPHQL_HOST) $(NODE) create-config.js > $@

build: build/index.html

deploy: build
	$(CF) push $(APP)

clean:
	-rm -r build

start:
	$(YARN) start

.PHONY: deploy clean start
