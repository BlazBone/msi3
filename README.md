# NALOGA

to je druga naloga pri predmetu MSI, kjer sem se odlocil, da deployam full stack web app + golang server, katerega image je multistage build.
webb app ima za frontend REACT, in je dostopen na portu 3000 imamo express backend/api, na portu 5000, ki nam dostopa do podatkovne baze, zaz branje in pisanje.
Za podatkovno bazo sem uporabil POSTGRESSQL imamo pa tudi ADMINER, s katerim lahko na portu 8080 dostopamo do podatkovne baze preko browserja.
Golang image, je simple server, ki streze na 8081.

## uporaba:

-   git clone https://github.com/BlazBone/msi2.git
-   cd msi2
-   docker compose up
-   pocakamo
    ![alt text](/images/running.png)
    (vidimo vse kontejnerje uspesno teci)

## frontend

-   http://localhost:3000
-   lahko vpisemo oceno(int) ter predmet
-   kliknemo dodaj v redovalnico
-   ter prikazemo redovalnico z drugim gumbom
-   (zahteve se posljejo na nas api, ki dela na portu 5000) /vseOcene(get), /dodajOceno(post)
    ![alt text](/images/front.png)

## backend

-   http://localhost:5000
-   http://localhost:5000/now nam vrne trenutne cas. tako lahko samostojno zazenemo in preverimo delovanje api kar v browserju
-   http://localhost:5000/dodajOceno sprejme post ter podatka, ki sta bila v inputu na clientu ter ju vnese v bazo
-   http://localhost:5000/vseOcene naredi preprosto poizvedbo SELECT \* FROM ocene; ter vrne rezultat clientu, da ga ta lahko izpise
    ![alt text](/images/back.png)

## golang

-   http://localhost:8081
-   http://localhost:8081/drugo kratek opis razlike slik
    ![alt text](/images/golang.png)

## adminer

-   http://localhost:8080
-   username myadmin geslo mypassword ter baza postgresql
-   pogledamo lahko, da se ustvari testna tabela, preko init.sql skripte. Ce smo dodali kaksno oceno, pa imamo tudi tabelo Ocene
    ![alt text](/images/database.png)

## db

-   najbolj smiselna uporaba volumes, saj ko git clonamo mapa s podatki ne obstaja, to naredi docker in v njo posilja vse podatke, ki so shranjeni v bazi v kontejnerju, da ko se ta konteiner zapre ne izgubimo podatkov. Ti se ob ponovnem zagonu prepisejo iz mape.
