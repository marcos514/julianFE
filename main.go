package main

import (
	"encoding/json"

	"github.com/leaanthony/mewn"
	csvmodule "github.com/marcos514/julianBE/modules/csvModule"
	"github.com/wailsapp/wails"
)

type Producto struct {
	ID             int
	CantidadUnidad int
	Nombre         string
	Descripcion    string
	Medidas        string
	Empresa        string
	Codigo         string
	Precio         float32
	Categorias     []string
	Activo         bool
}

type Cliente struct {
	ID        int
	Mail      string
	Nombre    string
	Direccion string
	Numero    string
}

func basic() string {
	return "World!"
}

func ConseguirTodosLosProductos() []csvmodule.Producto {
	return csvmodule.ReadProductos("store/productos.csv")
}

func ProductsInterfaceTansform(data interface{}) []csvmodule.Producto {
	customer := []csvmodule.Producto{}
	bodyBytes, _ := json.Marshal(data)
	json.Unmarshal(bodyBytes, &customer)
	return customer
}

func ProductInterfaceTansform(data interface{}) csvmodule.Producto {
	customer := csvmodule.Producto{}
	bodyBytes, _ := json.Marshal(data)
	json.Unmarshal(bodyBytes, &customer)
	return customer
}

func ActualizarProductos(lpi []interface{}) []csvmodule.Producto {
	receivedCustomer := ProductsInterfaceTansform(lpi)
	return csvmodule.ActualizarProductos(receivedCustomer)
}

func CrearProducto(pi interface{}) []csvmodule.Producto {
	receivedCustomer := ProductInterfaceTansform(pi)
	var lp []csvmodule.Producto
	lp = append(lp, receivedCustomer)
	return csvmodule.ActualizarProductos(lp)
}

//Clientes funciones

func ConseguirTodosLosClientes() []csvmodule.Cliente {
	return csvmodule.ReadClientes()
}

func ClienteInterfaceTansform(data interface{}) csvmodule.Cliente {
	cliente := csvmodule.Cliente{}
	bodyBytes, _ := json.Marshal(data)
	json.Unmarshal(bodyBytes, &cliente)
	return cliente
}

func ActualizarCliente(c interface{}) []csvmodule.Cliente {
	receivedCustomer := ClienteInterfaceTansform(c)
	return csvmodule.ActualizarCliente(receivedCustomer)
}

func CrearCliente(ci interface{}) []csvmodule.Cliente {
	c := ClienteInterfaceTansform(ci)
	return csvmodule.AgregarCliente(c)
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
	app.Bind(ActualizarProductos)
	app.Bind(CrearProducto)

	app.Bind(ConseguirTodosLosClientes)
	app.Bind(ActualizarCliente)
	app.Bind(CrearCliente)
	app.Run()
}
