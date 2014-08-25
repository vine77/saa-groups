all: build

build:
	ember build --environment=production
	rm -rf ../public/saa-groups
	mv dist ../public/saa-groups
	rm -rf ../public/saa-groups/api

server:
	ember server --watcher=polling

serve:
	ember serve --watcher=polling

.PHONY: server
