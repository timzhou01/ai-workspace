import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { DashboardController } from "./dashboard/dashboard.controller.js";

@Module({
  controllers: [AppController, DashboardController],
})
export class AppModule {}
