-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_docs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_id" INTEGER,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "docs_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_docs" ("created_at", "file_id", "id", "name", "type", "updated_at") SELECT "created_at", "file_id", "id", "name", "type", "updated_at" FROM "docs";
DROP TABLE "docs";
ALTER TABLE "new_docs" RENAME TO "docs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
