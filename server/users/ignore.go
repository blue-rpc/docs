package users

type UserData struct {
	Name  string
	Email string
}

func getUserData(id string) *UserData {

	return &UserData{
		Name:  "John doe",
		Email: "John Doe email",
	}
}
