include node_modules/fait/index.mk

$(call require, ./)
fait-doc-header = input/header.md

main :: doc
