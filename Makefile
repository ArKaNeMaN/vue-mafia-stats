docker-build:
	npm i
	npm run build
	docker build -t vue-mafia-stats $(ARGS) .

docker-run:
	docker run -d -p 0.0.0.0:4001:8080 --name vue-mafia-stats vue-mafia-stats
