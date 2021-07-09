import { User } from 'src/academy/user/entity/user.entity';
import { Video } from 'src/academy/video/entity/video.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('video_speaker')
export class Speaker {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'video_id' })
  videoId: string;

  @ManyToOne(() => User, (user) => user.videos, { primary: true })
  @JoinColumn({ name: 'user_id' })
  speaker: User;

  @ManyToOne(() => Video, (video) => video.speakers, { primary: true })
  @JoinColumn({ name: 'video_id' })
  video: Video;
}
