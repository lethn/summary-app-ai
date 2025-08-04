const dotenv = require("dotenv");
const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const documentClient = require("./dynamodbClient");
const { ScanCommand, PutCommand, QueryCommand, GetCommand, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// Get all conversations
router.get("/conversations", async (req, res) => {
    try {
        const command = new ScanCommand({ TableName: "conversations" });
        const result = await documentClient.send(command);
        return res.json({ items: result.Items || [] });
    } catch (err) {
        console.error("Error scanning conversations:", err);
        return res.status(500).json({ error: "Failed to fetch conversations" });
    }
});

// Get conversations by user ID
router.get("/conversations/:userId", async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
    }

    try {
        const params = {
            TableName: "conversations",
            KeyConditionExpression: "userId = :uid",
            ExpressionAttributeValues: {
                ":uid": userId,
            },
        };

        const command = new QueryCommand(params);
        const result = await documentClient.send(command);

        return res.json({ items: result.Items || [] });
    } catch (err) {
        console.error("Error querying conversations by userId:", err);
        return res.status(500).json({ error: "Failed to fetch conversations for user" });
    }
});

// Get conversation by userId and conversationId
router.get("/conversations/:userId/:conversationId", async (req, res) => {
    const { userId, conversationId } = req.params;

    if (!userId || !conversationId) {
        return res.status(400).json({ error: "Missing userId or conversationId" });
    }

    try {
        const params = {
            TableName: "conversations",
            Key: {
                userId,
                conversationId,
            },
        };

        const command = new GetCommand(params);
        const { Item } = await documentClient.send(command);
        if (!Item) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        return res.json(Item);
    } catch (err) {
        console.error("Error fetching conversation:", err);
        return res.status(500).json({ error: "Failed to fetch conversation" });
    }
});

// Add new conversation
router.post("/new-conversation", async (req, res) => {
    const { userId, conversationId, originalText } = req.body;

    if (!userId || !conversationId || !originalText) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Summarize the following text. Respond ONLY with a raw JSON object that has exactly two fields: "title" and "summary". Do not include Markdown code blocks or explanation.\n\nText:\n${originalText}`,
        });

        console.log(response.text);

        const newData = JSON.parse(response.text);
        const { title, summary } = newData;

        const params = {
            TableName: "conversations",
            Item: {
                userId,
                conversationId,
                title,
                summary,
                originalText,
            },
        };

        await documentClient.send(new PutCommand(params));

        return res.json({ title, summary });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Failed to process the conversation text" });
    }
});


// Delete conversation
router.delete("/conversations/:userId/:conversationId", async (req, res) => {
    const { userId, conversationId } = req.params;

    if (!userId || !conversationId) {
        return res.status(400).json({ error: "Missing userId or conversationId" });
    }

    try {
        const params = {
            TableName: "conversations",
            Key: { userId, conversationId },
        };

        await documentClient.send(new DeleteCommand(params));

        return res.json({ message: "Conversation deleted successfully" });
    } catch (err) {
        console.error("Error deleting conversation:", err);
        return res.status(500).json({ error: "Failed to delete conversation" });
    }
});

module.exports = router;
