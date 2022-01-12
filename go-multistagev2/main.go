package main

import (
    "fmt"
    "log"
    "net/http"
    "time"
)

func main() {

    time.Sleep(7 * time.Second)

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Pozdrav iz multistage slike VERZIJE 2 GO-ja. Lahko obiscete tudi /drugo")
    })
    http.HandleFunc("/ready", func(w http.ResponseWriter, r *http.Request) {
        time.Sleep(1 * time.Second)
        fmt.Fprintf(w, "Yes")
        
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