CLD_HOST ?= y.cld.gov.au
CF_API   ?= https://api.system.$(CLD_HOST)
CF_ORG   ?= dta
CF_SPACE ?= notifications
CF       ?= cf

# Manage dev deploys can respond to STG env variable if they support
# feature branches
STG_PREFIX    ?= feat-
CIRCLE_BRANCH ?=
BRANCH  ?= $(CIRCLE_BRANCH)
FEATURE  = $(BRANCH:$(STG_PREFIX)%=%)

# export stg variable only if we are on a feature branch
ifneq ($(BRANCH), $(FEATURE))
	export STG ?= $(FEATURE)
endif

DIRS    = directory example board
TARGETS = setup build deploy clean
DEV_DIRS    = board
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

.PHONY: ok cf-login $(TARGETS) $(DEV_TARGETS) $(BUILDS)
