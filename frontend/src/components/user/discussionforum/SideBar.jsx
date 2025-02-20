import React from 'react'
import { useNavigate } from 'react-router-dom'

function SideBar() {
    const navigate = useNavigate();
    return (
        <>
            {/* Side Panel */}
            <aside className="w-1/4 bg-gray-100 min-h-screen p-4 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Forum Navigation</h2>
                <ul className="space-y-3">
                    <li>
                        <button
                            onClick={() => navigate('/userforumview')}
                            className="w-full text-left px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Latest Queries
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/post-query')}
                            className="w-full text-left px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Post a Query
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/your-queries')}
                            className="w-full text-left px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Your Queries
                        </button>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default SideBar