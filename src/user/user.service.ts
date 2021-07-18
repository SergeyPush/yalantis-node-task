import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { path } from 'app-root-path';
import { writeFile } from 'fs-extra';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { convertImage } from './utils/convert-image';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async saveUser(
    userDto: CreateUserDto,
    photo: Express.Multer.File,
  ): Promise<User> {
    const { firstName, secondName, email } = userDto;
    if (!photo) {
      throw new BadRequestException('Photo is required');
    }
    const uploadDir = `${path}/public`;
    const fileName = `${Date.now()}-${photo.originalname}`;
    const buffer = await convertImage(photo.buffer);
    await writeFile(`${uploadDir}/${fileName}`, buffer);

    const user = new User();
    user.firstName = firstName;
    user.secondName = secondName;
    user.email = email;
    user.photo = fileName;
    return this.userRepository.save(user);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(`User with ${id} does not exists`);
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
