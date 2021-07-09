import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput, UpdateUserInput } from 'src/schema/graphql.schema';
import { In, Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user) {
      return user;
    }
    throw new NotFoundException(`User ${id} does not exist`);
  }

  async findByIds(id): Promise<User[]> {
    const user = await this.userRepository.find({
      where: { id: In(id) },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = await this.userRepository.create(createUserInput);
    const createdUser: User = await this.userRepository.save(newUser);

    const savedUser = await this.userRepository.findOne(createdUser.id);
    if (savedUser) {
      return savedUser;
    }
    throw new BadRequestException('Could not create user');
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const newUser = await this.userRepository.create(updateUserInput);
    await this.userRepository.update(id, newUser);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { ...user, id: '-1' };
  }
}
