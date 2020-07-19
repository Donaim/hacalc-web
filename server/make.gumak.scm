
(define-job (all)
  (depend (node) (postgres)))

(define-job (run-server)
  (depend (all))
  (sh "cd src && npm run start"))

(define-job (node)
  (sh "cd src && npm install"))

(define-job (inherit)
  (system (getenv "SHELL")))

(define-env PGDATA "build/pgdata-dir")
(define-env PGDATABASE "hacalcweb")
(define-env SCHEMA "hacalcschema")
(define-env TABLE "share")

(define-job (postgres)
  (depend (create-table)))

(define-job (create-table)
  (depend (create-database))
  (sh (stringf "echo 'CREATE SCHEMA ~a' | psql || true" (SCHEMA)))
  (sh (stringf "echo 'CREATE TABLE ~a.~a(id TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL)' | psql || true" (SCHEMA) (TABLE))))

(define-job (create-database)
  (depend (start-server))
  (unless (postgres-db-exists?)
    (sh "createdb --no-password")))

(define-job (start-server)
  (unless (postgres-server-running?)
    (depend (init-database))
    (sh "pg_ctl start")))

(define-file-job (PGDATA) (init-database)
  (depend (mkdir-job (path-parent-directory (PGDATA))))
  (sh "initdb"))

(define-job (postgres-stop)
  (sh "pg_ctl stop || true"))

(define-job (postgres-delete)
  (wait (postgres-stop))
  (sh (stringf "rm -rf ~a" (PGDATA))))

(define (postgres-db-exists?)
  (shell-cmd-to-bool "echo | psql"))

(define (postgres-server-running?)
  (shell-cmd-to-bool "pg_ctl status"))

(define (shell-cmd-to-bool cmd)
  (let-values
      (((response error) (catch-any#as-pair (sh cmd))))
    (if error #f #t)))

