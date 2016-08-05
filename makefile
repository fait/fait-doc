include node_modules/fait/index.mk

$(call require, ./)
fait-doc-header = input/header.md
fait-doc-footer = input/footer.md

main :: doc
