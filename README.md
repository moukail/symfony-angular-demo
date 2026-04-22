Symfony
=======
```bash
#### Create project
podman run --rm -v .:/app:z docker.io/library/composer:2.9.7 composer create-project symfony/skeleton:"8.0.*" ./backend
#### Install dependencies
podman run --rm -v ./backend:/app docker.io/library/composer:2.9.7 composer require webapp symfony/orm-pack symfony/serializer-pack lexik/jwt-authentication-bundle nelmio/cors-bundle
#### Generate keypair
podman compose exec backend symfony console lexik:jwt:generate-keypair --skip-if-exists
#### Run tests
podman compose exec backend symfony console d:m:m --no-interaction
```

Angular
=======
```bash
#### Create project
podman run --rm -w /app -v .:/app:z docker.io/library/node:25.9-alpine3.23 npm init @angular@latest frontend -- --skip-git
#### Install dependencies
podman run --rm -w /app -v ./frontend:/app docker.io/library/node:25.9-alpine3.23 npm install @angular/material @ngrx/store @ngrx/effects @ngrx/entity @ngrx/operators

#### Generate dashboard
podman run --rm -w /app -v ./frontend:/app docker.io/library/node:25.9-alpine3.23 npm run ng generate @angular/material:dashboard dashboard
#### Run tests
podman run --rm -w /app -v ./frontend:/app docker.io/library/node:25.9-alpine3.23 npm run test
```

Podman
======
```bash
systemctl --user restart podman.socket
DOCKER_HOST=unix:///run/user/1000/podman/podman.sock
podman compose up -d --build
#### Add material
podman compose exec -it frontend ng add @angular/material

podman compose exec -it backend bash
podman compose exec backend symfony console doctrine:database:create --if-not-exists
```