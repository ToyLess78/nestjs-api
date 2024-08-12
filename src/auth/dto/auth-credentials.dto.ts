import { IsEmail, IsOptional, Matches, IsNotEmpty } from 'class-validator';
import { ValidationMessages } from '../constants/validation-messages';

export class AuthCredentialsDto {
  @IsEmail({}, { message: ValidationMessages.INVALID_EMAIL })
  @IsNotEmpty({ message: ValidationMessages.EMAIL_REQUIRED })
  email: string;

  @Matches(/^(?=.{3,20}$)((?!\s).)*$/, {
    message: ValidationMessages.INVALID_PASSWORD,
  })
  @IsNotEmpty({ message: ValidationMessages.PASSWORD_REQUIRED })
  password: string;

  @Matches(/^(?=.{3,20}$)[A-Za-z]+(?:\s[A-Za-z]+)?$/, {
    message: ValidationMessages.INVALID_FULL_NAME,
  })
  @IsOptional()
  fullName?: string;
}
