# MCP TweetBot

A lightweight, Gemini-powered chatbot integrated with [Model Context Protocol (MCP)](https://modelcontext.org/) that allows you to call custom tools like tweeting on **X (formerly Twitter)** via command-line interaction.

This project showcases how AI + Tools can work together using Google Gemini + MCP SDK. Plug in your API keys, run the client, and start chatting, posting tweets, or getting motivational quotes directly through your terminal.

---

## ✨ Features

- 🤖 AI chat powered by **Gemini**
- 🔧 Supports multiple **MCP tools**
  - `addTwoNumbers`: Adds two numbers
  - `createPost`: Posts a tweet on X (Twitter)
  - `getMotivation`: Fetches a real-time motivational quote from ZenQuotes API
- 📡 Real-time communication using Server-Sent Events (SSE)
- 💬 CLI-based chatbot with tool execution

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/mcp-tweetbot.git
cd mcp-tweetbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root

```env
For Client Side - 

GEMINI_API_KEY='Your API Key'


For Server Side - 

TWITTER_API_KEY='Your API key'

TWITTER_API_SECRET='Your API Secret'

TWITTER_ACCESS_TOKEN='Your Token'

TWITTER_ACCESS_TOKEN_SECRET='Your Token Secret'
```

> ⚠️ For security reasons, always use **your own API keys** when forking this project.

---

### 📦 Required Dependencies 

```bash
npm install express zod dotenv readline @google/genai @modelcontextprotocol/sdk twitter-api-v2 axios
```

---

### 4. Run the MCP server

```bash
node server/index.js
```

### 5. Run the MCP client

```bash
node client/index.js
```

---

## 🧪 Example Usage

```bash
You: What is 12 + 34?
AI: calling tool addTwoNumbers
AI: Tool Result: The sum of 12 and 34 is 46

You: Post "Hello world from my bot!" on Twitter
AI: calling tool createPost
AI: Tool Result: Tweeted: Hello world from my bot!

You: I'm feeling low, motivate me
AI: calling tool getMotivation
AI: Tool Result: "Push yourself, because no one else is going to do it for you." — Anonymous
```

---

## 📁 Project Structure

```
mcp-tweetbot/
├── client/
│   └── index.js         # CLI interface with Gemini + MCP
├── server/
│   └── index.js         # Tool registration + MCP server setup
│   └── mcp.tool.js      # Tool logic (e.g. createPost, getMotivation)
├── .env                 # API keys
└── README.md
```

---

## 📌 Requirements

- Node.js v18+
- Twitter Developer account (with Read & Write access)
- Gemini API key from [Google AI Studio](https://makersuite.google.com/)
- Internet connection (for fetching motivational quotes)

---

## 🧑‍💻 Author

**Made with ❤️ by Devansh Singh**

- 📧 Email: [devanshsingh1974@gmail.com](mailto:devanshsingh1974@gmail.com)  
- 💼 LinkedIn: [linkedin.com/in/devanshsingh2006](https://www.linkedin.com/in/devanshsingh2006)

---

## 📜 License

This project is open-source and free to use under the [MIT License](LICENSE).
