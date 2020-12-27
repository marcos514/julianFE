package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/leaanthony/mewn"
	"github.com/marcos514/julianBE/modules/core"
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
	path, err := os.Getwd()
	if err != nil {
		log.Println(err)
	}
	fmt.Println(path)
	return csvmodule.ReadProductos("./store/productos.csv")
}

func ProductsInterfaceTansform(data interface{}) []csvmodule.Producto {
	fmt.Print("DAAAAATAAAAAA\n")
	fmt.Print(data)
	customer := []csvmodule.Producto{}
	bodyBytes, _ := json.Marshal(data)
	json.Unmarshal(bodyBytes, &customer)
	return customer
}

// func ProductInterfaceTansform(data interface{}) csvmodule.Producto {
// 	customer := csvmodule.Producto{}
// 	bodyBytes, _ := json.Marshal(data)
// 	json.Unmarshal(bodyBytes, &customer)
// 	return customer
// }

func ActualizarProductos(lpi []interface{}) []csvmodule.Producto {
	receivedCustomer := ProductsInterfaceTansform(lpi)
	return csvmodule.ActualizarProductos(receivedCustomer)
}

func ActualizarProductosDeArchivo() []csvmodule.Producto {
	return csvmodule.AgregarProductosDeArchivo("./store/newproductos.csv")
}

// func CrearProducto(pi interface{}) []csvmodule.Producto {
// 	receivedCustomer := ProductInterfaceTansform(pi)
// 	var lp []csvmodule.Producto
// 	lp = append(lp, receivedCustomer)
// 	return csvmodule.ActualizarProductos(lp)
// }

// //Clientes funciones

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

func ConseguirFacturas() interface{} {
	return csvmodule.ReadFacturas()
}

func ConseguirFacturasProductos() interface{} {
	return csvmodule.ReadFacturaProductos()
}

func FacturaProductosInterfaceTansform(data interface{}) []csvmodule.FacturaProducto {
	lfp := []csvmodule.FacturaProducto{}
	bodyBytes, _ := json.Marshal(data)
	json.Unmarshal(bodyBytes, &lfp)
	return lfp
}

func ActualizarFactura(facturaID int, clienteID int, precio float32, facturaProductos interface{}) interface{} {
	fact := csvmodule.Factura{
		core.Factura{
			ID:          facturaID,
			ClienteID:   clienteID,
			Fecha:       time.Now(),
			PrecioTotal: precio,
		},
	}
	lfp := FacturaProductosInterfaceTansform(facturaProductos)
	for i := 0; i < len(lfp); i++ {
		fp := lfp[i]
		fact.AddFacturaProduct(fp.FacturaProducto)
	}
	fmt.Print("\n\n\n\n")
	fmt.Print(fact)
	return csvmodule.ActualizarFactura(fact)
}

func ImprimirFacturaCSV(facturaID int, clienteID int, precio float32, facturaProductos interface{}) {
	fact := csvmodule.Factura{
		core.Factura{
			ID:          facturaID,
			ClienteID:   clienteID,
			Fecha:       time.Now(),
			PrecioTotal: precio,
		},
	}
	clientes := csvmodule.MapClientes(ConseguirTodosLosClientes())
	fact.SetCliente(clientes[fact.ClienteID].Cliente)
	productos := csvmodule.MapProducts(ConseguirTodosLosProductos())
	lfp := FacturaProductosInterfaceTansform(facturaProductos)

	if facturaID == -6 {
		lf := csvmodule.ReadFacturas()
		lastFacturaId := lf[len(lf)-1].ID
		fact.ID = lastFacturaId + 1
	}

	for i := 0; i < len(lfp); i++ {
		fp := lfp[i]
		fp.FacturaID = fact.ID
		fmt.Print("\n\n\n")
		fmt.Print(fact.ID)
		fp.AddProducto(productos[fp.ProductoID].Producto)
		fact.AddFacturaProduct(fp.FacturaProducto)
	}
	fact.ImprimirFacturaCSV()
}

func SetFullPath() {
	path, _ := os.Getwd()
	fmt.Print("\n\n\n\nTHE PATH IS " + path)
	csvmodule.SetFullPath(path)
}

func GetFullPath() string {
	return csvmodule.GetFullPath()
}

func main() {

	js := mewn.String("./frontend/dist/my-app/main.js")
	css := mewn.String("./frontend/dist/my-app/styles.css")

	app := wails.CreateApp(&wails.AppConfig{
		Width:     1500,
		Height:    1500,
		Title:     "JulianFE",
		JS:        js,
		CSS:       css,
		Colour:    "#FFFFFF",
		Resizable: true,
	})
	app.Bind(basic)
	app.Bind(ConseguirTodosLosProductos)
	app.Bind(ActualizarProductos)
	// app.Bind(CrearProducto)
	app.Bind(ActualizarProductosDeArchivo)

	app.Bind(ConseguirTodosLosClientes)
	app.Bind(ActualizarCliente)
	app.Bind(CrearCliente)

	app.Bind(ConseguirFacturas)
	app.Bind(ConseguirFacturasProductos)
	app.Bind(ActualizarFactura)
	app.Bind(ImprimirFacturaCSV)

	app.Bind(SetFullPath)
	app.Bind(GetFullPath)
	app.Run()
}
