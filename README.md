# NALOGA

to je tretja naloga pri predmetu MSI, kjer sem se odlocil, da deployam full stack web app + golang server, katerega image je multistage build.
webb app ima za frontend REACT, imamo express backend/api, ki nam dostopa do podatkovne baze, za branje in pisanje.
Za podatkovno bazo sem uporabil POSTGRESSQL.
Aplikacija pa preprosta redovalnica ocen.
Golang image, je simple server, ki streze na 8081.

## uporaba:

## demo video

[Video](https://drive.google.com/file/d/1oyj8X4ntrEwDR5W4fSGEnS3o3y_JHtu1/view?usp=sharing)

## zazenemo minikube

minikube start
minikube addons enable ingress
minikube tunnel

## pripravimo repozitorij

git clone https://github.com/BlazBone/msi3
cd msi3

## zazenemo kubectl

(potrebno je tudi generirati secret
kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345
) - ta nam naredi presprosto geslo samo za demonstracijo
kubectl apply -f k8s

odpre nam 2 vrsti clienta, server, podatkovno bazo ter go server(3x), ki je bil zgrajen iz multistage builda
vsi images, ki jih uporabimo so na mojemu dockerhubu, v tem repozitorju, pa so se vedno dockerfiles tako da jih lahko tudi sami buildate.

## broweser

pregledamo, kako aplikacije deluje. Potrebuje nekaj casa, da se zazene.
localhost
localhost/api/now
localhost/go_multi

## odpremo 2 dodatna terminala

omogocata nam spremljanje postavitve novih podov go serverja

-   kubectl get deployment go-ip -o wide --watch
-   kubectl get pods --watch

## green-blue za client ter readiness updatee za go server hkrati

clientu se spremeni barva(samo kot indikator zamenjave)
go serverju pa se rahlo spremeni tekst ki ga vraca.

-   kubectl apply -f k8sv2

## frontend

-   http://localhost
-   lahko vpisemo oceno(int) ter predmet
-   kliknemo dodaj v redovalnico
-   ter prikazemo redovalnico z drugim gumbom
    ![alt text](/images/front.png)

## golang

-   http://localhost/go_multi/
-   http://localhost/go_multi/drugo kratek opis razlike slik
    ![alt text](/images/golang.png)

## db

-   smisenla za uporabo presistent voliumes
