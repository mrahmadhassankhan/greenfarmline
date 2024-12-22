import React from 'react'
import { useNavigate } from 'react-router-dom';
import ExpertNav from '../ExpertNav'
import QueryCard from '../../../components/general/discussionForum/QueryCard';

function ExpertForumView() {
    const queries = [
        {
            id: 1,
            title: 'How to prevent pests in wheat crops?',
            description:
                'I’ve noticed some damage in my wheat crops. What is the best way to deal with pests and ensure a healthy yield?',
            author: 'Farmer John',
            date: '2024-12-19',
            image: 'https://via.placeholder.com/150',
            status: 'Approved',
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
            status: 'Approved',
        },
        {
            id: 4,
            title: 'How to prevent pests in cotton crops?',
            description:
                'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
            author: 'Farmer Smith',
            date: '2024-12-20',
            image: 'https://via.placeholder.com/150',
            status: 'Approved',
        },
        {
            id: 5,
            title: 'How to prevent pests in cotton crops?',
            description:
                'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
            author: 'Farmer Smith',
            date: '2024-12-20',
            image: 'https://via.placeholder.com/150',
            status: 'Approved',
        },
        {
            id: 6,
            title: 'How to prevent pests in cotton crops?',
            description:
                'I’ve noticed some damage in my cotton crops. What is the best way to deal with pests and ensure a healthy yield?',
            author: 'Farmer Smith',
            date: '2024-12-20',
            image: 'https://via.placeholder.com/150',
            status: 'Approved',
        },
    ];

    const navigate = useNavigate();

    return (
        <>
            <ExpertNav />
            <div className="max-w-7xl mx-auto p-6 mt-10">
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
                            onClick={() => navigate('/write-your-answer')}
                        />
                    ))}
                </div>
            </div>

        </>
    )
}

export default ExpertForumView