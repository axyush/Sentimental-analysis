# Sentiment AI Architect

A comprehensive system architecture design and live demo for an AI-powered sentiment analysis tool.

## Features

- **Full-Stack Architecture**: Express.js backend with React frontend.
- **AI Integration**: Powered by Google Gemini API (simulating Google Cloud Natural Language API).
- **Modern UI**: Built with Tailwind CSS, Lucide Icons, and Framer Motion.
- **Serverless Ready**: Designed for deployment on Google Cloud Run and Firebase.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- A Google Gemini API Key (get one at [aistudio.google.com](https://aistudio.google.com/))

## Getting Started

1. **Clone the repository** (or download the files).

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add your Gemini API key:
     ```env
     GEMINI_API_KEY=your_api_key_here
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Project Structure

- `server.ts`: Express backend server and Vite middleware.
- `src/App.tsx`: Main React frontend application.
- `src/index.css`: Global styles and Tailwind configuration.
- `vite.config.ts`: Vite build and development configuration.
- `package.json`: Project dependencies and scripts.

## Deployment

To build the project for production:

```bash
npm run build
```

The production-ready files will be in the `dist/` directory. You can then start the server in production mode:

```bash
NODE_ENV=production npm start
```

## License

Apache-2.0
