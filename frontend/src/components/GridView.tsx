import { PencilIcon } from "@heroicons/react/24/solid";
import type { Product } from "@/type/Product";

function Dashboard({ currentPosts, onEdit }: {  currentPosts: Product[];  onEdit: (post: Product) => void }) {
  
  return (
    <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {currentPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white w-full rounded-2xl shadow-sm border border-gray-200 p-5 transition-all hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex justify-between items-start">
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium ${
                post.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {post.isActive ? "Active" : "Inactive"}
            </span>

            <PencilIcon
              onClick={() => {
                onEdit(post);
              }}
              className="h-5 w-5 text-gray-500 hover:text-blue-600 cursor-pointer transition"
            />
          </div>

          <h2 className="text-lg font-bold text-gray-900 mt-3 truncate">
            {post.name}
          </h2>

          {post.description && (
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              {post.description.length > 100
                ? post.description.slice(0, 100) + "..."
                : post.description}
            </p>
          )}

          <div className="my-4 border-t border-gray-200"></div>

          <div className="space-y-1 text-sm px-1">
            <p className="flex justify-between text-gray-700">
              <span className="font-medium">Price:</span>
              <span>₹{post.price}</span>
            </p>

            <p className="flex justify-between text-gray-700">
              <span className="font-medium">Category:</span>
              <span>{post.category}</span>
            </p>

            <p className="flex justify-between text-gray-700">
              <span className="font-medium">Stock:</span>
              <span>{post.stock}</span>
            </p>

            <p className="flex justify-between text-gray-700">
              <span className="font-medium">Added:</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-4">
              <p className="text-gray-800 font-semibold mb-1 text-sm">Tags:</p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
