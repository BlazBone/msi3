package main

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Pozdrav iz multistage slike GO-ja. Lahko obiscete tudi /drugo")
    })

    http.HandleFunc("/drugo", func(w http.ResponseWriter, r *http.Request){
        fmt.Fprintf(w, " image brez multistage ima okoli 700MB medtem, ko ima ta trenutni samo okoli 11MB")
    })

    log.Fatal(http.ListenAndServe(":8081", nil))
    fmt.Println("Server pognan na http://localhost:8081 :)")
}