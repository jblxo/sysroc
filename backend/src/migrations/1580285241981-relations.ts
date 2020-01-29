import {MigrationInterface, QueryRunner} from "typeorm";

export class relations1580285241981 implements MigrationInterface {
    name = 'relations1580285241981'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_98d481413dbe5578ad2a45ab863" PRIMARY KEY ("userId", "groupId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_84ff6a520aee2bf2512c01cf46" ON "user_groups_group" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_8abdfe8f9d78a4f5e821dbf620" ON "user_groups_group" ("groupId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_groups_group" ADD CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_groups_group" DROP CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8abdfe8f9d78a4f5e821dbf620"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_84ff6a520aee2bf2512c01cf46"`, undefined);
        await queryRunner.query(`DROP TABLE "user_groups_group"`, undefined);
    }

}
