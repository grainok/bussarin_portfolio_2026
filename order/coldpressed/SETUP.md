# Morning Fresh Orders deployment

Target: https://www.busssio.com/order/coldpressed/

## Required setup (do not put secrets in GitHub)

1. Create a Supabase project, run `schema.sql` in SQL editor.
2. Configure these **server-only** Vercel environment variables for Production and Preview:
   - `SUPABASE_URL` — Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase service-role key, never expose in client code
   - `MF_SESSION_SECRET` — cryptographically random secret, 32+ bytes
   - `MF_PASSWORD_HASH` — `salt:hex_scrypt_hash` (not plaintext)
3. Generate password hash locally with Node.js (replace password locally, not in chat):
   `node -e "const c=require('node:crypto');const s=c.randomBytes(16).toString('hex');const p=process.env.MF_ADMIN_PASSWORD;if(!p)throw Error('Set MF_ADMIN_PASSWORD locally');console.log(s+':'+c.scryptSync(p,s,32).toString('hex'))"`
4. Check Vercel's root directory points at repository root. Ensure serverless function `/api/coldpressed` is deployed.
5. Preview test: wrong password blocked; login works; create, edit, reload, logout, login again; test two phones; export CSV; confirm old public pages still work.
6. Verify the Vercel project is connected to the intended production domain, then merge the feature PR after review.
7. Set up independent automated Supabase backups/PITR according to the available plan, and periodically export CSV. No backup job is included in this code.

Security: public GitHub repo must contain no customer data, passwords or database credentials. Password is shared by two people, so actions cannot be attributed individually. Session cookies are HttpOnly, Secure, SameSite=Strict. The server uses Supabase service-role credentials; RLS is enabled and no public policies are created.

Note: The original 18 Oct 2026 order is marked pending, not cancelled; payment/delivery statuses remain false until confirmed. Initial 8 records are imported via the protected button only once.
