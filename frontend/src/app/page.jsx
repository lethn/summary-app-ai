'use client'
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [title, setTitle] = useState('');

    const handleSummarize = async () => {
        if (!text.trim()) return;

        const userId = "1";
        const conversationId = uuidv4();

        try {
            const response = await axios.post('http://localhost:8080/new-conversation', {
                userId,
                conversationId,
                originalText: text,
            });

            console.log(response.data);

            const { summary, title } = response.data;
            setSummary(summary);
            setTitle(title);
        } catch (error) {
            console.error("Error submitting conversation:", error);
            setSummary("Error occurred while generating summary.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold m-4">Summary Your Conversation Text</h1>

            <textarea
                rows={8}
                className="w-1/2 p-3 border rounded mb-4"
                placeholder="Enter your text here"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                onClick={handleSummarize}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
                Submit
            </button>

            {summary && (
                <div className="w-1/2 p-3 border-t m-8">
                    <h2 className="text-lg font-bold mb-2">Title: {title}</h2>
                    <h2 className="text-lg font-bold mb-2">Summary:</h2>
                    <p className='mb-2'>{summary}</p>
                    <h2 className="text-lg font-bold mb-2">Details:</h2>
                    <p>{text}</p>
                </div>
            )}

        </div>
    )
}
