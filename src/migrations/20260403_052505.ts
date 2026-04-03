import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_posts_category" AS ENUM('ai', 'web', 'business', 'case-study');
  CREATE TYPE "public"."enum_about_page_values_icon" AS ENUM('brain', 'target', 'shield-check', 'handshake', 'zap', 'heart');
  CREATE TABLE "services_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "blog_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb,
  	"author" varchar DEFAULT 'Agency Team',
  	"category" "enum_blog_posts_category",
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_page_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"linkedin" varchar
  );
  
  CREATE TABLE "about_page_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_about_page_values_icon"
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar DEFAULT 'We Help Businesses Grow with AI',
  	"story" varchar,
  	"mission" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "services" ADD COLUMN "problem_statement" varchar;
  ALTER TABLE "services" ADD COLUMN "long_description" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_posts_id" integer;
  ALTER TABLE "services_benefits" ADD CONSTRAINT "services_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_team" ADD CONSTRAINT "about_page_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_benefits_order_idx" ON "services_benefits" USING btree ("_order");
  CREATE INDEX "services_benefits_parent_id_idx" ON "services_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "about_page_team_order_idx" ON "about_page_team" USING btree ("_order");
  CREATE INDEX "about_page_team_parent_id_idx" ON "about_page_team" USING btree ("_parent_id");
  CREATE INDEX "about_page_values_order_idx" ON "about_page_values" USING btree ("_order");
  CREATE INDEX "about_page_values_parent_id_idx" ON "about_page_values" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_benefits" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "about_page_team" CASCADE;
  DROP TABLE "about_page_values" CASCADE;
  DROP TABLE "about_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_posts_fk";
  
  DROP INDEX "payload_locked_documents_rels_blog_posts_id_idx";
  ALTER TABLE "services" DROP COLUMN "problem_statement";
  ALTER TABLE "services" DROP COLUMN "long_description";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_posts_id";
  DROP TYPE "public"."enum_blog_posts_category";
  DROP TYPE "public"."enum_about_page_values_icon";`)
}
