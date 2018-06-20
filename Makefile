CLD_HOST ?= y.cld.gov.au
CF_API   ?= https://api.system.$(CLD_HOST)
CF_ORG   ?= dta
CF_SPACE ?= notifications
CF       ?= cf

DIRS    = directory example board inbox-prisma
TARGETS = setup build deploy clean
DEV_DIRS    = board inbox-prisma
DEV_TARGETS = deploy-dev

targets = $(TARGETS) $(DEV_TARGETS)
BUILDS  = $(targets:%=\%.%)

$(DEV_TARGETS):
	$(MAKE) $(DEV_DIRS:%=%.$@)

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

.PHONY: cf-login $(TARGETS) $(DEV_TARGETS) $(BUILDS)
