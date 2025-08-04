'use client'
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const dummyConversations = [
    {
        userId: "1",
        conversationId: "1",
        title: "Meeting and Q3 Planning",
        summary: "Planning the Q3 budget projections and product roadmap before the client call.",
        originalText: "Hey, are we still on for the meeting tomorrow at 10am? I think it would be great to discuss the Q3 budget projections in detail as well as the updated product roadmap. We should make sure we're aligned before the client call in the afternoon. Let me know if you want me to prepare any materials or data for the discussion.",
    },
    {
        userId: "1",
        conversationId: "2",
        title: "Marketing Campaign Review",
        summary: "Reviewing draft for marketing campaign; need feedback on demographics, messaging, budget, and timeline.",
        originalText: "I've just finished reviewing the draft for the new marketing campaign. There are a few key points I'd like to discuss, including the target demographics and messaging tone. We also need to finalize the campaign budget and timeline to ensure we can launch on schedule. Please review and send me your feedback by Thursday so we can move forward.",
    },
    {
        userId: "2",
        conversationId: "1",
        title: "Sales Figures Request",
        summary: "Requesting latest sales data and insights for the quarterly board meeting report.",
        originalText: "Could you please send me the latest sales figures from all regions? I am preparing the quarterly report for the upcoming board meeting and need the most current data. Additionally, if there are any insights or trends you've noticed, including challenges or growth opportunities, please include those as well. Thank you!",
    },
    {
        userId: "3",
        conversationId: "1",
        title: "Product Launch Coordination",
        summary: "Coordinating with PR team for next month’s product launch event.",
        originalText: "The product launch event is scheduled for next month, and we need to start coordinating closely with the PR team. This includes preparing press releases, scheduling interviews, and organizing the event logistics. Let's set up a meeting next week to go over the details and assign responsibilities to make sure everything runs smoothly.",
    },
    {
        userId: "2",
        conversationId: "2",
        title: "Timesheet Submission Reminder",
        summary: "Reminder to submit timesheets on time to avoid payroll delays.",
        originalText: "Just a friendly reminder to submit your timesheets by the end of this week to avoid any delays in payroll processing. If anyone has any questions about the new submission process or needs help accessing the timesheet portal, please let me know. Timely submission helps keep our operations running smoothly.",
    },
];

export default function Home() {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [title, setTitle] = useState('');

    const handleSummarize = async () => {
        if (!text.trim()) return;

        const userId = "3";
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
