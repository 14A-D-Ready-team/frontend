import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import {
  Category,
  CategoryActions,
  CategoryState,
  UpdateStatus,
} from "@shared/category";
import { Observable, take, tap } from "rxjs";
import { CategoryEditorFormModel } from "../../utils";
import {
  StopEdit,
  LoadPage,
  SaveEdit,
  Edit,
  Delete,
  Reload,
  CategoriesListState,
} from "./store";
import { RefresherCustomEvent } from "@ionic/angular";
import { UpdateForm, UpdateFormValue } from "@ngxs/form-plugin";

@Component({
  selector: "app-categories-list",
  templateUrl: "./categories-list.page.html",
  styleUrls: ["./categories-list.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListPage implements OnInit {
  @Select(CategoriesListState.categories)
  public categories$!: Observable<Category[]>;

  @Select(CategoriesListState.editedId)
  public editedId$!: Observable<number>;

  @Select(CategoryState.updateStatus)
  public updateStatus$!: Observable<UpdateStatus | undefined>;

  @Select(CategoryState.loading)
  public loading$!: Observable<boolean>;

  @Select(CategoryState.error)
  public error$!: Observable<any>;

  public editorForm: FormGroup<CategoryEditorFormModel>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.editorForm = fb.group<CategoryEditorFormModel>({
      id: new FormControl(null),
      name: new FormControl("", { nonNullable: true }),
    });
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
