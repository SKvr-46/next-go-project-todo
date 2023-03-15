package note

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Note struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

func main() {

	app := fiber.New()
	notes := []Note{}

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/api/notes", func(c *fiber.Ctx) error {
		return c.JSON(notes)
	})

	app.Post("/api/notes", func(c *fiber.Ctx) error {
		note := &Note{}
		if err := c.BodyParser(note); err != nil {
			return err
		}
		note.ID = len(notes) + 1
		notes = append(notes, *note)
		return c.JSON(notes)
	})

	log.Fatal(app.Listen(":4000/notes"))
}
