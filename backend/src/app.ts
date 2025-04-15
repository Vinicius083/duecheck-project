import express from "express";
import userRoutes from "./routes/userRoutes";
import consultaRoutes from "./routes/consultaRoutes";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DueCheck API",
      version: "1.0.0",
      description: "API para gerenciamento de consultas e usuários",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/consulta", consultaRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Documentation is running at http://localhost:${port}/api-docs`);
});
