import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../AdminNav'
import SideNav from '../../../components/admin/discussionforum/SideNav'
import PendingQueryCard from '../../../components/admin/discussionforum/PendingQueryCard';

function PendingQueries() {
  const queries = [
      {
        id: 1,
        title: 'How to prevent pests in wheat crops?',
        description:
          'I’ve noticed some damage in my wheat crops. What is the best way to deal with pests and ensure a healthy yield?',
        author: 'Farmer John',
        date: '2024-12-19',
        image: 'https://via.placeholder.com/150',
        status: "Pending",
      },
      {
        id: 2,
        title: 'How to prevent pests in cotton crops?',
        description:
          'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
        author: 'Farmer Smith',
        date: '2024-12-20',
        image: 'https://via.placeholder.com/150',
        status: "Pending",
      },
      {
        id: 3,
        title: 'How to prevent pests in cotton crops?',
        description:
          'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
        author: 'Farmer Smith',
        date: '2024-12-20',
        image: 'https://via.placeholder.com/150',
        status: "Pending",
      },
      {
        id: 4,
        title: 'How to prevent pests in cotton crops?',
        description:
          'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
        author: 'Farmer Smith',
        date: '2024-12-20',
        image: 'https://via.placeholder.com/150',
        status: "Pending",
      },
      {
        id: 5,
        title: 'How to prevent pests in cotton crops?',
        description:
          'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
        author: 'Farmer Smith',
        date: '2024-12-20',
        image: 'https://via.placeholder.com/150',
        status: "Pending",
      },
      {
        id: 6,
        title: 'How to prevent pests in cotton crops?',
        description:
          'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
        author: 'Farmer Smith',
        date: '2024-12-20',
        image: 'https://via.placeholder.com/150',
        status: "Pending",
      },
    ];
  
  
    const [search, setSearch] = useState(''); // Search state
    const navigate = useNavigate();
  
    const searchedQueries = queries.filter((query) => {
      const matchesSearch =
        query.title.toLowerCase().includes(search.toLowerCase()) ||
        query.description.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  return (
    <>
      <AdminNav />
      <div className='flex'>
        {/* Side Panel */}
        <SideNav />
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
              {/* <button className="btn join-item" onClick={() => console.log('Search initiated')}>
                                Search
                            </button> */}
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <h2 className="text-2xl font-semibold">Pending Queries</h2>
            {searchedQueries.length > 0 ? (
              searchedQueries.map((query) => (
                <PendingQueryCard
                  key={query.id}
                  title={query.title}
                  description={query.description}
                  author={query.author}
                  date={query.date}
                  image={query.image}
                  status={query.status}
                  onClick={() => navigate('/admin-query-detailed-view')}
                  onApprove={() => console.log('Query Approved..')}
                  onReject={() => console.log('Query Rejected..')}
                />
              ))
            ) : (
              <p className="text-gray-500">No queries match your search or filter.</p>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default PendingQueries