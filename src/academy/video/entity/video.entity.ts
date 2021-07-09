import { User } from 'src/academy/user/entity/user.entity';
import { Speaker } from 'src/academy/videospeaker/entity/speaker.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  public name!: string;

  @OneToMany(() => Speaker, (speaker) => speaker.userId)
  speakers: Promise<User[]>;
}
