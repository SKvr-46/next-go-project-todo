package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Text  string `json:"text"`
	Done  bool   `json:"done"`
}

func main() {

	app := fiber.New()
	todos := []Todo{}

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})

	//c(ontext)に、Postの内容があるので、リクエスト本文をパースして、todo構造体にデコード
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		//デコードするための構造体
		todo := &Todo{}
		if err := c.BodyParser(todo); err != nil {
			return err
		}
		todo.ID = len(todos) + 1
		todos = append(todos, *todo)
		return c.JSON(todos)
	})

	app.Patch("/api/todos/:id/completed", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			return err
		}
		//t.IDでtodos.IDを走査して、idに一致していれば、その番号をtrueにする
		for i, t := range todos {
			if t.ID == id {
				if todos[i].Done == true {
					todos[i].Done = false
					break
				} else if todos[i].Done == false {
					todos[i].Done = true
					break
				}
			}
		}
		return c.JSON(todos)
	})

	app.Delete("/api/todos/:id/delete", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			return err
		}
		for i, t := range todos {
			if t.ID == id {
				//todos[i]は、todos[:i]には含まれていない
				todos = append(todos[:i], todos[i+1:]...)
			}
		}
		return c.JSON(todos)
	})

	log.Fatal(app.Listen(":4000"))
}
