import { MigrationInterface, QueryRunner, Table } from 'typeorm';

enum ECurrency {
  RON = 'RON',
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  CHF = 'CHF',
}

export class CreateExchangeRatesTable1725785655434
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE currency AS ENUM ('${Object.values(ECurrency).join("', '")}');
    `);

    await queryRunner.createTable(
      new Table({
        name: 'exchange_rates',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'origin',
            type: 'currency',
            enum: Object.values(ECurrency),
            enumName: 'currency',
            isNullable: false,
          },
          {
            name: 'destination',
            type: 'currency',
            enum: Object.values(ECurrency),
            enumName: 'currency',
            isNullable: false,
          },
          {
            name: 'rate',
            type: 'decimal',
            precision: 16,
            scale: 8,
            isNullable: false,
          },
          {
            name: 'exchange_rate_date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exchange_rates');
    await queryRunner.query('DROP TYPE currency;');
  }
}
