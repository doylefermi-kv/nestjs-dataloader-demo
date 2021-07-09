import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { User } from '../user/entity/user.entity';
import { Speaker } from '../videospeaker/entity/speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
 
@Injectable({ scope: Scope.REQUEST })
export default class VideoUsersLoader {
  videoUsersLoader: DataLoader<string, User[]>;

  constructor(
    @InjectRepository(Speaker) private speakerRepository: Repository<Speaker>,
  ) {
    this.videoUsersLoader = new DataLoader<string, User[]>(this.getUsersByVideoIds);
  }
 
  getUsersByVideoIds = async (videoIds: string[]) => {
    const videoUsers = await this.speakerRepository.find({
      where: { videoId: In(videoIds) },
      relations: ['speaker'],
    });

    const videoUserMap: { [key: string]: User[] } = {};

    videoUsers.map((videoUser: Speaker) => {
      if(!(videoUserMap[videoUser.videoId])) {
        videoUserMap[videoUser.videoId] = [];
      } 
        videoUserMap[videoUser.videoId].push((videoUser.speaker));
      
    })
    return videoIds.map(videoId => videoUserMap[videoId]);
  };

  public getUserVideosLoader(): DataLoader<string, User[]> {
    return this.videoUsersLoader;
  }

}