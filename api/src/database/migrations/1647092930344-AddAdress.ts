import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdress1647092930344 implements MigrationInterface {
    name = 'AddAdress1647092930344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adress" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "zip" character varying NOT NULL, "country" character varying NOT NULL, "city" character varying NOT NULL, "neighborhood" character varying NOT NULL, "patio" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_f108093ea9cd9f59d72c2f1a057" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "adress" ADD CONSTRAINT "FK_bc97dfcac69908fb9f4b8ed1b24" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adress" DROP CONSTRAINT "FK_bc97dfcac69908fb9f4b8ed1b24"`);
        await queryRunner.query(`DROP TABLE "adress"`);
    }

}
