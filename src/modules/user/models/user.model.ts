import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Watchlist } from '../../watchlist/models/watchlist.model';

@Table
export class User extends Model {
  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  patronymic: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  watchlist: Watchlist[];
}
