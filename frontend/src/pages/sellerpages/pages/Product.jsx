import "../../../styles/products.css";
import "../../../styles/landingpage.css";
import "../../../styles/contactpage.css";
import Card from "../../../components/seller/Card";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import useDebounce from "../../../../hooks/useDebounce";
import { Axios_Node } from "../../../Axios";
import Pagination from "./Pagination";
import FilterModal from "../../../components/seller/FilterModal";
import TriangleLoader from "../../../components/seller/TriangleLoader";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const debouncedValue = useDebounce(searchTerm, 800);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: { value: "createdAt_asc", label: "Latest First" },
    brand: [],
    category: "",
    price: { minPrice: 0, maxPrice: Infinity },
  });
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Ensure loading starts before making the request

        const response = await Axios_Node.get("/product/filter", {
          params: {
            ...filters,
            search: debouncedValue,
            page: currentPage,
            limit: 12,
          },
        });

        if (response.status !== 200) {
          throw new Error(`Error: Received status code ${response.status}`);
        }

        if (!response.data || !response.data.products) {
          throw new Error("Invalid response structure");
        }

        setProducts(response.data.products);
        setTotalPages(Math.ceil(response.data.count / 12));
        setOptions({
          brands: response.data.brandOptions || [],
          category: response.data.categoryOptions || [],
        });
      } catch (error) {
        console.error("Error fetching data:", error.message || error);

        // Optionally, set an error state if needed for UI feedback
        // setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false); // Ensure loading stops even if an error occurs
      }
    };

    fetchData();
  }, [debouncedValue, currentPage, filters]); // Removed 'loading' to avoid unnecessary re-fetching

  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;
  const gotoPage = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="Header_title search_header">
        <h1>Find Your Best Match Here Today</h1>
        <div className="searchBar">
          <div className="searchForm">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What product are you looking for ?"
            />
            <div className="z-0">
              <FiSearch />
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="open-modal"
            type="button"
          >
            Filter
          </button>
        </div>
        {showModal && (
          <FilterModal
            filters={filters}
            FilterOptions={options}
            changeFilter={(e) => setFilters({ ...filters, ...e })}
            onClose={() => setShowModal(false)}
            requestData={() => {
              setLoading(true);
              setCurrentPage(1);
            }}
          />
        )}
      </div>
      {loading ? (
        <TriangleLoader height="300px" />
      ) : Array.isArray(products) && products.length > 0 ? (
        <>
          <section className="Featured-products featured-div">
            <div className="product-container">
              {products.map((item) => {
                return <Card key={item._id} {...item} />;
              })}
            </div>
          </section>
          <Pagination
            totalPageCount={totalPages}
            canPreviousPage={canPreviousPage}
            previousPage={() => setCurrentPage(currentPage - 1)}
            canNextPage={canNextPage}
            nextPage={() => setCurrentPage(currentPage + 1)}
            gotoPage={gotoPage}
            pageIndex={currentPage - 1}
          />
        </>
      ) : (
        <div className="emptyProductList">
          <p>We couldn't find any matches!</p>
          <p>Please adjust your search criteria and try again.</p>
        </div>
      )}
    </>
  );
};

export default Product;
