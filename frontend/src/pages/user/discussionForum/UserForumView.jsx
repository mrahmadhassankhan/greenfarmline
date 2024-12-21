import React from 'react'
import UserNav from '../UserNav'
import QueryCard from '../../../components/general/discussionForum/QueryCard';
import { useHref } from 'react-router-dom';

function UserForumView() {
  const queries = [
    {
      id: 1,
      title: "How to prevent pests in wheat crops?",
      description: "I’ve noticed some damage in my wheat crops. What is the best way to deal with pests and ensure a healthy yield?",
      author: "Farmer John",
      date: "2024-12-19",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      title: "How to prevent pests in cotton crops?",
      description: "I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?",
      author: "Farmer smith",
      date: "2024-12-20",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      title: "How to prevent pests in cotton crops?",
      description: "I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?",
      author: "Farmer smith",
      date: "2024-12-20",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 4,
      title: "How to prevent pests in cotton crops?",
      description: "I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?",
      author: "Farmer smith",
      date: "2024-12-20",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 5,
      title: "How to prevent pests in cotton crops?",
      description: "I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?",
      author: "Farmer smith",
      date: "2024-12-20",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 6,
      title: "How to prevent pests in cotton crops?",
      description: "I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?",
      author: "Farmer smith",
      date: "2024-12-20",
      image: "https://via.placeholder.com/150"
    },
  ];
  return (
    <>
      <UserNav />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Discussion Forum</h1>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Queries</h2>
          {queries.map((query) => (
            <QueryCard
              key={query.id}
              title={query.title}
              description={query.description}
              author={query.author}
              date={query.date}
              image={query.image}
              onClick={() => console.log(`Navigating to query ID: ${query.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default UserForumView