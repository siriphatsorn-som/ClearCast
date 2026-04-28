import express from "express";
import cors from "cors";
import "dotenv/config";

import weatherRoutes from "./routes/weather.js";
import newsRoutes from "./routes/news.js";
import photoRoutes from "./routes/photo.js";
import favRoutes from "./routes/favorites.js";
import reviewRoutes from "./routes/reviews.js";
import challengeRoutes from "./routes/challenges.js";

import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/favorites", favRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/collection", challengeRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 5000);