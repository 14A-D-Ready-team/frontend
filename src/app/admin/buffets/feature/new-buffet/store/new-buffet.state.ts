import { State } from "@ngxs/store";
import { CreateBuffetDto } from "@shared/buffet";
import { NgxsFormStateModel } from "@shared/extended-form-plugin";

export interface NewBuffetStateModel {
  form: NgxsFormStateModel<CreateBuffetDto>;
}

export const formPath = "newBuffet.form";

@State<NewBuffetStateModel>({
  name: "newBuffet",
  defaults: {
    form: {
      model: new CreateBuffetDto(),
      errors: {},
      dirty: false,
      status: "VALID",
      disabled: false,
      formControlErrors: {},
    },
  },
})
export class NewBuffetState {}