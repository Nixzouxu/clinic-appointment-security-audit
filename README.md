# Clinic Appointment API : Security Audit Project

Repository ini berisi aplikasi backend yang SENGAJA dibuat dengan vulnerability
untuk keperluan pembelajaran security testing dan portfolio audit keamanan
aplikasi web. JANGAN gunakan pattern kode di branch `vulnerable-version`
sebagai referensi untuk aplikasi production.

## Konteks

Proyek ini dibuat untuk mendemonstrasikan kemampuan mengidentifikasi,
mengeksploitasi (secara etis), dan memperbaiki vulnerability umum pada
aplikasi web berbasis OWASP Top 10, menggunakan stack yang biasa saya
gunakan sehari-hari (Node.js, Express, PostgreSQL, Prisma).

## Struktur Branch

- `vulnerable-version`: kode asli dengan 5 vulnerability tertanam sengaja
- `hardened-version`: kode setelah remediasi lengkap

## Vulnerability yang Ditemukan

1. SQL Injection (A03:2021)
2. Broken Authentication — plaintext password & JWT tanpa expiry (A07:2021)
3. Insecure Direct Object Reference / IDOR (A01:2021)
4. Missing Rate Limiting
5. Sensitive Data Exposure

Detail lengkap tiap temuan (proof of concept, impact, root cause, remediation)
ada di `SECURITY_AUDIT.md`.

## Tech Stack

Node.js, Express.js, PostgreSQL, Prisma ORM, JWT, bcrypt