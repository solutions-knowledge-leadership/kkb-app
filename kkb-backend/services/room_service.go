package services

import (
	"kkb-app/kkb-backend/repositories"
	"strings"

	"github.com/google/uuid"
)

type RoomService struct {
	repo *repositories.RoomRepository
}

func NewRoomService(repo *repositories.RoomRepository) *RoomService {
	return &RoomService{repo: repo}
}

func (s *RoomService) CreateRoom()(string, error) {
	id := uuid.New().String()
	code := strings.ToUpper(id[:6])

	err := s.repo.Create(id, code)
	if err != nil {
		return "", err
	}

	return code, nil
}
