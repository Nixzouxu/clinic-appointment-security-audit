Payload yang kamu kirim: admin@test.com' OR '1'='1' --
Query yang tereksekusi di database jadi:
SELECT * FROM "User" WHERE email = 'admin@test.com' OR '1'='1' --' AND password = 'anything'
Bagian mengubah sisa query jadi komentar (di-skip), dan OR '1'='1' selalu bernilai true, jadi query ini balik SEMUA row di tabel User — dan kode kamu ambil row pertama (result[0]), yang kebetulan admin.

