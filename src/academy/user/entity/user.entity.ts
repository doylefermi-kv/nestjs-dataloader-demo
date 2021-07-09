import { Speaker } from 'src/academy/videospeaker/entity/speaker.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @OneToMany(() => Speaker, (speaker) => speaker.videoId)
  videos: Promise<Speaker[]>;
}
