export class NoBuffetSelectedException extends Error {
  public customError = true;

  public errorMessage = "Nem választott büfét.";
}
