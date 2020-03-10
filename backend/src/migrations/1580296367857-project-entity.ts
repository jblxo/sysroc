import {MigrationInterface, QueryRunner} from "typeorm";

export class projectEntity1580296367857 implements MigrationInterface {
    name = 'projectEntity1580296367857'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" ADD "userId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "UQ_7c4b0d3b77eaf26f8b4da879e63" UNIQUE ("userId")`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "UQ_7c4b0d3b77eaf26f8b4da879e63"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "userId"`, undefined);
    }

}
