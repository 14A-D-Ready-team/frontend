import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { map } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public isOnAdminPage$ = this.route.data.pipe(
    map(data => {
      return true;
    }),
  );

  constructor(private route: ActivatedRoute, private router: Router) {}
}
