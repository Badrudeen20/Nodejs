-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categories_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "folder_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "files_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_files" ("categories_id", "created_at", "folder_name", "id", "parent_id", "updated_at") SELECT "categories_id", "created_at", "folder_name", "id", "parent_id", "updated_at" FROM "files";
DROP TABLE "files";
ALTER TABLE "new_files" RENAME TO "files";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
