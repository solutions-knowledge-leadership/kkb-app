package models

type Splits struct {
	ID				string `gorm:"primaryKey"`
	ExpenseID		string
	ParticipantID 	string
	Amount 			float64
}