import React from "react";
import MuzzamilKhanImage from "../../../images/team/Muzzamil Khan.png";
import HassanKhanImage from "../../../images/team/Hassan Khan.png";
const teamMembers = [
  { name: "Muzzamil Khan", title: "CEO", image: MuzzamilKhanImage },
  { name: "Hassan Khan", title: "CTO", image: HassanKhanImage },
];

const TeamSection = () => {
  return (
    <section className="bg-base-300 dark:bg-slate-900 dark:border-t py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-500 mb-10">
          Meet Our Team
        </h2>
        <div className="flex justify-around">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="w-1/3 px-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full object-cover mx-auto shadow-2xl bg-lime-500"
              />
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-500 mt-4">
                {member.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
