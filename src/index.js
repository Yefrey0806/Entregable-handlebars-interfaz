import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./util.js";

const app = express();
const port = 3000;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Archivos estáticos (video de fondo) -> src/public
app.use(express.static(__dirname + "/public"));

// Sala de chat: /?user=Maria cambia el usuario; si no, se genera uno
app.get("/", (req, res) => {
    const username = (req.query.user || "").toString().trim().slice(0, 20)
        || "Invitado" + Math.floor(1000 + Math.random() * 9000);

    const ads = [
        { brand: "Nimbus Hosting", initial: "N", title: "Publica tu proyecto en minutos", text: "Despliegue de apps Node.js con un solo comando." },
        { brand: "Café Andino", initial: "C", title: "Pausa para programar", text: "2x1 en café de origen todos los viernes." },
        { brand: "Academia Código", initial: "A", title: "Aprende backend desde cero", text: "Cursos prácticos de Node, Express y bases de datos." }
    ];

    res.render("chat", { title: "Sala de chat", username, ads });
});

app.listen(port, () => {
    console.log(`Chat escuchando en http://localhost:${port}`);
});
