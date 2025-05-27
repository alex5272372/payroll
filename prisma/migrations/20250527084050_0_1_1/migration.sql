-- AlterTable
ALTER TABLE "user" ADD COLUMN     "email_verified" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "session" (
    "session_token" UUID NOT NULL,
    "user_id" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("session_token")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" VARCHAR(100) NOT NULL,
    "token" VARCHAR(80) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_token_pkey" PRIMARY KEY ("identifier","token")
);

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
