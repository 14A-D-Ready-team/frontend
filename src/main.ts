import "reflect-metadata";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { Expose, Exclude, plainToInstance } from "class-transformer";

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

if (document.readyState === "complete") {
  bootstrap();
} else {
  document.addEventListener("DOMContentLoaded", bootstrap);
}
