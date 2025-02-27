import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Axios_Node } from "../../../Axios";
import CustomerTable from "../../../components/seller/CustomerTable";
import TriangleLoader from "../../../components/seller/TriangleLoader";
const CustomerList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return toast.error("Access denied. Please login first.");
        }
        const response = await Axios_Node.get("/admin/users", {
          params: {
            email: JSON.parse(localStorage.getItem("user")).email,
          },
        });
        if (response.data.success) {
          setData(response.data.users.filter((user) => user.role === "farmer"));
        }
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      }
    };
    fetch();
  }, []);
  const columns = [
    {
      Header: "Id",
      accessor: "index",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
      sortType: (rowA, rowB, columnId) => {
        const dateA = new Date(rowA.values[columnId]);
        const dateB = new Date(rowB.values[columnId]);
        return dateA - dateB;
      },
    },
  ];
  if (loading) return <TriangleLoader height="500px" />;
  return (
    <div className="dashboardMain">
      <h1>Customers</h1>
      <div className="dashOverview" style={{ overflow: "auto" }}>
        <CustomerTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default CustomerList;
