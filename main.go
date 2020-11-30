package main

import (
	"github.com/leaanthony/mewn"
	csvmodule "github.com/marcos514/julianBE/modules/csvModule"
	"github.com/wailsapp/wails"
)

func basic() string {
	return "World!"
}

func ConseguirTodosLosProductos() []csvmodule.Producto {
	return csvmodule.ReadProductos("store/productos.csv")
}

func main() {

	js := mewn.String("./frontend/dist/my-app/main.js")
	css := mewn.String("./frontend/dist/my-app/styles.css")

	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "JulianFE",
		JS:     js,
		CSS:    css,
		Colour: "#131313",
	})
	app.Bind(basic)
	app.Bind(ConseguirTodosLosProductos)
	app.Run()
}
