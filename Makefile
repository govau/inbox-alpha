CLD_HOST ?= y.cld.gov.au
CF_API   ?= https://api.system.$(CLD_HOST)
CF_ORG   ?= dta
CF_SPACE ?= notifications
CF       ?= cf

DIRS    = directory example
TARGETS = setup build deploy clean
BUILDS  = $(TARGETS:%=\%.%)

all: build

$(TARGETS):
	$(MAKE) $(DIRS:%=%.$@)

$(BUILDS):
	$(MAKE) -C $* $(@:$*.%=%)
 
cf-login:
	@$(CF) login\
		-a "${CF_API}"\
		-u "${CF_USERNAME}"\
		-p "${CF_PASSWORD}"\
		-o "${CF_ORG}"\
		-s "${CF_SPACE}"

.PHONY: cf-login $(TARGETS) $(BUILDS)
