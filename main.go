package main

import (
	"log"
	note "next-go-todo/server/noteapi"
	todo "next-go-todo/server/todoapi"

	"github.com/gofiber/fiber/v2"
)

func main() {

	app := fiber.New()
	// use todo routes
	todo.SetupRoutes(app)

	// use note routes
	note.SetupRoutes(app)

	log.Fatal(app.Listen(":4000"))
}
