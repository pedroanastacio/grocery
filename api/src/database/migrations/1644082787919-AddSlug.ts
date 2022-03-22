import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSlug1644082787919 implements MigrationInterface {
    name = 'AddSlug1644082787919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "product" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "slug"`);
    }

}
