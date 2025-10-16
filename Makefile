build: 
	@docker build -t henriqzimer08/meu-site:latest .

push: build
	@docker push henriqzimer08/meu-site:latest

deploy: push
	@docker stack deploy -c docker-compose.yml meu-site

redeploy: deploy
	@docker service update --force meu-site_app

remove:
	@docker stack rm meu-site