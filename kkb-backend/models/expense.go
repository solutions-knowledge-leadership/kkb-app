package models

type Expense struct {
	ID			string	`json:"id"`
	MemberID	string	`json:"member_id"`
	Name		string	`json:"name"`
	Amount		float64	`json:"amount"`
}