package databases

import (
	"github.com/joho/godotenv"
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using system env")
	}
	
	connStr := os.Getenv("DATABASE_URL")
	if connStr == "" {
		log.Fatal("DATABASE_URL is not set")
	}
	
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("failed to connect to database", err)
	}
	
	err = DB.Ping()
	if err != nil {
		log.Fatal("database not reachable", err)
	}

	log.Println("Connected to Postgres")
}

func CreateTables() {
	createRoomTable := `
		CREATE TABLE IF NOT EXISTS rooms (
			id TEXT PRIMARY KEY,
			code TEXT
		);
	`
	createMemberTable := `
		CREATE TABLE IF NOT EXISTS members (
			id TEXT PRIMARY KEY,
			name TEXT,
			room_id TEXT REFERENCES rooms(id)
		);
	`
	createExpenseTable := `
		CREATE TABLE IF NOT EXISTS expenses (
			id TEXT PRIMARY KEY,
			room_id TEXT REFERENCES rooms(id),
			member_id TEXT REFERENCES members(id),
			name TEXT,
			amount DOUBLE PRECISION
		);
	`
	createSplitTable := `
		CREATE TABLE IF NOT EXISTS splits (
			id TEXT PRIMARY KEY,
			expense_id TEXT REFERENCES expenses(id),
			member_id TEXT REFERENCES members(id),
			amount DOUBLE PRECISION,
			paid BOOLEAN DEFAULT FALSE
		);
	`
	queries := []string{
		createRoomTable,
		createMemberTable,
		createExpenseTable,
		createSplitTable,
	}
	for _, query := range queries {
		_, err := DB.Exec(query)
		if err != nil {
			log.Fatal("Failed to create tables:", err)
		}
	}
}