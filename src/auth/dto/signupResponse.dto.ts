import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse, Status } from 'src/utils/responseJson';
import { User } from '../user.entity';

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
