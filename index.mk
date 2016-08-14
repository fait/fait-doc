# File to prepend to the generated documentation (none by default)
fait-doc-header =
# File to append to the generated documentation (none by default)
fait-doc-footer =

# Output filename, readme.md by default
fait-doc-output = readme.md

# Filename for intermediate (i.e. pre-concatenation) output file. By default this
# is cleaned up afterwords, see `$(fait-doc-intermediate-cleanup)`
fait-doc-intermediate = generated.md

# Set to `no` to keep the non-concatenated generated documentation output file
fait-doc-intermediate-cleanup = yes

# Set to `yes` to print help from all makefiles, even those in `node_modules`
# (e.g. fait core and fait-doc themselves)
fait-doc-print-all = no

# Makefiles to parse for documentation. By default, we parse all makefiles from
# `$(MAKEFILE_LIST)` that aren't in `node_modules`.
fait-doc-input = $(if $(findstring yes,$(fait-doc-print-all)),\
	$(MAKEFILE_LIST),\
	$(call filter-out-match,node_modules, $(MAKEFILE_LIST)))

~fait-doc-bin = $(~module-dir)bin.js
~fait-markdown-bin = $(~module-dir)markdown.js

# Generate fait-doc documentation when `make doc` is run
doc :: $(fait-doc-output)

ifeq ($(MAKECMDGOALS),help)
MAKEFLAGS += --silent # help target runs silently
endif

# Output generated documentation as console help
help :: $(fait-doc-intermediate)
	@$(~fait-markdown-bin) $<

# Generate documentation
$(fait-doc-intermediate): $(fait-doc-input)
	$(~fait-doc-bin) $^ > $@

ifeq ($(fait-doc-intermediate-cleanup),yes)
.INTERMEDIATE: $(fait-doc-intermediate) # clean up generated file once it's been concatenated
endif

# Concatenate generated documentation with header and footer and output
$(fait-doc-output): $$(fait-doc-header) generated.md $$(fait-doc-footer)
	cat $^ > $@
