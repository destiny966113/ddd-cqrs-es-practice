package bankAccount

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hellokvn/bank-api-gateway/pkg/bank_account/routes"
	"github.com/hellokvn/bank-api-gateway/pkg/common/config"
)

// http://asaa.ml:8933/api/v1/bank-account/find/1
func RegisterRoutes(app *fiber.App, c config.Config) {
	svc := InitServiceClient(&c)

	r := app.Group("/api/v1/bank-account")
	r.Get("/find-one/:id", svc.FindAccount)
	r.Get("/find/:page", svc.FindAllAccounts)
	r.Post("/open", svc.OpenAccount)
	r.Delete("/close/:id", svc.CloseAccount)
}

func (svc *ServiceClient) FindAccount(ctx *fiber.Ctx) error {
	return routes.FindAccount(ctx, svc.QueryClient)
}

func (svc *ServiceClient) FindAllAccounts(ctx *fiber.Ctx) error {
	return routes.FindAllAccounts(ctx, svc.QueryClient)
}

func (svc *ServiceClient) OpenAccount(ctx *fiber.Ctx) error {
	return routes.OpenAccount(ctx, svc.CommandClient)
}

func (svc *ServiceClient) CloseAccount(ctx *fiber.Ctx) error {
	return routes.CloseAccount(ctx, svc.CommandClient)
}
