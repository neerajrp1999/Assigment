import { useEffect, useState } from "react";
import type { Product } from "@/type/Product";


function Dashboard({  onClose,  onSubmit,  product,}: {  onClose: () => void;  onSubmit: (p: Product) => void;  product?: Product;}) {
  const [form, setForm] = useState<Product>(
    product || {
      id: undefined,
      name: "",
      price: 0,
      category: "",
      stock: 0,
      description: "",
      createdAt: new Date().toISOString(),
      isActive: true,
      tags: [],
    }
  );

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    category: "",
  });

  const updateField = (key: keyof Product, value: any) => {
    setForm({ ...form, [key]: value });

    if (key === "name" && !value.trim()) {
      setErrors((e) => ({ ...e, name: "Name is required" }));
    } else if (key === "name") {
      setErrors((e) => ({ ...e, name: "" }));
    }

    if (key === "category" && !value.trim()) {
      setErrors((e) => ({ ...e, category: "Category is required" }));
    } else if (key === "category") {
      setErrors((e) => ({ ...e, category: "" }));
    }

    if (key === "price" && value <= 0) {
      setErrors((e) => ({ ...e, price: "Price must be greater than 0" }));
    } else if (key === "price") {
      setErrors((e) => ({ ...e, price: "" }));
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (form.price <= 0) newErrors.price = "Price must be greater than 0";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit(form);
  };

  useEffect(()=>{console.log(form)},[form]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {product ? "Update Product" : "Add New Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="font-medium text-gray-700">Product Name*</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="font-medium text-gray-700">Category*</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Electronics, Fashion..."
          />
          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="font-medium text-gray-700">Price (₹)*</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => updateField("price", Number(e.target.value))}
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="799"
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price}</p>
          )}
        </div>

        <div>
          <label className="font-medium text-gray-700">Stock</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => updateField("stock", Number(e.target.value))}
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="25"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-medium text-gray-700">Tags</label>
          <input
            type="text"
            value={form.tags.join(", ")}
            onChange={(e) =>
              updateField(
                "tags",
                e.target.value.split(",").map((t) => t.trim())
              )
            }
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="wireless, mouse, accessories"
          />
        </div>

        <div className="md:col-span-2">
          <label className="font-medium text-gray-700">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="w-full mt-1 border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Enter product description..."
          ></textarea>
        </div>

        <div className="md:col-span-2 flex items-center gap-3 mt-2">
          <label className="font-medium text-gray-700">Active Status</label>

          <button
            onClick={() => updateField("isActive", !form.isActive)}
            className={`relative inline-flex items-center h-6 w-12 rounded-full transition 
              ${form.isActive ? "bg-blue-600" : "bg-gray-400"}`}
          >
            <span
              className={`inline-block h-5 w-5 bg-white rounded-full transform transition 
                ${form.isActive ? "translate-x-6" : "translate-x-1"}`}
            ></span>
          </button>

          <span
            className={`font-medium ${
              form.isActive ? "text-green-600" : "text-red-600"
            }`}
          >
            {form.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          {product ? "Update" : "Add Product"}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
