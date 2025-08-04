"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ConversationDetails({ params }) {
    const { userId, conversationId } = use(params);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchConversation = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/conversations/${userId}/${conversationId}`);
            setData(response.data);
        } catch (err) {
            console.error("Failed to fetch conversation:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchConversation();
    }, [userId, conversationId]);

    if (isLoading) return <p className="text-center mt-10">Loading conversation...</p>;
    if (!data) return <p className="text-center mt-10">Conversation not found.</p>;

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-1/2 mt-4 mb-2">
                <button
                    onClick={() => router.back()}
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 cursor-pointer mb-2"
                >
                    Back
                </button>
                <h1 className="text-2xl font-bold text-center">Conversation Details</h1>
            </div>

            <div className="w-1/2 p-3 border rounded">
                <h2 className="text-lg font-bold mb-2">Title: {data.title}</h2>
                <h2 className="text-lg font-bold mb-2">Summary:</h2>
                <p className="mb-2">{data.summary}</p>
                <h2 className="text-lg font-bold mb-2">Details:</h2>
                <p>{data.originalText}</p>
            </div>
        </div>

    );
}
