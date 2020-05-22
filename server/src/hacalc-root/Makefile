
BUILDTGT = "hacalc/.stack-work"
EXEPATH = $(shell find hacalc -name hacalc-exe | head -n 1)
EXETGT = ./hacalc-exe

exe: $(EXETGT)

$(EXETGT): build
	ln -sf "$(EXEPATH)" $(EXETGT)

build: $(BUILDTGT)

$(BUILDTGT):
	git submodule update --init --recursive
	cd hacalc && stack build

