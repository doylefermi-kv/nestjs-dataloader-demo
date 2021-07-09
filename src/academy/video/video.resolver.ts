import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateVideoInput, UpdateVideoInput } from 'src/schema/graphql.schema';
import { User } from '../user/entity/user.entity';
import { SpeakerService } from '../videospeaker/speaker.service';
import { VideoService } from './video.service';

@Resolver('Video')
export class VideoResolver {
  constructor(
    private readonly videoService: VideoService,
    private readonly speakerService: SpeakerService,
  ) {}

  @Query('getVideo')
  findOne(@Args('id') id: string) {
    return this.videoService.findOne(id);
  }

  @Query('getVideos')
  findAll() {
    return this.videoService.findAll();
  }

  @ResolveField('speakers')
  async speakers(video) {
    const speakers = await this.speakerService.getSpeakers(video.id);

    const users: User[] = [];
    speakers.forEach(async (speaker) => users.push(speaker.speaker));
    return users;
  }

  @Mutation('createVideo')
  create(@Args('createVideoInput') createVideoInput: CreateVideoInput) {
    return this.videoService.create(createVideoInput);
  }

  @Mutation('updateVideo')
  update(
    @Args('id') videoId,
    @Args('updateVideoInput') updateVideoInput: UpdateVideoInput,
  ) {
    return this.videoService.update(videoId, updateVideoInput);
  }

  @Mutation('removeVideo')
  remove(@Args('id') id: string) {
    return this.videoService.remove(id);
  }
}
