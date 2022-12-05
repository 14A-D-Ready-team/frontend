import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import {
  Category,
  CategoryState,
  EditCategoryDto,
  EditStatus,
} from "@shared/category";
import { Observable, take } from "rxjs";
import { CategoryEditorFormModel } from "../../utils";
import {
  StopEdit,
  LoadPage,
  SaveEdit,
  Edit,
  Delete,
  Reload,
  CategoriesListState,
  Create,
} from "./store";
import { RefresherCustomEvent } from "@ionic/angular";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.page.html",
  styleUrls: ["./categories-list.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListPage implements OnInit {
  onCreatingDone($event: boolean) {
    throw new Error("Method not implemented.");
  }
  @Select(CategoriesListState.categories)
  public categories$!: Observable<Category[]>;

  @Select(CategoriesListState.creatingNew)
  public creatingNew$!: Observable<boolean>;

  @Select(CategoriesListState.editedId)
  public editedId$!: Observable<number>;

  @Select(CategoryState.updateStatus)
  public updateStatus$!: Observable<EditStatus | undefined>;

  @Select(CategoryState.createStatus)
  public createStatus$!: Observable<EditStatus | undefined>;

  @Select(CategoryState.loading)
  public loading$!: Observable<boolean>;

  @Select(CategoryState.error)
  public error$!: Observable<any>;

  public createForm: FormGroup<CategoryEditorFormModel>;

  public updateForm: FormGroup<CategoryEditorFormModel>;

  constructor(private store: Store) {
    this.createForm = new FormGroup<CategoryEditorFormModel>({
      name: new FormControl("", {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });

    this.updateForm = new ClassValidatorFormGroup<CategoryEditorFormModel>(
      EditCategoryDto,
      {
        name: new ClassValidatorFormControl(""),
      },
    );
  }

  public ngOnInit() {
    this.store.dispatch(new LoadPage());
  }

  public retryLoading() {
    this.store.dispatch(new Reload());
  }

  public handleRefresh(event: any) {
    const refresherEvent = event as RefresherCustomEvent;
    return this.store
      .dispatch(new Reload())
      .pipe(take(1))
      .subscribe(() => refresherEvent.detail.complete());
  }

  public create() {
    this.store.dispatch(new Create());
  }

  public onEditing(category: Category) {
    this.store.dispatch(new Edit(category));
  }

  public onEditingDone(isSaved: boolean) {
    this.store.dispatch(isSaved ? new SaveEdit() : new StopEdit());
  }

  public onDelete(id: number) {
    this.store.dispatch(new Delete(id));
  }

  public categoryById(index: number, el: Category): number {
    return el.id;
  }
}
