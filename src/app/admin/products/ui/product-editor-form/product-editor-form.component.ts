import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { Category } from "@shared/category";
import { ErrorMessagePipe } from "@shared/exceptions";
import { ErrorCardComponent } from "@shared/exceptions/ui/ionic";
import { ApiRequestStatus } from "@shared/extended-entity-state";
import {
  ClearInputButtonComponent,
  ErrorListComponent,
  ImageSelectorComponent,
  SelectorInputComponent,
} from "@shared/inputs/ui/ionic";
import { Observable } from "rxjs";
import { CustomizationEditorComponent } from "../../feature/customization-editor";
import { ProductEditorFormModel } from "../../utils";

@Component({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    ClearInputButtonComponent,
    ErrorCardComponent,
    ImageSelectorComponent,
    ErrorMessagePipe,
    ErrorListComponent,
    SelectorInputComponent,
    CustomizationEditorComponent,
  ],
  standalone: true,
  selector: "app-admin-product-editor-form",
  templateUrl: "./product-editor-form.component.html",
  styleUrls: ["./product-editor-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditorFormComponent implements OnInit {
  @Input()
  public isDesktop$!: Observable<boolean>;

  @Input()
  public categories$!: Observable<Category[]>;

  @Input()
  public status$!: Observable<ApiRequestStatus | undefined>;

  @Input()
  public categoriesLoading$!: Observable<boolean>;

  @Input()
  public bindedFormGroup!: FormGroup<ProductEditorFormModel>;

  @Input()
  public formPath!: string;

  @Output()
  public categoriesReloaded = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
