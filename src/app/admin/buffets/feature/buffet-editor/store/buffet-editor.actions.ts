export class Update {
  public static readonly type = "[BuffetEditor] Update";
  
  public id: string

  constructor(inputId: string) {
    this.id = inputId;
  }
}