import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Product1603444379047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'seller',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'original_price',
            type: 'money',
            isNullable: false,
          },
          {
            name: 'selling_price',
            type: 'money',
            isNullable: false,
          },
          {
            name: 'qty',
            type: 'int',
            isNullable: false,
            default: 0,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['seller'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products', true);
  }
}
