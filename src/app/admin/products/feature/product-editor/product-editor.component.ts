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
import { IonicModule, Platform } from "@ionic/angular";
import { NgxsFormPluginModule } from "@ngxs/form-plugin";
import { Category, CategoryState } from "@shared/category";
import { ErrorMessagePipe } from "@shared/exceptions";
import { ErrorCardComponent } from "@shared/exceptions/ui/ionic";
import { ApiRequestStatus } from "@shared/extended-entity-state";
import {
  ClearInputButtonComponent,
  ErrorListComponent,
  ImageSelectorComponent,
  SelectorInputComponent,
} from "@shared/inputs/ui/ionic";
import { map, Observable, startWith } from "rxjs";
import { CustomizationEditorComponent } from "../customization-editor";
import { ProductEditorFormModel } from "../../utils";
import { Select } from "@ngxs/store";
import { ExtendedFormPluginModule } from "@shared/extended-form-plugin";

@Component({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    ExtendedFormPluginModule,
    ClearInputButtonComponent,
    ErrorCardComponent,
    ImageSelectorComponent,
    ErrorMessagePipe,
    ErrorListComponent,
    SelectorInputComponent,
    CustomizationEditorComponent,
  ],
  standalone: true,
  selector: "app-admin-product-editor",
  templateUrl: "./product-editor.component.html",
  styleUrls: ["./product-editor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditorComponent implements OnInit {
  @Input()
  public status!: ApiRequestStatus | undefined;

  @Input()
  public bindedFormGroup!: FormGroup<ProductEditorFormModel>;

  @Input()
  public formPath!: string;

  @Select(CategoryState.entities)
  public categories$!: Observable<Category[]>;

  @Select(CategoryState.loading)
  public categoriesLoading$!: Observable<boolean>;

  public isDesktop$ = this.platform.resize.pipe(
    startWith(undefined),
    map(() => this.platform.width() >= 1200),
  );

  @Output()
  public categoriesReloaded = new EventEmitter<void>();

  constructor(private platform: Platform) {}

  ngOnInit(): void {}
}
