import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-create-invite-token",
  templateUrl: "./create-invite-token.page.html",
  styleUrls: ["./create-invite-token.page.scss"],
})
export class CreateInviteTokenPage implements OnInit {

  public code: any;

  constructor() {}

  ngOnInit() {}

  generate(){
    this.code = "asdasd";
  }

}
