import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AddSpeakerInput,
  CreateUserInput,
  UpdateUserInput,
} from 'src/schema/graphql.schema';
import { SpeakerService } from './speaker.service';

@Resolver('Speaker')
export class SpeakerResolver {
  constructor(private readonly speakerService: SpeakerService) {}

  @Mutation('addSpeaker')
  create(@Args('addSpeakerInput') addSpeakerInput: AddSpeakerInput) {
    return this.speakerService.create(addSpeakerInput);
  }
}
