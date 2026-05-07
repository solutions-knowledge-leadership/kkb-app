package models

type Split struct {
	ID			string	`json:"id"`
	ExpenseID	string	`json:"expense_id"`
	MemberID	string	`json:"member_id"`
	Amount		float64	`json:"amount"`
	IsPaid		bool	`json:"is_paid"`
}