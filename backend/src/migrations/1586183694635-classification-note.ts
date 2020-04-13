import {MigrationInterface, QueryRunner} from "typeorm";

export class classificationNote1586183694635 implements MigrationInterface {
    name = 'classificationNote1586183694635'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "classification" ADD "note" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "classification" DROP COLUMN "note"`, undefined);
    }

}
