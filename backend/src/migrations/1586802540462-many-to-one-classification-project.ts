import { MigrationInterface, QueryRunner } from 'typeorm';

export class manyToOneClassificationProject1586802540462 implements MigrationInterface {
    name = 'manyToOneClassificationProject1586802540462'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_6368e7a482976db7bfe7131f240"`, undefined);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "projectId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_6368e7a482976db7bfe7131f240" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "classification" DROP CONSTRAINT "FK_6368e7a482976db7bfe7131f240"`, undefined);
        await queryRunner.query(`ALTER TABLE "classification" ALTER COLUMN "projectId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "classification" ADD CONSTRAINT "FK_6368e7a482976db7bfe7131f240" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
