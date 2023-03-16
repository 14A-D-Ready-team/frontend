import { environment } from "@/environments/environment";
import { platform } from "@/environments/platform";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { AdminShellModule } from "./admin/shell";
import { desktopRoutes, mobileRoutes } from "./routes";

@NgModule({
  imports: [
    RouterModule.forRoot(
      platform === "desktop" ? desktopRoutes : mobileRoutes,
      {
        preloadingStrategy: PreloadAllModules,
        initialNavigation: "enabledBlocking",
      },
    ),
    AdminShellModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
