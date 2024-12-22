import React from 'react';
import UserNav from '../UserNav';
import QueryCard from '../../../components/general/discussionForum/QueryCard';
import { useNavigate } from 'react-router-dom';

function UserForumView() {
  const queries = [
    {
      id: 1,
      title: 'How to prevent pests in wheat crops?',
      description:
        'I’ve noticed some damage in my wheat crops. What is the best way to deal with pests and ensure a healthy yield?',
      author: 'Farmer John',
      date: '2024-12-19',
      image: 'https://via.placeholder.com/150',
      status: "Approved",
    },
    {
      id: 2,
      title: 'How to prevent pests in cotton crops?',
      description:
        'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
      author: 'Farmer Smith',
      date: '2024-12-20',
      image: 'https://via.placeholder.com/150',
      status: "Approved",
    },
    {
      id: 3,
      title: 'How to prevent pests in cotton crops?',
      description:
        'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
      author: 'Farmer Smith',
      date: '2024-12-20',
      image: 'https://via.placeholder.com/150',
      status: "Approved",
    },
    {
      id: 4,
      title: 'How to prevent pests in cotton crops?',
      description:
        'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
      author: 'Farmer Smith',
      date: '2024-12-20',
      image: 'https://via.placeholder.com/150',
      status: "Approved",
    },
    {
      id: 5,
      title: 'How to prevent pests in cotton crops?',
      description:
        'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
      author: 'Farmer Smith',
      date: '2024-12-20',
      image: 'https://via.placeholder.com/150',
      status: "Approved",
    },
    {
      id: 6,
      title: 'How to prevent pests in cotton crops?',
      description:
        'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
      author: 'Farmer Smith',
      date: '2024-12-20',
      image: 'https://via.placeholder.com/150',
      status: "Approved",
    },
  ];

  const navigate = useNavigate();

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
          <h1 className="text-3xl font-bold text-center mb-6">Discussion Forum</h1>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Leatest Queries</h2>
            {queries.map((query) => (
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
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default UserForumView;