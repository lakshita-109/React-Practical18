
import { useState } from "react";

function ProductManagement() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 55000, category: "Electronics" },
    { id: 2, name: "Headphones", price: 1500, category: "Accessories" },
    { id: 3, name: "Smartphone", price: 25000, category: "Electronics" },
    { id: 4, name: "Backpack", price: 1200, category: "Fashion" },
  ]);

  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
  });
  const [message, setMessage] = useState("");

  function handleSelect(event) {
    const id = event.target.value;
    setSelectedId(id);
    setMessage("");

    const product = products.find((item) => item.id === Number(id));

    if (product) {
      setFormData({
        name: product.name,
        price: String(product.price),
        category: product.category,
      });
    } else {
      setFormData({ name: "", price: "", category: "" });
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setMessage("");
  }

  function handleUpdate(event) {
    event.preventDefault();

    if (!selectedId) {
      setMessage("Please select a product first.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.category ||
      formData.price === "" ||
      Number(formData.price) <= 0
    ) {
      setMessage("Please enter valid product details.");
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === Number(selectedId)
          ? {
              ...product,
              name: formData.name.trim(),
              price: Number(formData.price),
              category: formData.category,
            }
          : product
      )
    );

    setMessage("Product updated successfully!");
  }

  return (
    <div className="min-h-screen bg-rose-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300 p-8 text-center text-white shadow-xl">
          <div className="mb-3 text-4xl">🛍️</div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Product Management
          </h1>
          <p className="mt-3 text-pink-50">
            Manage and update your favourite products
          </p>
          <div className="mt-5 inline-block rounded-full bg-white/25 px-5 py-2 text-sm font-semibold">
            Total Products: {products.length}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* Product List */}
          <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-md">
            <h2 className="mb-5 text-xl font-bold text-rose-900">
              📦 Existing Products
            </h2>

            <label className="mb-2 block text-sm font-semibold text-rose-800">
              Select a product
            </label>

            <select
              value={selectedId}
              onChange={handleSelect}
              className="w-full rounded-xl border border-pink-200 bg-pink-50 p-3 text-rose-950 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
            >
              <option value="">-- Choose a product --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <div className="mt-6 space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`rounded-2xl border p-4 transition ${
                    selectedId === String(product.id)
                      ? "border-pink-400 bg-pink-100 shadow-sm"
                      : "border-rose-100 bg-rose-50/50 hover:bg-pink-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-rose-950">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-rose-600">
                        {product.category}
                      </p>
                    </div>

                    <span className="rounded-full bg-white px-3 py-2 text-sm font-bold text-pink-600 shadow-sm">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Form */}
          <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-md">
            <h2 className="mb-2 text-xl font-bold text-rose-900">
              ✏️ Edit Product
            </h2>
            <p className="mb-6 text-sm text-rose-500">
              Select a product and modify its details below.
            </p>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-rose-800">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!selectedId}
                  placeholder="Enter product name"
                  className="w-full rounded-xl border border-pink-200 bg-rose-50/50 p-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-rose-800">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={!selectedId}
                  placeholder="Enter product price"
                  className="w-full rounded-xl border border-pink-200 bg-rose-50/50 p-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-slate-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-rose-800">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={!selectedId}
                  className="w-full rounded-xl border border-pink-200 bg-rose-50/50 p-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:bg-slate-100"
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                  <option value="Stationery">Stationery</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!selectedId}
                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-3 font-bold text-white shadow-md transition hover:from-pink-600 hover:to-rose-600 hover:shadow-lg disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400"
              >
                Update Product ✨
              </button>

              {message && (
                <p
                  role="status"
                  className={`rounded-xl p-3 text-center text-sm font-semibold ${
                    message.includes("successfully")
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-rose-400">
          Made with 💗 using React & Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default ProductManagement;