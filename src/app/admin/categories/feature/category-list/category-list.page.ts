import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import {
  Category,
  CategoryActions,
  CategoryState,
  EditCategoryDto,
} from "@shared/category";
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subscription,
  switchMap,
  take,
} from "rxjs";
import { CategoryEditorFormModel } from "../../utils";
import {
  StopEdit,
  LoadPage,
  SaveEdit,
  Edit,
  Reload,
  CategoryListState,
  AddNew,
  editorFormPath,
  SaveNew,
  StopAddingNew,
} from "./store";
import {
  ActionSheetController,
  ModalController,
  Platform,
  RefresherCustomEvent,
} from "@ionic/angular";
import {
  ClassValidatorFormControl,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import {
  DeleteConfirmMixin,
  DeleteConfirmModalComponent,
} from "@shared/modals";
import {
  TargetedRequestStatus,
  ApiRequestStatus,
} from "@shared/extended-entity-state/utils";
import { NoBuffetSelectedException } from "@shared/buffet/utils";
import { ActivatedRoute } from "@angular/router";
import { Mixin } from "ts-mixer";
import { AbilityService } from "@casl/angular";
import { AppAbility } from "@app/app-ability.factory";
import { Action } from "@shared/policy";
import { Buffet, BuffetState } from "@shared/buffet";

@Component({
  selector: "app-admin-category-list",
  templateUrl: "./category-list.page.html",
  styleUrls: ["./category-list.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListPage
  extends Mixin(DeleteConfirmMixin)
  implements OnDestroy
{
  @Select(CategoryListState.categories)
  public categories$!: Observable<Category[]>;

  @Select(CategoryListState.creatingNew)
  public creatingNew$!: Observable<boolean>;

  @Select(CategoryListState.editedId)
  public editedId$!: Observable<number>;

  @Select(CategoryState.updateStatus)
  public updateStatus$!: Observable<TargetedRequestStatus | undefined>;

  @Select(CategoryState.createStatus)
  public createStatus$!: Observable<ApiRequestStatus | undefined>;

  @Select(CategoryState.deleteStatus)
  public deleteStatus$!: Observable<TargetedRequestStatus | undefined>;

  @Select(CategoryState.loading)
  public loading$!: Observable<boolean>;

  @Select(CategoryState.error)
  public error$!: Observable<any>;

  @Select(BuffetState.active)
  public activeBuffet$!: Observable<Buffet | undefined>;

  public vm$ = combineLatest([
    this.categories$,
    this.activeBuffet$,
    this.creatingNew$,
    this.editedId$,
    this.updateStatus$,
    this.createStatus$,
    this.deleteStatus$,
    this.loading$,
    this.error$,
    this.abilityService.ability$,
  ]).pipe(
    map(
      ([
        categories,
        activeBuffet,
        creatingNew,
        editedId,
        updateStatus,
        createStatus,
        deleteStatus,
        loading,
        error,
        ability,
      ]) => ({
        categories,
        creatingNew,
        editedId,
        updateStatus,
        deleteStatus,
        createPending: createStatus?.loading === true,
        loading,
        error,
        noBuffetSelected: error instanceof NoBuffetSelectedException,
        canCreateNew: ability.can(
          Action.Create,
          new Category({ buffetId: activeBuffet?.id }),
        ),
      }),
    ),
  );

  public editorForm: FormGroup<CategoryEditorFormModel>;

  private sub: Subscription;

  public get editorFormPath() {
    return editorFormPath;
  }

  constructor(
    private store: Store,
    protected actionSheetController: ActionSheetController,
    protected modalController: ModalController,
    protected platform: Platform,
    private route: ActivatedRoute,
    private abilityService: AbilityService<AppAbility>,
  ) {
    super();
    this.editorForm = new ClassValidatorFormGroup<CategoryEditorFormModel>(
      EditCategoryDto,
      {
        name: new ClassValidatorFormControl(""),
      },
    );

    this.sub = route.url
      .pipe(
        map(() => route.component),
        filter(c => c === CategoryListPage),
        switchMap(() => this.store.dispatch(new LoadPage())),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
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
    this.store.dispatch(new AddNew());
  }

  public onCreatingDone(isSaved: boolean) {
    this.store.dispatch(isSaved ? new SaveNew() : new StopAddingNew());
  }

  public onEditing(category: Category) {
    this.store.dispatch(new Edit(category));
  }

  public onEditingDone(isSaved: boolean) {
    this.store.dispatch(isSaved ? new SaveEdit() : new StopEdit());
  }

  public async onDelete(category: Category) {
    if (!(await this.confirmDelete(`${category.name} kategóriát?`))) {
      return;
    }

    this.store.dispatch(new CategoryActions.Delete(category.id));
  }

  public categoryById(index: number, el: Category): number {
    return el?.id;
  }
}
