import { get, post } from "@/apis";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "../components/Modal";
import Pagination from "@/components/Pagination";
import ToggleButton from "@/components/ToggleButton";
import ListView from "@/components/ListView";
import AddProductForm from "./AddProductForm";
import GridView from "@/components/GridView";
import type { Product } from "@/type/Product";

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [update, setUpdate] = useState<Product | undefined>(undefined);
  const [dataBeforeFilter, setDataBeforeFilter] = useState<Product[]>([]);
  const [view, setView] = useState<"list" | "card">("list");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [add_updateModel, setAddUpdateModel] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>("");

  const data: Product[] = useMemo(() => {
    const search = debouncedSearch.trim().toLowerCase();
    const hasSearch = search !== "";

    return dataBeforeFilter.filter((post) => {
      const name = post.name.toString();
      const text = post.description?.toLowerCase() || "";

      const matchesSearch =
        !hasSearch || name.includes(search) || text.includes(search);

      return matchesSearch;
    });
  }, [dataBeforeFilter, debouncedSearch]);

  const POSTS_PER_PAGE = 12;

  const pageFromUrl = parseInt(searchParams.get("page") || "1") || 1;

  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const totalPages = Math.ceil(data.length / POSTS_PER_PAGE);
  const indexOfLast = currentPage * POSTS_PER_PAGE;
  const indexOfFirst = indexOfLast - POSTS_PER_PAGE;
  const currentPosts = data.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setPageInUrl(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const setPageInUrl = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const fetchPosts = async () => {
    try {
      const response = await get("get-all-products");
      const result = await response.json();
      if (response.ok) {
        // console.log("Fetched posts:", result);
        setDataBeforeFilter(result || []);
      } else {
        console.error("Failed to fetch posts:", result.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const savePost = async (formData: Product) => {
    try {
      const response = await post("save-product", formData);
      const result = await response.json();
      if (response.ok) {
        // console.log("Fetched posts:", result);
        setDataBeforeFilter(result?.products || []);
        alert(result?.message);
      } else {
        console.error("Failed to fetch posts:", result.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setAddUpdateModel(false);
    }
  };
  const onEdit = async (post: Product) => {
    // console.log(post)
    setUpdate(post);
    setAddUpdateModel(true);
  };

  const onClose = () => {
    setAddUpdateModel(false);
    setUpdate(undefined);
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-6">
      <div className="w-full max-w-[90%] bg-white p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 w-full mb-6">
          <input
            type="text"
            placeholder="Search by Name or Description..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/3 border border-gray-300 rounded p-2"
          />

          <div className="w-full md:w-1/3 flex justify-center">
            <ToggleButton view={view} setView={setView} />
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            <button
              onClick={() => {
                setAddUpdateModel(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 
               rounded-full shadow-sm hover:shadow-md 
               hover:bg-blue-700 active:scale-95 
               transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="font-medium tracking-wide">Add New Product</span>
            </button>
          </div>
        </div>

        <div className="min-h-[300px]  overflow-y-auto">
          {data.length === 0 ? (
            <p className="text-gray-600 text-center">No Product available.</p>
          ) : (
            <>
              {view === "list" ? (
                <ListView currentPosts={currentPosts} onEdit={onEdit} />
              ) : (
                <GridView currentPosts={currentPosts} onEdit={onEdit} />
              )}
            </>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
      <Modal isOpen={add_updateModel} onClose={onClose}>
        <AddProductForm
          product={update}
          onClose={onClose}
          onSubmit={(formData: Product) => {
            // console.log("New Product:", formData);
            
            savePost(formData);
          }}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
