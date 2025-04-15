import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createPost } from "./mcp.tool.js";
import {z} from "zod";
import axios from 'axios';


const server = new McpServer({
  name: "example-server",
  version: "1.0.0"
});

// ... set up server resources, tools, and prompts ...

const app = express();

server.tool(
    "addTwoNumbers",
    "Add Two Numbers",
    {
        a:z.number(),
        b:z.number()
    },
    async (arg)=>{
        const{a,b}=arg;
        return{
            content: [
                {
                type:"text",
                text:`The sum of ${a} and ${b} is ${a+b}`
                }
            ]
        }
    }
)

server.tool(
    "createPost",
    "Create a post on X formaly known as Twitter",{
        status:z.string()
    }, async(arg)=>{
        const{status}=arg;
        return createPost(status);
    }
)

server.tool(
  "getMotivation",
  "Returns a motivational quote",
  {},
  async () => {
    try {
      const response = await axios.get('https://zenquotes.io/api/random');
      const quote = response.data[0].q;
      const author = response.data[0].a;

      return {
        content: [
          {
            type: "text",
            text: `🌟 "${quote}" — ${author}`
          }
        ]
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: "Oops! Couldn't fetch a quote right now. Try again later. 🙏"
          }
        ]
      };
    }
  }
);

// to support multiple simultaneous connections we have a lookup object from
// sessionId to transport
const transports = {};

app.get("/sse", async (req,res) => {
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;
  res.on("close", () => {
    delete transports[transport.sessionId];
  });
  await server.connect(transport);
});

app.post("/messages", async (req,res) => {
  const sessionId = req.query.sessionId  ;
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.listen(3001, ()=>{
    console.log('server is running on http://localhost:3001')
});