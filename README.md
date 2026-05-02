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

oc exec deployment.apps/backend -- bin/console app:create-admin admin@moukafih.nl password

oc expose service/frontend
curl -i http://frontend-default.apps-crc.testing

#### Delete resources
oc delete cm backend-nginx-config
oc delete deployment backend frontend
oc delete statefulset database
oc delete svc database backend frontend
oc delete route backend frontend
oc delete job database-migrations
```

Helm
====
```bash
#### Create helm
helm create helm
helm template helm --debug

#### Install helm
helm install -f helm/values.yaml mydemo ./helm  \
  --set database.rootPassword=SecurePassword123! \
  --set database.databaseName=mydemo
helm install -f helm/values.yaml ./helm --generate-name
helm ls
helm history mydemo

#### Upgrade helm
helm upgrade --install mydemo ./helm --set database.rootPassword=SecurePassword123!,database.databaseName=mydemo

#### Delete helm
helm uninstall -n default mydemo
oc delete pvc database-pvc-database-0

#### Add repository
helm repo add openshift-helm-charts https://charts.openshift.io

#### Search repository
helm search repo openshift-helm-charts | grep mysql

#### Pull and extract chart
helm pull openshift-helm-charts/redhat-mysql-persistent --untar --destination ./helm/charts
```

Curl
====
```bash
curl -i -X POST -H "Content-Type: application/json" \
  http://localhost:8001/api/login_check \
  -d '{"email":"user@example.com","password":"pa55w0rd"}'
```

Openshift
=========
```bash


#### Install opc CLI
curl -L https://github.com/openshift-pipelines/opc/releases/download/v1.22.0/opc_1.22.0_linux_x86_64.tar.gz | tar -xz
mv opc .local/bin/
opc version

#### Install Tekton
oc login -u kubeadmin -p 
oc new-project tekton-pipelines
oc adm policy add-scc-to-user anyuid -z tekton-pipelines-controller
oc adm policy add-scc-to-user anyuid -z tekton-pipelines-webhook

wget https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O ~/.local/bin/yq && chmod +x ~/.local/bin/yq && ~/.local/bin/yq --version

curl https://storage.googleapis.com/tekton-releases/pipeline/latest/release.notags.yaml | yq 'del(.spec.template.spec.containers[].securityContext.runAsUser, .spec.template.spec.containers[].securityContext.runAsGroup)' | oc apply -f -

#### Install Tekton CLI
curl -L https://github.com/tektoncd/cli/releases/download/v0.37.6/tkn_0.37.6_Linux_x86_64.tar.gz | tar -xz
mv tkn .local/bin/
tkn version

#### Install kustomize
curl -L https://github.com/kubernetes-sigs/kustomize/releases/download/kustomize%2Fv5.8.1/kustomize_v5.8.1_linux_amd64.tar.gz | tar -xz
mv kustomize .local/bin/
kustomize version
kustomize create --resources deployment.yaml,service.yaml,../base --namespace staging --nameprefix acme-
kustomize edit add secret my-secret --from-literal=my-literal=12345
kustomize edit add base frontend.deployment.yaml
kustomize edit add configmap frontend-nginx-config --from-file=frontend-nginx.conf
oc adm policy add-scc-to-user anyuid -z default -n test-demo
kustomize build ./kubernetes/kustomize/base | oc apply -f -
oc kustomize .
```