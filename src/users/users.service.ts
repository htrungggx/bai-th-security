import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(username: string, password: string) {
    const existedUser = await this.userRepo.findOne({
      where: { username },
    });

    if (existedUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      username,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({
      where: { username },
    });
  }

  async findAll() {
    return this.userRepo.find();
  }
}
