YARN ?= yarn
CF   ?= cf
APP  ?= inbox-directory
SRC   = $(shell find src -type f)
PUB   = $(shell find public -type f)

all: build

yarn.lock node_modules: package.json
	$(YARN) install

build/index.html: public/index.html $(SRC) $(PUB)
	$(YARN) build

setup: yarn.lock node_modules

build: build/index.html

deploy: build
	$(CF) push $(APP)

clean:
	-rm -r build

start:
	$(YARN) start

.PHONY: deploy clean start
