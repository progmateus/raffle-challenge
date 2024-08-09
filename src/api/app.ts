import express from "express";
import "../data/index"

const app = express();

app.use(express.json())

export { app };