import { MigrationInterface, QueryRunner } from 'typeorm';

export class projectsTimestamps1586802560083 implements MigrationInterface {
    name = 'projectsTimestamps1586802560083'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "created_at"`, undefined);
    }

}
