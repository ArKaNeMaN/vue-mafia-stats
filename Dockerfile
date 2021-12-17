FROM	node:alpine

COPY	./dist/* ./
RUN	npm instal -g serve

CMD	["serve", ".", "-p", "8080", "-s"]
