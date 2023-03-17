import { Expose } from "class-transformer";

export class CreateInviteTokenDto {
  public static clone(dto: CreateInviteTokenDto) {
    return new CreateInviteTokenDto(dto);
  }

  @Expose()
  public buffetId!: number;

  constructor(model?: Partial<CreateInviteTokenDto>) {
    Object.assign(this, model);
  }
}
