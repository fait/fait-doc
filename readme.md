<h1 align="center">
	<img width="300" alt="fait-doc" src="logo.png">
</h1>
<h4 align="center">autogenerated makefile documentation in markdown</h4>

## Installation

fait-doc requires fait 1.0. install them both with:

```sh
npm install --save-dev fait fait-doc
```

fait will create a barebones `makefile`: to load fait-doc, add:

```makefile
$(call require, fait-doc)
```

## Usage

Run `make doc` to generate documentation from comment blocks in your makefiles.
Without any configuration, fait-doc reads comments from all included makefiles
that are *not* in `node_modules`. For an example of input and output, see
[index.mk](index.mk) and the [documentation](#documentation) section of this
readme.

Run `make help` to output generated documentation to the console.

## Documentation
### Rules

#### 📄 `doc` ⬅️ `$(fait-doc-output)` [🔗](index.mk#L30)

Generate fait-doc documentation when `make doc` is run

#### 📄 `help` ⬅️ `$(fait-doc-intermediate)` [🔗](index.mk#L37)

Output generated documentation as console help

#### 📄 `$(fait-doc-intermediate)` ⬅️ `$(fait-doc-input)` [🔗](index.mk#L41)

Generate documentation

#### 📄 `$(fait-doc-output)` ⬅️ `$$(fait-doc-header) generated.md $$(fait-doc-footer)` [🔗](index.mk#L49)

Concatenate generated documentation with header and footer and output

### Variables

#### 🚩 `$(fait-doc-header)` [🔗](index.mk#L2)

File to prepend to the generated documentation (none by default)

#### 🚩 `$(fait-doc-footer)` [🔗](index.mk#L4)

File to append to the generated documentation (none by default)

#### 🚩 `$(fait-doc-output)` [🔗](index.mk#L7)

Output filename, readme.md by default

#### 🚩 `$(fait-doc-intermediate)` [🔗](index.mk#L11)

Filename for intermediate (i.e. pre-concatenation) output file. By default this
is cleaned up afterwords, see `$(fait-doc-intermediate-cleanup)`

#### 🚩 `$(fait-doc-intermediate-cleanup)` [🔗](index.mk#L14)

Set to `no` to keep the non-concatenated generated documentation output file

#### 🚩 `$(fait-doc-print-all)` [🔗](index.mk#L18)

Set to `yes` to print help from all makefiles, even those in `node_modules`
(e.g. fait core and fait-doc themselves)

#### 🚩 `$(fait-doc-input)` [🔗](index.mk#L22)

Makefiles to parse for documentation. By default, we parse all makefiles from
`$(MAKEFILE_LIST)` that aren't in `node_modules`.


## licence
MIT
