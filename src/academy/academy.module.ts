import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserResolver } from './user/user.resolver';
import { AppGraphQLModule } from 'src/graphql/graphql.module';
import { VideoResolver } from './video/video.resolver';
import { VideoService } from './video/video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from 'src/database/database.module';
import { Video } from './video/entity/video.entity';
import { SpeakerResolver } from './videospeaker/speaker.resolver';
import { SpeakerService } from './videospeaker/speaker.service';
import { Speaker } from './videospeaker/entity/speaker.entity';
import UserLoader from './loader/user.loader';
import VideoLoader from './loader/video.loader';
import UserVideosLoader from './loader/uservideos.loader';
import VideoUsersLoader from './loader/videousers.loader';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    AppGraphQLModule,
    TypeOrmModule.forFeature([User, Video, Speaker]),
    DatabaseModule,
  ],
  providers: [
    UserResolver,
    UserService,
    VideoService,
    VideoResolver,
    SpeakerResolver,
    SpeakerService,
    VideoLoader,
    UserLoader,
    UserVideosLoader,
    VideoUsersLoader,
  ],
})
export class AcademyModule {}
