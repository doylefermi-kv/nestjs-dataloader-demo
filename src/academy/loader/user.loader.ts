import { Injectable, Scope } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as DataLoader from 'dataloader';
import { User } from '../user/entity/user.entity';
 
@Injectable({ scope: Scope.REQUEST })
export default class UserLoader {
  userLoader: DataLoader<string, User>;

  constructor(
    private readonly usersService: UserService,
  ) {
    this.userLoader = new DataLoader<string, User>(this.getUsersByIds);
  }
 
  getUsersByIds = async (ids: string[]): Promise<User[]> => {
    const users = await this.usersService.findByIds(ids);
    const userMap: { [key: string]: User } = {};
    users.forEach((user) => (userMap[user.id] = user));

    return ids.map((id) => userMap[id]);
  };

  public getUserDataLoader(): DataLoader<string, User> {
    return this.userLoader;
  }

}