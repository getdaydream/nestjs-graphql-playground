import { createConnection, Connection } from 'typeorm';
import signale from 'signale';

export class DatabaseConnection {
  static connection: Connection;

  static async open() {
    this.connection = await createConnection({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/entity/*.{ts,js}'],
      charset: 'utf8mb4',
      synchronize: true,
    });
    signale.success('Connect database success.');
  }

  static async close() {
    await this.connection.close();
  }
}
