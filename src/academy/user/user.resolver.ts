import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput } from 'src/schema/graphql.schema';
import UserVideosLoader from '../loader/uservideos.loader';
import VideoLoader from '../loader/video.loader';
import { Video } from '../video/entity/video.entity';
import { SpeakerService } from '../videospeaker/speaker.service';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userVideosLoader: UserVideosLoader,
  ) {}

  @Query('getUser')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Query('getUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation('updateUser')
  update(
    @Args('id') userId,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(userId, updateUserInput);
  }

  @Mutation('removeUser')
  remove(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @ResolveField('video')
  async videos(user) {
    const videosOfUser = await this.userVideosLoader.getUserVideosLoader().load(user.id);
    return videosOfUser;
  }
}
