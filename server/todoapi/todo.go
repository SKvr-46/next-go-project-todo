package todo

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Todo struct {
	ID        int    `json:"id"`
	Date      string `json:"date"`
	Title     string `json:"title"`
	Text      string `json:"text"`
	Completed bool   `json:"completed"`
}

func SetupRoutes(app *fiber.App) {
	todos := []Todo{}

	//CORS　設定
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/api/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})

	//c(ontext)に、Postの内容があるので、リクエスト本文をパースして、todo構造体にデコード（BodyParser(todo)）
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		//デコードするための構造体
		todo := &Todo{}
		if err := c.BodyParser(todo); err != nil {
			return err
		}
		todo.ID = len(todos) + 1
		now := time.Now()
		todo.Date = now.Format("06/01/02 15:04")
		todos = append(todos, *todo)
		return c.JSON(todos)
	})

	//選択したTodoのCompletedを変更する
	app.Patch("/api/todos/:id/completed", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")
		if err != nil {
			return err
		}
		//t.IDでtodos.IDを走査して、idに一致していれば、その番号をtrueにする
		for i, t := range todos {
			if t.ID == id {
				if todos[i].Completed == true {
					todos[i].Completed = false
					break
				} else if todos[i].Completed == false {
					todos[i].Completed = true
					break
				}
			}
		}
		return c.JSON(todos)
	})

	//選択したIDのTodoを消去する
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

	//Todosを空にする
	app.Put("/api/todos/allclear", func(c *fiber.Ctx) error {
		todos = []Todo{}
		return c.JSON(todos)
	})
}
