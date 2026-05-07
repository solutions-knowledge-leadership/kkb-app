package models

type Expense struct {
	ID			string		`gorm:"primaryKey" json:"id"`
	PaidBy 		string
	Amount		float64	
	Currency	string
	RoomID		string	
}