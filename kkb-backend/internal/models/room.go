package models

import "time"

type Room struct {
	ID 			string	`gorm:"primaryKey"`
	Code 		string
	Name 		string
	CreatedAt 	time.Time 

	
}


