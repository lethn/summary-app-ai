'use client'
import Link from 'next/link'

export default function NavBar() {
    return (
        <div className="bg-gray-700">
            <ul className="flex justify-between items-center px-6 py-3 text-white">
                <li className="text-2xl font-bold">
                    <Link href="/" className="hover:text-gray-300 transition">
                        Conversation AI
                    </Link>
                </li>

                <div className="flex gap-4">
                    <li>
                        <Link href="/">
                            <button className="px-4 py-2 hover:bg-gray-800 rounded transition">
                                Home
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link href="/conversation-list">
                            <button className="px-4 py-2 hover:bg-gray-800 rounded transition">
                                Conversation List
                            </button>
                        </Link>
                    </li>
                </div>
            </ul>
        </div>
    )
}
