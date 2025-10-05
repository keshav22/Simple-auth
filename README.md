# Simple auth
A simple full-stack authentication and role based restriction app built using **Next.js** for frontend backend, and **Supabase (PostgreSQL)** as the database.

## Notes
- All config variables(DB, API_PREFIX, JWT_SECRET etc.)  are controlled via .env files so create one.
```
.env 
JWT_SECRET=[ADD_YOUR_VALUE]
NEXT_PUBLIC_SUPABASE_URL=[ADD_YOUR_VALUE]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ADD_YOUR_VALUE]

Please create .env.local .env.production for having different keys as per environment.

```
- The app does **not** support registration; use the test accounts provided.
- You will need to setup tables in your supabase portal

## Setup Instructions

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup Instructions

### 🗄️ Database Schema (Supabase)

This database supports authentication, role management, and audit logging.

---

#### **1️⃣ users**

| Column | Type | Description |
|---------|------|-------------|
| `id` | `int8` | Primary key, unique user ID |
| `email` | `varchar` | User’s email address (unique) |
| `password_hash` | `varchar` | Hashed password using bcrypt |
| `role` | `varchar` | `'user'` or `'admin'` |
| `status` | `varchar` | `'active'` or `'blocked'` |
| `created_at` | `timestamp` | Time of user creation (default: `now()`) |

**Notes:**
- From supabase portal add 2 users one with admin access and one without.

---

#### **2️⃣ projects**

| Column | Type | Description |
|---------|------|-------------|
| `id` | `int8` | Primary key, unique project ID |
| `name` | `varchar` | Name of the project |
| `owner_id` | `int8` | user id |
| `created_at` | `timestamp` | Time of project creation (default: `now()`) |

**Notes:**
- From supabase portal add 2-3 projects linking to both the users added above.

---

#### **3️⃣ tasks**

| Column | Type | Description |
|---------|------|-------------|
| `id` | `int8` | Primary key, unique task ID |
| `project_id` | `int8` | project id  |
| `title` | `varchar` | Name of the task |
| `status` | `varchar` | `'new'`, `'in_progress'`, `'done'` |
| `created_at` | `timestamp` | Time of task creation (default: `now()`) |

**Notes:**
- From supabase portal add 2-3 taks linking to different projects added above

---

#### **4️⃣ audit_logs**

| Column | Type | Description |
|---------|------|-------------|
| `id` | `int8` | Primary key, unique log entry ID |
| `ts` | `timestamp` | Timestamp of the logged action (default: `now()`) |
| `actor_user_id` | `int8` | ID of the user performing the action |
| `action` | `varchar` | Type of action performed (`login.success`, `project.view`, etc.) |
| `entity_type` | `varchar` | Type of entity affected (`user`, `project`, `task`) |
| `entity_id` | `int8` | ID of the entity involved in the action |
| `result` | `varchar` | `'success'` or `'fail'` |
| `ip` | `text` | IP address of the user (as text) |

**Notes:**
- Every significant event (login, view, block/unblock) is recorded.
- Useful for audit and monitoring.

### Install dependencies:

```bash
npm install
# or
yarn install
#or
pnpm install
```

### Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To-Do / Enhancements

- [ ] Add middleware or HOCs for audit logging
- [ ] Add signup page
- [ ] Add edit, delete & add functionalities for projects and tasks
- [ ] Add JWT refresh mechanism in token so that user doesn't have to re-login every hour
- [ ] Create more common components in frontend and use it
- [ ] Add a single api file to handle all fetch protocols in frontend. (Better for handling error codes in a single place.)

## License

This project is open source and available under the MIT License.