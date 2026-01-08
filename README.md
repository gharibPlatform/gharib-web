# KHATAMAT
A platform for gathering **"Ghoraba" غرباء** (Muslims) in one place where they can read the Quran, discuss, and do Khatmas together inside a group.

## What is a Khatma?
A **Khatma** is when a person or a group reads the Quran or a part of it by splitting it into shares (pages, thomon, hizbs, etc.). Each member reads their assigned share before the specified end time.

---

## Contributing

### Prerequisites
Node.js 18+ and npm/yarn/pnpm/bun

Docker (optional, for containerized deployment)

---

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/gharibPlatform/gharib-web.git
cd gharib-web
```

2. **Install dependencies**
```bash
npm install
yarn install
pnpm nstall
```

3. **Start the dev server**
```bash
npm run dev
yarn dev
pnpm dev
```

4. **Open your browser** and navigate to [localhost:3000](https://localhost:3000)

---

## Docker dev and dep 
  1. **Build the Docker image**

```bash

docker build -t gharib-web .
```
  2. **Run the container**

```bash

docker run -p 3000:3000 --name gharib-web-container gharib-web
```
  3. **Access the application**
Open [localhost:3000](http://localhost:3000) in your browser

---
### For dev 
**this is the folder structre** : 
```bash
gharib-web/
├── app/              # Next.js app directory
├── public/           # Static assets
├── components/       # React components
├── lib/             # Utility functions
├── styles/          # Global styles
├── Dockerfile       # Docker configuration
└── package.json     # Dependencies
```

**Contributing**

  1. Fork the repository

  2. Create a feature branch

  3. Commit your changes

  4. Push to the branch

  5. Open a Pull Request

**License**

This project is licensed under the MIT License - see the LICENSE file for details.


---
## DISCLAIMER :
This repo is the front or gharib platform it uses the public free api [QuranFoundationAPI](https://api-docs.quran.foundation) for the quran page. 
For dev also you'd need the backend installed in your machine you can find it in [gharib-server](https://github.com/gharibPlatform/gharib-server) 
