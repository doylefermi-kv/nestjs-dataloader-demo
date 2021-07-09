import { Injectable, Scope } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as DataLoader from 'dataloader';
import { VideoService } from '../video/video.service';
import { Video } from '../video/entity/video.entity';
 
@Injectable({ scope: Scope.REQUEST })
export default class VideoLoader {
  videoLoader: DataLoader<string, Video>;

  constructor(
    private videoService: VideoService,
  ) {
    this.videoLoader = new DataLoader<string, Video>(this.getVideosByIds)
  }

  getVideosByIds = async (ids: string[]): Promise<Video[]> => {
    const videos = await this.videoService.findByIds(ids);
    const videoMap: { [key: string]: Video } = {};
    videos.forEach((video) => (videoMap[video.id] = video));

    return ids.map((id) => videoMap[id]);
  };

  public getVideoDataLoader(): DataLoader<string, Video> {
    return this.videoLoader;
  }
}