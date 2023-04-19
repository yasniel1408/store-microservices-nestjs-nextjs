update-common:
	cd common && npm run pub;

update-services:
	cd products && npm install @store-microservice-nestjs/common@latest;
	cd ..;
	cd users && npm install @store-microservice-nestjs/common@latest;
	cd ..;


update-common-and-services:
	make update-common;
	make update-services;

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
