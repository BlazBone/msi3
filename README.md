<!-- # FULL STACK APP DEPLOYMENT WITH BLUE/GREEN AND ROLLING UPDATES -->

# Full stack app deployment with blue/green and rolling update

This is a simple app, that showcases deployment with k8s.
App is a simple markbook which uses React on frontend, express on backend to connect to PostgreSQL database, which uses presistant volumes.
Next to the app we also spin up a multistage minimal build image of a golang server, that returns hello.

Blue green update will change the frontend of the aplication(mainly colors so that the change is obvious), rolling update will be done on the GO server where the "new" version will return a different a string.

# Demo video

Here you can see video showing everything.
[Video](https://drive.google.com/file/d/1oyj8X4ntrEwDR5W4fSGEnS3o3y_JHtu1/view?usp=sharing)

# Steps for setting up

## 1 minikube

Run the commands:

```
minikube start
```

```
minikube addons enable ingress
```

```
minikube tunnel
```

## 2 Clone repo

```
git clone https://github.com/BlazBone/msi3
```

```
cd msi3
```

## 3 Run kubectl

First we also need to generate secret (we dont want our pasword to be hardcoded)
run

```
kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345
```

this creates a secret with name pgpassword and key PGPASSWORD

```
kubectl apply -f k8s
```

This opens two different versions of clientside(light and dark), backend/api, database and also 3 pods of GO multistage build server(only first version)
all images used are in my dockerhub but if some are missing or not working the Dockerfiles are there so you could build them.

## 4 check localhost

we can see frontend of our application running if we visit `http://localhost`. But it takes some time to strat running.
We can also visit `http://localhost/api/now` that return a JSON response from our database, `http://localhost/go_multi` that return string sent from our GO server.

## (Optional) 5 Open two extra terminals

They will allow us to keep track of updates taking place

Run:

```
kubectl get deployment go-ip -o wide --watch
```

We only want to see our go server here, since this is the one we will be having our rolling update done on.

```
kubectl get pods --watch
```

## 6 green-blue for client and rolling update for GO server

On the client side of the app we switch the image to the one having dark theme.
Go server takes some time(it must be ready and alive) but eventially the 3 pods will change to the new version that outpust a slightly modified string.

To run both deployments use:

```
 kubectl apply -f k8sv2
```

We can now visit `http://localhost` to see the effect.
Also visiting and refreshing `http://localhost/go_multi` will yield a different result. (Check when new pods are avalible on the terminals we set up in the 5th step)

## Frontend

-   http://localhost
-   we can enter the mark in 'vnesi oceno'(must be INT) end subject in 'vnesi predmet'
-   press 'dodaj v predavalnico' to add to the markbook
-   show our markbook with 'prikazi redovalnico'
    ![alt text](/images/front.png)

## Golang server

-   http://localhost/go_multi/
-   http://localhost/go_multi/drugo short description (in slovene) about difference of images
    ![alt text](/images/golang.png)
