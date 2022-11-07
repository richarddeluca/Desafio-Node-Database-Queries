import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne(
      user_id,
      { relations: ["games"] }
    );

    if (!user) {
      throw new Error("Usuário não encontrado. O tipo 'User | undefined' não pode ser atribuído ao tipo 'User'.");
    }

    return user;
    // Completado usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(
      `SELECT * FROM users ORDER BY first_name ASC`
    ); // Completado usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      `SELECT * FROM users WHERE Lower(first_name) = Lower($1) AND Lower(last_name) = Lower($2)`,
      [first_name, last_name]
    ); // Completado usando raw query
  }
}
