import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCriteria, setFilterCriteria] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updateFormData, setUpdateFormData] = useState({ title: '', description: '', category: '' });
    const [newProductFormData, setNewProductFormData] = useState({ title: '', description: '', category: '' });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://dummyjson.com/products');
          setData(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleFilter = (e) => {
      setFilterCriteria(e.target.value);
    };
  
    const handleUpdateFormChange = (e) => {
      setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
    };
  
    const handleNewProductFormChange = (e) => {
      setNewProductFormData({ ...newProductFormData, [e.target.name]: e.target.value });
    };
  
    const handleUpdateSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`https://dummyjson.com/products/${selectedProduct.id}`, updateFormData);
        console.log('Update Product Response:', response.data);
        const updatedProductIndex = data.products.findIndex(product => product.id === selectedProduct.id);
        const updatedProducts = [...data.products];
        updatedProducts[updatedProductIndex] = response.data;
        setData({ ...data, products: updatedProducts });
        setSelectedProduct(null);
        setUpdateFormData({ title: '', description: '', category: '' });
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };
  
      
      
  
    const handleUpdateClick = (product) => {
      setSelectedProduct(product);
      setUpdateFormData({
        title: product.title,
        description: product.description,
        category: product.category
      });
    };
  
    const handleDeleteClick = async (product) => {
      try {
        await axios.delete(`https://dummyjson.com/products/${product.id}`);
        const updatedProducts = data.products.filter((p) => p.id !== product.id);
        setData({ ...data, products: updatedProducts });
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
  
    let filteredProducts = data.products || [];
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCriteria) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category.toLowerCase() === filterCriteria.toLowerCase()
      );
    }
  
    const categories = [...new Set(data.products?.map((product) => product.category))];
  
    return (
        <div>
          <h1>Product List</h1>
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by Title..."
            />
            <select value={filterCriteria} onChange={handleFilter}>
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td>
                        <button onClick={() => handleUpdateClick(product)} className='update'>Update</button>
                        <button onClick={() => handleDeleteClick(product)} className='delete'>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedProduct && (
                <form onSubmit={handleUpdateSubmit}>
                  <h2>Update Product</h2>
                  <div>
                    <label>Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={updateFormData.title}
                      onChange={handleUpdateFormChange}
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <input
                      type="text"
                      name="description"
                      value={updateFormData.description}
                      onChange={handleUpdateFormChange}
                    />
                  </div>
                  <div>
                    <label>Category:</label>
                    <input
                      type="text"
                      name="category"
                      value={updateFormData.category}
                      onChange={handleUpdateFormChange}
                    />
                  </div>
                  <button type="submit" >Update</button>
                </form>
              )}
            </>
          )}
        </div>
      );
      
};

export default Home;
