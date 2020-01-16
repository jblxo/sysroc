import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { ADUser } from './models/ad-user.model';
import { ADResponse } from './models/ad-response.model';
import { map } from 'rxjs/operators';
import { UserAuthInputDto } from '../users/dto/user-auth.dto';

@Injectable()
export class ActiveDirectoryService {
  private ADEndpoint: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.ADEndpoint = config.get('AD_ENDPOINT');
  }

  async authUser(auth: UserAuthInputDto): Promise<ADUser> {
    const { email: username, password } = auth;

    const ADResponse: ADResponse = await this.httpService
      .post(this.ADEndpoint, {
        username,
        password,
      })
      .pipe(map(response => response.data))
      .toPromise();

    return ADResponse.user;
  }
}
