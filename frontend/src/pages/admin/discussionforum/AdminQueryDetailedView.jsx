import React from 'react'
import AdminNav from '../AdminNav'
import SideNav from '../../../components/admin/discussionforum/SideNav'
import QueryDetailsCard from '../../../components/general/discussionForum/QueryDetailsCard';

function AdminQueryDetailedView() {
  const queries = [
    {
        id: 1,
        title: "How to get documents that contain certain word in some fields with filtered query?",
        description: "2 I want to find all books with Agriculture category. the books should contain word paddy in the title OR abstract field. Here is my query : GET /books/_search { query: { bool: { should: [ { match: { abstract: paddy } }, { match: { title: paddy } } ], filter: { term: { category: Agriculture } }}} } those query return all books with Agriculture category, even it's contain word paddy or not. What did I do wrong?",
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
                <QueryDetailsCard
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