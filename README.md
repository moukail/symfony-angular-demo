Symfony
=======
```bash
#### Create project
podman run --rm -v .:/app:z docker.io/library/composer:2.9.7 composer create-project symfony/skeleton:"8.0.*" ./backend
#### Install dependencies
podman run --rm -v ./backend:/app docker.io/library/composer:2.9.7 composer require webapp symfony/orm-pack symfony/serializer-pack gesdinet/jwt-refresh-token-bundle nelmio/cors-bundle symfony/password-hasher

podman compose exec backend composer require --dev doctrine/doctrine-fixtures-bundle
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
podman compose exec frontend npm install --save-dev @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter wdio-chromedriver-service ts-node typescript @types/mocha

#### Generate dashboard
podman compose exec frontend npm run ng generate @angular/material:dashboard dashboard
#### Run tests
podman compose exec frontend npm run test
#### Run e2e tests
podman compose exec frontend ng add @playwright/test
podman compose exec frontend apk add chromium
podman compose exec frontend npx playwright test
podman compose exec frontend npm run e2e
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
podman compose exec backend symfony console make:controller --no-template Login

podman compose exec backend symfony console doctrine:query:dql "SELECT u FROM App\Entity\User u"

podman build -t docker.io/moukail/symfony-angular-demo-backend:latest -f ./docker/backend/Containerfile ./backend
podman build -t docker.io/moukail/symfony-angular-demo-frontend:latest -f ./docker/frontend/Containerfile ./frontend

podman push docker.io/moukail/symfony-angular-demo-backend:latest
podman push docker.io/moukail/symfony-angular-demo-frontend:latest

podman run --rm -p 8000:80 docker.io/moukail/symfony-angular-demo-backend:latest
podman run --rm -p 8001:80 docker.io/moukail/symfony-angular-demo-frontend:latest
```

Openshift
=========
```bash
#### Template
oc get template -n openshift

oc process -f kubernetes/template.yml --parameters
oc process -f kubernetes/template.yml -p MYSQL_DATABASE=mydemo -p MYSQL_ROOT_PASSWORD=pa55w0rd | oc apply -f -

oc new-app --file kubernetes/template.yml -p MYSQL_DATABASE=mydemo -p MYSQL_ROOT_PASSWORD=pa55w0rd

oc exec pods/backend-57fbdc664d-f7d2h -- bin/console
oc exec pod/backend-57fbdc664d-7p9td -- bin/console app:create-admin admin@moukafih.nl password

oc expose service/frontend
curl -i http://frontend-default.apps-crc.testing
```

Curl
====
```bash
curl -i -X POST -H "Content-Type: application/json" \
  http://localhost:8001/api/login_check \
  -d '{"email":"user@example.com","password":"pa55w0rd"}'
```