import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3001);

  app.enableCors({ origin: ["http://127.0.0.1:3000", "http://localhost:3000"] });

  await app.listen(port);
  console.log(`API listening on http://localhost:${port}`);
}

void bootstrap();
