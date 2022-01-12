package main

import (
    "fmt"
    "log"
    "net/http"
    "math/rand"
    "time"
)

func main() {

    time.Sleep(12 * time.Second)

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Pozdrav iz multistage slike GO-ja. Lahko obiscete tudi /drugo")
    })
    http.HandleFunc("/ready", func(w http.ResponseWriter, r *http.Request) {
        if(rand.Intn(100) % 5 == 0) {

            fmt.Fprintf(w, "OK")
        }else {
            w.WriteHeader(500)
            fmt.Fprint(w, "err")
        }
    })
    http.HandleFunc("/live", func(w http.ResponseWriter, r *http.Request) {
     
        fmt.Fprintf(w, "OK")
    })

    http.HandleFunc("/drugo", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, " image brez multistage ima okoli 700MB medtem, ko ima ta trenutni samo okoli 11MB")
    })

    log.Fatal(http.ListenAndServe(":8081", nil))
    fmt.Println("Server pognan na http://localhost:8081 :)")
}