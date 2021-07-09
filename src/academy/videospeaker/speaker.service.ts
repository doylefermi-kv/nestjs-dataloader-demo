import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddSpeakerInput } from 'src/schema/graphql.schema';
import { In, Repository } from 'typeorm';
import { Speaker } from './entity/speaker.entity';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker) private speakerRepository: Repository<Speaker>,
  ) {}

  async create(addSpeakerInput: AddSpeakerInput): Promise<Speaker> {
    const newSpeaker = await this.speakerRepository.create(addSpeakerInput);
    const createdSpeaker: Speaker = await this.speakerRepository.save(
      newSpeaker,
    );

    const savedSpeaker = await this.speakerRepository.find({
      where: {
        videoId: createdSpeaker.videoId,
        userId: createdSpeaker.userId,
      },
    });
    if (savedSpeaker[0]) {
      return savedSpeaker[0];
    }
    throw new BadRequestException('Could not add speaker');
  }

  async getSpeakers(videoId): Promise<Speaker[]> {
    const speakers = await this.speakerRepository.find({
      where: { videoId },
    });
    return speakers;
    // const speakers = await this.speakerRepository.find({
    //   where: { videoId },
    // });
    // const speakersArray: string[] = [];
    // speakers.forEach(async (speaker) => speakersArray.push(speaker.userId));
    // return speakersArray;
  }

  async getVideos(userId): Promise<Speaker[]> {
    const videos = await this.speakerRepository.find({
      where: { userId },
      // relations: ['video'],
    });
    return videos;
  }

  async getSpeakersByIds(videoId): Promise<Speaker[]> {
    const speakers = await this.speakerRepository.find({
      where: { videoId: In(videoId) },
    });
    return speakers;
  }
}
