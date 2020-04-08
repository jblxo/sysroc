import { MigrationInterface, QueryRunner } from 'typeorm';

export class manyToOneProjectSupervisor1586270085383 implements MigrationInterface {
    name = 'manyToOneProjectSupervisor1586270085383'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" ADD "supervisorId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_1cba70fecafe255d7cb2cd5673a" FOREIGN KEY ("supervisorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_1cba70fecafe255d7cb2cd5673a"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "supervisorId"`, undefined);
    }

}
