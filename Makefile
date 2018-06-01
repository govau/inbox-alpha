DIRS    = directory example
TARGETS = setup build deploy clean
BUILDS  = $(TARGETS:%=\%.%)

all: build

$(TARGETS):
	$(MAKE) $(DIRS:%=%.$@)

$(BUILDS):
	$(MAKE) -C $* $(@:$*.%=%)

.PHONY: $(TARGETS) $(BUILDS)
