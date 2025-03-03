import React from "react";
import MuzzamilKhanImage from "../../../images/team/Muzzamil Khan.png";
import HassanKhanImage from "../../../images/team/Hassan Khan.png";
import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
const teamMembers = [
  { name: "Muzzamil Khan", title: "CEO", image: MuzzamilKhanImage },
  { name: "Ahmad Hassan Khan", title: "CTO", image: HassanKhanImage },
];
const links = [
  { url: "https://linktr.ee/" },
  { url: "https://linktr.ee/mrahmadhassankhan" },
];

const TeamSection = () => {
  return (
    <section className="bg-gray-200 dark:bg-slate-900 dark:border-t py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-500 mb-10">
          Meet Our Team
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="w-full md:w-1/3 px-4 py-4 flex  flex-col content-center items-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full object-cover mx-auto shadow-2xl bg-green-600"
              />

              <h3 className="text-2xl font-semibold text-green-600 dark:text-green-300 mt-4 flex content-center items-center">
                <Link to={links[idx].url}>
                  <FaLink
                    size="1rem"
                    className="text-green-600 mr-1 hover:text-green-200"
                  />
                </Link>
                {member.name}
              </h3>

              {/* <p className="text-gray-600 dark:text-gray-300">{member.title}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
