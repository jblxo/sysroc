import {MigrationInterface, QueryRunner} from "typeorm";

export class projectTask1580295775493 implements MigrationInterface {
    name = 'projectTask1580295775493'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "task" ADD "projectId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_3797a20ef5553ae87af126bc2fe"`, undefined);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "projectId"`, undefined);
        await queryRunner.query(`DROP TABLE "project"`, undefined);
    }

}
