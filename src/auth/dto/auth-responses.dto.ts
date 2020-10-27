import { ApiProperty } from '@nestjs/swagger';
import { Status, BaseResponse } from 'src/utils/responseJson';
import { User } from '../../user/user.entity';

export class ISignInResponseData {
  token: string;
  user: User;
}

export class ISignInResponse implements BaseResponse<ISignInResponseData> {
  @ApiProperty({
    enum: Status,
    enumName: 'Status',
  })
  status: Status;
  message: string;
  data: ISignInResponseData;
}

export class ISignUpResponseData {
  token: string;
  user: User;
}

export class ISignUpResponse implements BaseResponse<ISignUpResponseData> {
  @ApiProperty({
    enum: Status,
    enumName: 'Status',
  })
  status: Status;
  message: string;
  data: ISignUpResponseData;
}
