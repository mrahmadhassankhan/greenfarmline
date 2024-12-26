import React from 'react'
import AdminNav from '../AdminNav'
import SideNav from '../../../components/admin/discussionforum/SideNav'
import QueryCard from '../../../components/general/discussionForum/QueryCard';

function AdminQueryDetailedView() {
  const queries = [
    {
        id: 1,
        title: "How to prevent pests in wheat crops?",
        description: "I’ve noticed some damage in my wheat crops. What is the best way to deal with pests and ensure a healthy yield?",
        author: "Farmer John",
        date: "2024-12-19",
        image: "https://via.placeholder.com/150",
        status: "Pending",
    },
];
  return (
    <>
      <AdminNav />
      <div className='flex'>
        <SideNav />

        <main className="w-3/4 max-w-7xl mx-auto p-6">
          <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Discussion Forum</h1>
            {/* Query Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Query#</h2>
              {queries.map((query) => (
                <QueryCard
                  key={query.id}
                  title={query.title}
                  description={query.description}
                  author={query.author}
                  date={query.date}
                  image={query.image}
                  status={query.status}
                  onClick={() => console.log(`Navigating to query ID: ${query.id}`)}
                />
              ))}
              <div className='flex justify-center'>
              <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mx-2'>Approve</button>
              <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'>Reject</button>
              </div>
            </div>
          </div>
        </main>


      </div>
    </>
  )
}

export default AdminQueryDetailedView