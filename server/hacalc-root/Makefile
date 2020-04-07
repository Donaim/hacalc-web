
BUILDTGT = "hacalc/.stack-work"
EXEPATH = $(shell find hacalc -name hacalc-exe | head -n 1)
EXETGT = ./hacalc-exe

exe: $(EXETGT)

$(EXETGT): build
	ln -s "$(EXEPATH)" $(EXETGT)

build: $(BUILDTGT)

$(BUILDTGT):
	cd hacalc
	git submodule update --init --recursive
	stack build

.ONESHELL: $(BUILDTGT)
