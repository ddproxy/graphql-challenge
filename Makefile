.PHONY: build
build:
	docker-compose build

.PHONY: install
install:
	npm install

.PHONY: up
up:
	docker-compose up --abort-on-container-exit

.PHONY: down
down:
	docker-compose down

.PHONY: clean
clean: stop
	docker-compose rm -fsv
	docker volume prune -f

.PHONY: stop
stop:
	docker-compose stop