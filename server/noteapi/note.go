package note

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Note struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

func SetupRoutes(app *fiber.App) {

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

	app.Delete("/api/notes/:id/delete", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			return err
		}
		for i, t := range notes {
			if t.ID == id {
				notes = append(notes[:i], notes[i+1:]...)
			}
		}
		return c.JSON(notes)
	})

	app.Put("/api/notes/allclear", func(c *fiber.Ctx) error {
		//既存のnotesに空のスライスを代入(:= とするのはミスで、put終了後に戻る)
		notes = []Note{}
		return c.JSON(notes)
	})
}
