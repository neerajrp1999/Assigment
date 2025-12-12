import { List, Grid3X3 } from "lucide-react";

function Dashboard({  view,  setView }: {  view: string; setView: React.Dispatch<React.SetStateAction<"list" | "card">>; }) {
  return (
    <div className="flex items-center  rounded-full p-1 border w-fit">
      <button
        onClick={() => setView("list")}
        className={`
                    flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 
                    ${
                      view === "list"
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "text-gray-600"
                    }
                  `}
      >
        <List size={18} />
        <span className="text-sm font-medium">List</span>
      </button>

      <button
        onClick={() => setView("card")}
        className={`
                    flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 
                    ${
                      view === "card"
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "text-gray-600"
                    }
                  `}
      >
        <Grid3X3 size={18} />
        <span className="text-sm font-medium">Cards</span>
      </button>
    </div>
  );
}

export default Dashboard;
