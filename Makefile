build: 
	@docker build --no-cache -t henriquezimermann/meu-site:latest .

push: build
	@docker push henriquezimermann/meu-site:latest

deploy: push
	@docker stack deploy -c docker-compose.yml meu-site

redeploy: deploy
	@docker service update --force meu-site_app

remove:
	@docker stack rm meu-site

docker:
	@docker compose -f 'docker-compose-teste.yml' up -d