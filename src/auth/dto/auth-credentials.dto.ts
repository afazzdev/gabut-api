import {
  IsString,
  MinLength,
  MaxLength,
  // Matches,
  IsEmail,
} from 'class-validator';

export class SignUpCredentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too weak!'})
  password: string;
}

export class SignInCredentialsDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  //   @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too weak!'})
  password: string;
}
