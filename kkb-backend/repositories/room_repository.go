package repositories

import (
	"database/sql"
	"kkb-app/kkb-backend/models"
	"log"
)

type RoomRepository struct {
	DB *sql.DB
}

func NewRoomRepository(db *sql.DB) *RoomRepository {
	return &RoomRepository{DB: db}
}

func (r *RoomRepository) Create(id string, code string) error {
	query := `
		INSERT INTO rooms (id, code)
		VALUES ($1, $2)
	`
	_, err := r.DB.Exec(query, id, code)
	if err != nil {
		return err
	}
	log.Println("Inserted room:", id, code)
	return nil
}

func (r *RoomRepository) GetAll() ([]models.Room, error) {
	query := `
		SELECT * FROM rooms
	`
	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, err
	}
	var rooms []models.Room
	
	for rows.Next() {
		var room models.Room
		err := rows.Scan(&room.ID, &room.Code)
		if err != nil {
			return nil, err
		}

		defer rows.Close()

		rooms = append(rooms, room)
	}
	return rooms, nil
}

func (r *RoomRepository) GetRoomByID(id string) (models.Room, error) {
	query := `
		SELECT id, code FROM rooms 
		WHERE id = $1
	`
	row := r.DB.QueryRow(query, id)
	
	var room models.Room

	err := row.Scan(&room.ID, &room.Code)
	if err != nil {
		return models.Room{}, err
	}

	return room, nil
}