import { Component, OnInit, ViewChild } from "@angular/core";
import { IonLabel, IonModal } from "@ionic/angular";

@Component({
  selector: "app-buffet-select",
  templateUrl: "./buffet-select.page.html",
  styleUrls: ["./buffet-select.page.scss"],
})
export class BuffetSelectPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  name!: string;

  data = [
    {
      id: 2,
      name: "Jedlik büfé",
      coords: "47.68245999072191, 17.63033089810631",
      address: "Győr, Szent István út 7, 9021",
      hours:
        "\n        Hétfő:     08:00 – 13:00\n        Kedd: \t   08:00 – 13:00\n        Szerda:\t   08:00 – 13:00\n        Csütörtök: 08:00 – 13:00\n        Péntek:\t   08:00 – 13:00\n        Szombat:   Zárva\n        Vasárnap:\t Zárva\n ",
      description:
        "Büfé a Győri Szakképzési Centrum Jedlik Ányos Gépipari és Informatikai iskolában. Széles választék, gyors kiszolgálás.",
      ownerId: 4,
    },
    {
      id: 1,
      name: "Sörkert",
      coords: "47.69535097415908, 17.667713973715607",
      address: "Győr, Nagysándor József utca 52",
      hours:
        "\n        Hétfő:     10:00 – 18:00\n        Kedd: \t   10:00 – 18:00\n        Szerda:\t   10:00 – 18:00\n        Csütörtök: 10:00 – 18:00\n        Péntek:\t   10:00 – 18:00\n        Szombat:   10:00 - 14:00\n        Vasárnap:\t Zárva\n  ",
      description:
        "Büfé a Xantus János Állatkert közelében. Baráti környezet, olcsó árak.",
      ownerId: 4,
    },
  ];

  selectedData = {
    id: 0,
    name: "",
    coords: "",
    address: "",
    hours: "",
    description: "",
    ownerId: 0,
  };

  cancel() {
    this.modal.dismiss(null, "cancel");
  }

  confirm(s: any) {
    this.modal.dismiss(this.name, "confirm");
    console.log(s);
    this.selectedData = {
      id: 2,
      name: "Jedlik büfé",
      coords: "47.68245999072191, 17.63033089810631",
      address: "Győr, Szent István út 7, 9021",
      hours:
        "\n        Hétfő:     08:00 – 13:00\n        Kedd: \t   08:00 – 13:00\n        Szerda:\t   08:00 – 13:00\n        Csütörtök: 08:00 – 13:00\n        Péntek:\t   08:00 – 13:00\n        Szombat:   Zárva\n        Vasárnap:\t Zárva\n ",
      description:
        "Büfé a Győri Szakképzési Centrum Jedlik Ányos Gépipari és Informatikai iskolában. Széles választék, gyors kiszolgálás.",
      ownerId: 4,
    };
  }

  constructor() {}

  ngOnInit() {}
}
