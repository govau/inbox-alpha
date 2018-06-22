CLD_HOST ?= y.cld.gov.au
CF_API   ?= https://api.system.$(CLD_HOST)
CF_ORG   ?= dta
CF_SPACE ?= notifications
CF       ?= cf

CIRCLE_BRANCH ?=
BRANCH  = $(CIRCLE_BRANCH)
FBRANCH = $(BRANCH:feat-%=%)

ifneq ($(BRANCH), $(FBRANCH))
	STG ?= $(FBRANCH)
else
	STG ?=
endif

export STG

DIRS    = directory example board
TARGETS = setup build deploy clean
DEV_DIRS    = board
DEV_TARGETS = deploy-dev

targets = $(TARGETS) $(DEV_TARGETS)
BUILDS  = $(targets:%=\%.%)

$(DEV_TARGETS):
	echo $(STG)
	echo $(BRANCH)
	echo $(CIRCLE_BRANCH)
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

.PHONY: ok cf-login $(TARGETS) $(DEV_TARGETS) $(BUILDS)
