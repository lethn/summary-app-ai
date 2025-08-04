"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/pagination";
import { useRouter } from "next/navigation";

export default function ConversationList() {
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState("all");

    const router = useRouter();

    const fetchConversations = async () => {
        try {
            const response = await axios.get("http://localhost:8080/conversations");
            setConversations(response.data.items || []);
        } catch (err) {
            console.error("Failed to fetch conversations:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    const filteredConversations = selectedUser === "all" ? conversations : conversations.filter((c) => c.userId.toString() === selectedUser);
    const conversationsPerPage = 3;
    const indexOfLastConversation = currentPage * conversationsPerPage;
    const indexOfFirstConversation = indexOfLastConversation - conversationsPerPage;
    const currentConversations = filteredConversations.slice(indexOfFirstConversation, indexOfLastConversation);
    const totalPages = Math.ceil(filteredConversations.length / conversationsPerPage);

    if (isLoading) return <p className="text-center m-4">Loading conversations...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Conversation List</h1>

            <div className="mb-6 flex justify-center items-center">
                <select
                    value={selectedUser}
                    onChange={(e) => {
                        setSelectedUser(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="p-2 rounded bg-gray-700 hover:bg-gray-800 text-white border"
                >
                    <option value="all">All Users</option>
                    {[...new Set(conversations.map(c => c.userId))].map((userId) => (
                        <option key={userId} value={userId}>
                            {userId}
                        </option>
                    ))}
                </select>
            </div>

            {filteredConversations.length === 0 ? (
                <p className="text-center text-gray-500">No conversations found.</p>
            ) : (
                <div className="space-y-4 max-w-4xl mx-auto">
                    {currentConversations.map((conv, index) => (
                        <div
                            key={`${conv.conversationId}-${index}`}
                            onClick={() => router.push(`/conversation-details/${conv.userId}/${conv.conversationId}`)}
                            className="p-4 rounded-lg shadow-md bg-gray-700 text-white hover:bg-gray-800 transition cursor-pointer"
                        >
                            <h2 className="text-xl font-bold">{conv.title}</h2>
                            <p className="mt-2">{conv.summary}</p>
                            <div className="text-sm text-gray-300 mt-3">
                                <span>User ID: {conv.userId}</span> |{" "}
                                <span>Conversation ID: {conv.conversationId}</span>
                            </div>
                        </div>
                    ))}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onChangePage={setCurrentPage}
                        pagesPerRow={10}
                    />
                </div>
            )}
        </div>
    );
}
