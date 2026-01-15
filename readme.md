# ✒️ QuillVibes

- A scalable, open-source blogging platform where users can **write and publish their own blogs** or **generate content with AI assistance**.  
- Designed for creators, writers, and developers who want a seamless way to share ideas and leverage AI-powered writing tools.  
- Web build deployed on `vercel` under free tier [Link](https://quill-vibes.vercel.app/).

---

## 📚 Tech Stack

- Next.js  
- Tailwind CSS  
- ShadCN (UI Components)  
- Node.js (Backend)  
- OpenAI/Gemini API (AI Content Generation)

---

## 🔩 Environment Variables

The environment variables are configured in `.env.example` file:

- `NEXT_PUBLIC_AI_API_KEY=`  
- `MONGODB_URI=`  
- `NEXTAUTH_SECRET=`  
- `NEXTAUTH_URL=`  

---

## 🔨 Setting Up

Follow the instructions below to set up the project and run it locally:

- Run `npm install` to install all dependencies.  
- Run `npm run dev` to start the development server.  
- Get your API key from OpenAI/Gemini and paste it into the `.env` file with `NEXT_PUBLIC_AI_API_KEY`.  
- Connect your MongoDB cluster and paste the URI into `MONGODB_URI`.  
- To make a production build run `npm run build` and the build files will be generated in the `.next` folder.  

---

## ⚡ Features

- **AI-Assisted Writing**: Generate blog drafts, outlines, or full posts with AI support.  
- **Custom Blog Editor**: Rich text editor with markdown support.  
- **User Authentication**: Secure login and signup with NextAuth.  
- **Publishing System**: Write, edit, and publish blogs instantly.  
- **Responsive Design**: Optimized for desktop and mobile.  
- **Dark/Light Mode**: Toggle themes according to your preference.  
- **Scalable Backend**: Built with MongoDB for handling large-scale blog data.  

---

## 🚀 Future Enhancements

- Commenting system for readers.  
- Social sharing integrations.  
- Analytics dashboard for authors.  
- Multi-language AI content generation.  

---

## 🤝 Contributing

Contributions are welcome!  
- Fork the repo  
- Create a new branch (`git checkout -b feature-name`)  
- Commit your changes (`git commit -m 'Add new feature'`)  
- Push to the branch (`git push origin feature-name`)  
- Open a Pull Request  

---

## 📜 License

This project is licensed under the MIT License.  
