
PGDATA = ./pgdata-dir


start_server: create_database
	PGDATA=$(PGDATA) pg_ctl start

.PHONY: start_server

create_database: $(PGDATA)

$(PGDATA):
	mkdir -p $(PGDATA)
	PGDATA=$(PGDATA) initdb

.PHONY: create_database

