package main

import (
	"next-go-todo/pages/api/server/noteapi/note"
	"next-go-todo/pages/api/server/todoapi/todo"
)

func main() {
	todo.StartServer()
	note.StartServer()
}
