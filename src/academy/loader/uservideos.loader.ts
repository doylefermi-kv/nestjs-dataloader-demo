import { Injectable, Scope } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as DataLoader from 'dataloader';
import { User } from '../user/entity/user.entity';
import { Speaker } from '../videospeaker/entity/speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Video } from '../video/entity/video.entity';
 
@Injectable({ scope: Scope.REQUEST })
export default class UserVideosLoader {
  userVideosLoader: DataLoader<string, Video[]>;

  constructor(
    @InjectRepository(Speaker) private speakerRepository: Repository<Speaker>,
  ) {
    this.userVideosLoader = new DataLoader<string, Video[]>(this.getVideosByUserIds);
  }
 
  getVideosByUserIds = async (userIds: string[]) => {
    const videoUsers = await this.speakerRepository.find({
      where: { userId: In(userIds) },
      relations: ['video'],
    });

    const userVideoMap: { [key: string]: Video[] } = {};

    videoUsers.map((videoUser: Speaker) => {
      if(!(userVideoMap[videoUser.userId])) {
        userVideoMap[videoUser.userId] = [];
      } 
        userVideoMap[videoUser.userId].push((videoUser.video));
      
    })
    return userIds.map(userId => userVideoMap[userId]);
  };

  public getUserVideosLoader(): DataLoader<string, Video[]> {
    return this.userVideosLoader;
  }

}