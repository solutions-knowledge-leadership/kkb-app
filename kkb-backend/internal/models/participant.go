package models

type Participant struct {
	ID 			string `gorm:"primaryKey" json:"id"`
	Name		string
	RoomID 		string
}