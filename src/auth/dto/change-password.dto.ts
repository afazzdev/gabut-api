import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDTO {
  @IsNotEmpty()
  current_password: string;

  @IsNotEmpty()
  new_password: string;
}
