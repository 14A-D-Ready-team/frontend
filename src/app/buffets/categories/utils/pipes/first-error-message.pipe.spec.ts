import { FirstErrorMessagePipe } from "./first-error-message.pipe";

describe("ErrorMessagePipe", () => {
  it("create an instance", () => {
    const pipe = new FirstErrorMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
