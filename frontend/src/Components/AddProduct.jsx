import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  // Initial State matching the Product Schema
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    tags: "",
    minimumOrderQuantity: 1,
    stock: "",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    // Format tags from comma separated string to array
    const formattedTags = productData.tags
      ? productData.tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "")
      : [];

    // The final payload to send to backend
    const payload = {
      ...productData,
      price: Number(productData.price),
      minimumOrderQuantity: Number(productData.minimumOrderQuantity),
      stock: Number(productData.stock),
      id: Number(productData.id),
      tags: formattedTags,
    };

    try {
      // NOTE: User requested NO BACKEND CHANGES.
      // This is a placeholder for the actual API call. 
      // If the backend route `POST /product/add` exists, it would be called here.
      console.log("Submitting payload:", payload);
      
      // Simulating a successful network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ type: "success", text: "Product added successfully!" });
      
      // Reset form after success
      setProductData({
        title: "",
        description: "",
        price: "",
        tags: "",
        minimumOrderQuantity: 1,
        stock: "",
        id: "",
        image: "",
      });

    } catch (error) {
      console.error("Error adding product:", error);
      setMessage({ type: "error", text: "Failed to add product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ensure only admins can view this page (Double check, although Router handles primary block)
  if (user?.role !== "admin") {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-zinc-50 px-4">
        <h1 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Access Denied</h1>
        <p className="text-zinc-600 mb-8 max-w-md text-center">You do not have the necessary permissions to view this page. Administrator access is required.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-zinc-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-purple-600 transition-colors shadow-sm"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white py-12 md:py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 border-b border-zinc-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Add New Product</h1>
            <p className="text-zinc-500 mt-2 text-sm">Deploy a new item to the Navazon catalog.</p>
          </div>
          <button 
            onClick={() => navigate('/admin')}
            className="text-sm font-bold text-zinc-500 hover:text-purple-600 transition-colors uppercase tracking-widest flex items-center gap-2"
          >
           ← Back to Admin
          </button>
        </div>

        {message.text && (
          <div className={`mb-8 p-4 border text-sm font-semibold flex items-center justify-between ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage({ type: "", text: "" })} className="text-current opacity-60 hover:opacity-100">&times;</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-50 border border-zinc-200 p-8 md:p-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Product Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={productData.title}
                  onChange={handleChange}
                  placeholder="e.g. Premium Wireless Headphones"
                  className="w-full px-4 py-3 bg-white border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Description *</label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={productData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the product..."
                  className="w-full px-4 py-3 bg-white border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400 resize-none"
                />
              </div>

             

              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Tags (comma separated) *</label>
                <input
                  type="text"
                  name="tags"
                  required
                  value={productData.tags}
                  onChange={handleChange}
                  placeholder="electronics, audio, wireless"
                  className="w-full px-4 py-3 bg-white border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
                />
              </div>
 <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="299.99"
                    className="w-full px-4 py-3 bg-white border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
                  />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Stock Available *</label>
                  <input
                    type="number"
                    name="stock"
                    required
                    min="0"
                    value={productData.stock}
                    onChange={handleChange}
                    placeholder="50"
                    className="w-full px-4 py-3 bg-white border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
                  />
                </div>
              </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
             

               <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Minimum Order Qty *</label>
                <input
                  type="number"
                  name="minimumOrderQuantity"
                  required
                  min="1"
                  value={productData.minimumOrderQuantity}
                  onChange={handleChange}
                  placeholder="1"
                  className="w-full px-4 py-3 bg-white border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Add Images</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  value={productData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-white border border-zinc-300 text-zinc-900 text-sm focus:outline-none focus:bg-white focus:border-purple-600 focus:ring-0 transition-colors placeholder:text-zinc-400"
                />
                <p className="text-[10px] text-zinc-500 mt-1">Leaves default placeholder if empty.</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-200 mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-10 py-4 bg-zinc-900 hover:bg-purple-600 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Publishing Catalog..." : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
