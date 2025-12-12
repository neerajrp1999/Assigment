import {
  PencilIcon,
} from "@heroicons/react/24/solid";

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

function Dashboard({ currentPosts }: { currentPosts: Product[] }) {
  return (
    <div className="mt-6 w-full overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Active</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentPosts.map((post) => (
            <tr
              key={post.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">{post.id}</td>
              <td className="px-4 py-3 font-medium">{post.name}</td>
              <td className="px-4 py-3 font-medium">{post.description.length > 50 ? `${post.description.slice(0, 40)}...` : post.description}</td>
              <td className="px-4 py-3">₹{post.price}</td>
              <td className="px-4 py-3">{post.category}</td>
              <td className="px-4 py-3">{post.stock}</td>
              <td className="px-4 py-3">
                {post.isActive ? (
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                    Inactive
                  </span>
                )}
              </td>

              <td className="px-4 py-3 text-right">
                <button className="p-2 rounded hover:bg-gray-200 transition">
                  <PencilIcon className="h-5 w-5 text-gray-600" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
