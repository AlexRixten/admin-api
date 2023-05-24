import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../modules/user/models/user.model';
import { Watchlist } from '../modules/watchlist/models/watchlist.model';

export const getDBConfig = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => ({
  uri: getDBString(configService),
  ...getDBOptions(),
});

const getDBString = (configService: ConfigService) => {
  //   dialect: 'postgres',
  //   host: configService.get('db_host'),
  //   port: configService.get('db_port'),
  //   username: configService.get('db_user'),
  //   password: configService.get('db_password'),
  //   database: configService.get('db_name'),
  //   synchronize: true,
  //   autoLoadModels: true,
  //   models: [],
  const db_url =
    'postgres://' +
    configService.get('db_user') +
    ':' +
    configService.get('db_password') +
    '@' +
    configService.get('db_host') +
    ':' +
    configService.get('db_port') +
    '/' +
    configService.get('db_name');
  console.log(db_url);
  return db_url;
};

const getDBOptions = () => ({
  synchronize: true,
  autoLoadModels: true,
  models: [User, Watchlist],
});
