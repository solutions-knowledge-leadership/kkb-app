package main

import (
	"log"
	"net/http"

	db "kkb-app/kkb-backend/databases"
	"kkb-app/kkb-backend/handlers"
	"kkb-app/kkb-backend/services"
	"kkb-app/kkb-backend/repositories"
)

func main() {
	db.InitDB()
	db.CreateTables()

	roomRepository := repositories.NewRoomRepository(db.DB)
	roomService := services.NewRoomService(roomRepository)
	roomHandler := handlers.NewRoomHandler(roomService)
	http.HandleFunc("/rooms", roomHandler.CreateRoom)

	log.Println("Server running on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

