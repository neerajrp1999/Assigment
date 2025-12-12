import { get } from "@/apis";
import { useState, useEffect, useCallback, use, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "../components/Modal";
import Pagination from "@/components/Pagination";
import ToggleButton from "@/components/ToggleButton";
import ListView from "@/components/ListView";
import GridView from "@/components/GridView";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  createdAt: string;
  isActive: boolean;
  tags: string[];
}

function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataBeforeFilter, setDataBeforeFilter] = useState<Product[]>([]);
  const [view, setView] = useState<"list" | "card">("list");

  const [visible, setVisible] = useState<boolean>(false);
  const [sendModel, setSendModel] = useState<boolean>(false);
  const [updateModel, setUpdateModel] = useState<boolean>(false);
  const [randomCollectorModel, setRandomCollectorModel] =
    useState<boolean>(false);
  const [randomCollector, setRandomCollector] = useState<number>(0);
  const [update, setUpdate] = useState<any | undefined>();

  const [postSending, setPostSending] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);

  const [selected_filter, setSelectedFilter] = useState<string[]>([]);

  const data: Product[] = useMemo(() => {
    const search = searchInput.trim().toLowerCase();
    const hasSearch = search !== "";
    const hasFilter = selected_filter.length > 0;
    const filterSet = new Set(selected_filter);

    return dataBeforeFilter.filter((post) => {
      const postId = post.name.toString();
      const text = post.description?.toLowerCase() || "";
      const tags = post.tags || [];

      const matchesSearch =
        !hasSearch || postId.includes(search) || text.includes(search);

      let matchesFilter = true;

      if (hasFilter) {
        if (filterSet.has("")) {
          matchesFilter = tags.length === 0;
        } else {
          matchesFilter = tags.some((tag) => filterSet.has(tag));
        }
      }

      return matchesSearch && matchesFilter;
    });
  }, [dataBeforeFilter, searchInput, selected_filter]);

  const POSTS_PER_PAGE = 10;

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
        console.log("Fetched posts:", result);
        setDataBeforeFilter(result || []);
      } else {
        console.error("Failed to fetch posts:", result.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const togglePostSelection = (postId: number) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  function shuffleArray(array: any[]) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const handleEditPost = (post: any) => {
    setUpdateModel(true);
    setUpdate(post);
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-6">
      <div className="w-full max-w-[90%] bg-white p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 w-full mb-6">
          <input
            type="text"
            placeholder="Search by Name or Description or Tag..."
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
              onClick={() => setVisible(true)}
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
                <ListView currentPosts={currentPosts} />
              ) : (
                <GridView
                  currentPosts={currentPosts}
                  view={view}
                  setView={setView}
                />
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

      <Modal
        isOpen={updateModel}
        onClose={() => {
          setUpdateModel(false);
          setUpdate(undefined);
        }}
      >
        <div className="w-full h-full overflow-y-auto max-h-[90vh]">
          {/* AddUpdatePost Component */}
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;
