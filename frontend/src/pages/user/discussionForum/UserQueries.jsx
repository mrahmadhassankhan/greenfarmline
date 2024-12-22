import React, { useState } from 'react';
import UserNav from '../UserNav';
import QueryCard from '../../../components/general/discussionForum/QueryCard';
import { useNavigate } from 'react-router-dom';

function UserQueries() {
    const queries = [
        {
            id: 1,
            title: 'How to prevent pests in wheat crops?',
            description:
                'I’ve noticed some damage in my wheat crops. What is the best way to deal with pests and ensure a healthy yield?',
            author: 'Farmer John',
            date: '2024-12-19',
            image: 'https://via.placeholder.com/150',
            status: 'Pending',
        },
        {
            id: 2,
            title: 'How to prevent pests in cotton crops?',
            description:
                'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
            author: 'Farmer Smith',
            date: '2024-12-20',
            image: 'https://via.placeholder.com/150',
            status: 'Approved',
        },
        {
            id: 3,
            title: 'How to prevent pests in cotton crops?',
            description:
                'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
            author: 'Farmer Smith',
            date: '2024-12-20',
            image: 'https://via.placeholder.com/150',
            status: 'Rejected',
        },
        {
            id: 4,
            title: 'How to increase cotton yield?',
            description:
                'Are there any modern techniques or fertilizers I can use to boost my cotton yield this season?',
            author: 'Farmer Alex',
            date: '2024-12-18',
            image: 'https://via.placeholder.com/150',
            status: 'Approved',
        },
        {
            id: 5,
            title: 'Best practices for wheat farming?',
            description:
                'Can anyone share tips or best practices for wheat farming in a temperate climate?',
            author: 'Farmer Emma',
            date: '2024-12-17',
            image: 'https://via.placeholder.com/150',
            status: 'Pending',
        },
        {
            id: 6,
            title: 'Best practices for rice farming?',
            description:
                'Can anyone share tips or best practices for rice farming in a temperate climate?',
            author: 'Farmer Emma',
            date: '2024-12-17',
            image: 'https://via.placeholder.com/150',
            status: 'Approved',
        },
    ];

    const [filter, setFilter] = useState('All'); // Filter state
    const [search, setSearch] = useState(''); // Search state
    const navigate = useNavigate();

    // Filter and search logic
    const filteredQueries = queries.filter((query) => {
        const matchesFilter =
            filter === 'All' || query.status.toLowerCase() === filter.toLowerCase();
        const matchesSearch =
            query.title.toLowerCase().includes(search.toLowerCase()) ||
            query.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <>
            <UserNav />
            <div className="flex">
                {/* Side Panel */}
                <aside className="w-1/4 bg-gray-100 min-h-screen p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Forum Navigation</h2>
                    <ul className="space-y-3">
                        <li>
                            <button
                                onClick={() => navigate('/userforumview')}
                                className="w-full text-left px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600"
                            >
                                Latest Queries
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/post-query')}
                                className="w-full text-left px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600"
                            >
                                Post a Query
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/your-queries')}
                                className="w-full text-left px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600"
                            >
                                Your Queries
                            </button>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="w-3/4 max-w-7xl mx-auto p-6">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold">Discussion Forum</h1>
                        <div className="join">
                            {/* Search Input */}
                            <input
                                type="text"
                                className="input input-bordered join-item"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {/* Filter Dropdown */}
                            <select
                                className="select select-bordered join-item"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                            {/* <button className="btn join-item" onClick={() => console.log('Search initiated')}>
                                Search
                            </button> */}
                        </div>
                    </div>
                    <div className="space-y-4 mt-6">
                        <h2 className="text-2xl font-semibold">Your Queries</h2>
                        {filteredQueries.length > 0 ? (
                            filteredQueries.map((query) => (
                                <QueryCard
                                    key={query.id}
                                    title={query.title}
                                    description={query.description}
                                    author={query.author}
                                    date={query.date}
                                    image={query.image}
                                    status={query.status}
                                    onClick={() => navigate('/query-detailed-view')}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No queries match your search or filter.</p>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

export default UserQueries;
