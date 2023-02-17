import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule, ModalController } from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "app-option-editor-modal",
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: "./option-editor-modal.component.html",
  styleUrls: ["./option-editor-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionEditorModalComponent implements OnInit {
  public sorting$: Observable<boolean>;

  private sortingSubject: BehaviorSubject<boolean>;

  constructor(private modalController: ModalController) {
    this.sortingSubject = new BehaviorSubject<boolean>(false);
    this.sorting$ = this.sortingSubject.asObservable();
  }

  ngOnInit(): void {}

  public close() {
    this.modalController.dismiss();
  }

  public handleReorder(event: any) {
    event.detail.complete();
  }

  public toggleSorting() {
    this.sortingSubject.next(!this.sortingSubject.value);
  }
}
