import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./util.js";

const app = express();
const port = 3000;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Archivos estáticos (video de fondo, etc.) -> src/public
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const products = [
    { name_product: "Hamburger chimbisecchions", price: 10 },
    { name_product: "Coke", price: 3 },
    { name_product: "Pancake", price: 8 },
  ];
  res.render("index", {
    title: "Motores",
    username: "Muchachos",
    admin: true,
    product: products,
  });
});

// Sala de chat: el usuario llega por la URL (/chat?user=Maria) o se genera uno
app.get("/chat", (req, res) => {
  const username =
    (req.query.user || "").toString().trim().slice(0, 20) ||
    "Invitado" + Math.floor(1000 + Math.random() * 9000);

  const ads = [
    {
      brand: "Nimbus Hosting",
      initial: "N",
      title: "Publica tu proyecto en minutos",
      text: "Despliegue de apps Node.js con un solo comando.",
    },
    {
      brand: "Café Andino",
      initial: "C",
      title: "Pausa para programar",
      text: "2x1 en café de origen todos los viernes.",
    },
    {
      brand: "Academia Código",
      initial: "A",
      title: "Aprende backend desde cero",
      text: "Cursos prácticos de Node, Express y bases de datos.",
    },
  ];

  res.render("chat", { title: "Sala de chat", layout: false, username, ads });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
