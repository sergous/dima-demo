/*
  Warnings:

  - You are about to alter the column `year` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "model" TEXT,
    "year" INTEGER,
    "vin" INTEGER
);
INSERT INTO "new_Car" ("color", "createdAt", "id", "model", "name", "updatedAt", "vin", "year") SELECT "color", "createdAt", "id", "model", "name", "updatedAt", "vin", "year" FROM "Car";
DROP TABLE "Car";
ALTER TABLE "new_Car" RENAME TO "Car";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
