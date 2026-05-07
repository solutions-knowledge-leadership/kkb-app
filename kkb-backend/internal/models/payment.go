package models

type Payment struct {
	ID 					string `gorm:"primaryKey" json:"id"`
	ParticipantID		string
	ExpenseID 			string
	Amount				string
	Status				string
}