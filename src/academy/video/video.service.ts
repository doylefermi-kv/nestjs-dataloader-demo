import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVideoInput, UpdateVideoInput } from 'src/schema/graphql.schema';
import { In, Repository } from 'typeorm';
import { Video } from './entity/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  async findOne(id: string): Promise<Video> {
    const video = await this.videoRepository.findOne(id);
    if (video) {
      return video;
    }
    throw new NotFoundException(`Video ${id} does not exist`);
  }

  async findAll(): Promise<Video[]> {
    return await this.videoRepository.find();
  }

  async create(createVideoInput: CreateVideoInput): Promise<Video> {
    const newVideo = await this.videoRepository.create(createVideoInput);
    const createdVideo: Video = await this.videoRepository.save(newVideo);

    const savedVideo = await this.videoRepository.findOne(createdVideo.id);
    if (savedVideo) {
      return savedVideo;
    }
    throw new BadRequestException('Could not create video');
  }

  async update(id: string, updateVideoInput: UpdateVideoInput): Promise<Video> {
    const newVideo = await this.videoRepository.create(updateVideoInput);
    await this.videoRepository.update(id, newVideo);
    const updatedVideo = await this.findOne(id);
    return updatedVideo;
  }

  async remove(id: string): Promise<Video> {
    const video = await this.findOne(id);
    await this.videoRepository.remove(video);
    return { ...video, id: '-1' };
  }

  async findByIds(id): Promise<Video[]> {
    const video = await this.videoRepository.find({
      where: { id: In(id) },
    });
    return video;
  }
}
