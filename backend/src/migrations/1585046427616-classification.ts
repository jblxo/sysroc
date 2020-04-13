import {MigrationInterface, QueryRunner} from "typeorm";

export class classification1585046427616 implements MigrationInterface {
    name = 'classification1585046427616'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "classification" ("id" SERIAL NOT NULL, "mark" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "projectId" integer, "userId" integer, CONSTRAINT "PK_1dc9176492b73104aa3d19ccff4" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_6368e7a482976db7bfe7131f240" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_3e635437e1c281e3c3eb3ceb926" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_3e635437e1c281e3c3eb3ceb926"`, undefined);
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_6368e7a482976db7bfe7131f240"`, undefined);
        await queryRunner.query(`DROP TABLE "classification"`, undefined);
    }

}
