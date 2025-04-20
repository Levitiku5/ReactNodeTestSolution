# Unofficial fork of React & Node.js Skill Test with meeting functionality and improvements

## Additional Features
- Create, view, and delete meetings
- Associate meetings with contacts or leads
- Soft-delete functionality (mark as deleted without data loss)

---

## Prerequisites

- **Node.js** (>= 16)
- **npm** (>= 8)
- **MongoDB** installed locally or available remotely

---

## Environment Setup

1. **Clone the repository**:

```bash
git clone https://github.com/Levitiku5/ReactNodeTestSolution
cd ReactNodeTestSolution
```

2. **Install server dependencies**:

```bash
cd Server
npm install
```

3. **Install client dependencies**:

```bash
cd ../Client
npm install
```

4. **Set up MongoDB** (if you don't already have it installed):

```bash
# Install MongoDB (Ubuntu example)
sudo apt update
sudo apt install -y mongodb

# Start MongoDB service
sudo systemctl start mongodb
```

5. **Copy example environment variables**:

```bash
# Copy .env.example to .env in Server/
cd ../Server
cp .env.example .env

# Edit your .env file if necessary. The provided examples work out of the box
vim .env
```

6. **Start the backend server**:

```bash
cd Server
npm run dev
```

7. **Start the frontend React app**:

```bash
cd ../Client
npm start
```

---

## Important Notes

- **MongoDB must be running** for the backend to connect.
- The backend uses **soft deletes** (meetings are marked `deleted: true` instead of permanently removed).
- Admin Login: ✓ email: admin@gmail.com  ✓ password: admin123
