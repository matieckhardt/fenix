const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();

app.set("PORT", process.env.PORT || 3000);

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => res.send("index"));

app.post("/formulario", async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (nombre && email && mensaje) {
    let contentHtml = `
    <h4>Este es un mensaje autogenerado por el formulario de consultas, a continuacion se detallan los datos del mismo:</h4>
    <p>Nombre: ${nombre}</p>
    <p>Asunto: ${asunto}</p>
  	<p>Correo: ${email}</p>
    <p>Mensaje: ${mensaje}</p>
    `;

    let subject = `Consulta Web: ${asunto}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.FENIX_SMTP_USER,
        pass: process.env.FENIX_SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "info@nuevasocialfenix.com.ar",
      to: "info@nuevasocialfenix.com.ar",
      subject,
      html: contentHtml,
    });

    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

module.exports = app;
