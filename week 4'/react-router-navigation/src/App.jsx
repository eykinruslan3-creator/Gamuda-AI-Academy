//<--EXERCISE 1: IMAGE GALLERY WITH KEYBOARD NAVIGATION-->//
// import React from 'react';
// import ImageGallery from './ImageGallery';

// function App() {
//   const sampleImages = [
//     'https://picsum.photos/id/1015/800/500',
//     'https://picsum.photos/id/1016/800/500',
//     'https://picsum.photos/id/1018/800/500',
//     'https://picsum.photos/id/1019/800/500'
//   ];

//   return (
//     <div>
//       <ImageGallery images={sampleImages} />
//     </div>
//   );
// }

// export default App;




//<--EXERCISE 2: REAL-TIME SEARCH FILTER-->//   
// import React from 'react';
// import ProductFilter from './ProductFilter';

// function App() {
//   const sampleProducts = [
//     { id: 1, name: 'Epal', category: 'Fruit' },
//     { id: 2, name: 'Lobak Merah', category: 'Vegetable' },
//     { id: 3, name: 'Pisang', category: 'Fruit' },
//     { id: 4, name: 'Bayam', category: 'Vegetable' },
//     { id: 5, name: 'Oren', category: 'Fruit' }
//   ];

//   return (
//     <div>
//       <ProductFilter products={sampleProducts} />
//     </div>
//   );
// }

// export default App;




// <-- EXAMPLE 1: INTERACTIVE BUTTON COMPONENT -->//
// import { useState } from 'react';

// function InteractiveButton() {
//   const [clickCount, setClickCount] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isPressed, setIsPressed] = useState(false);

//   const handleClick = () => {
//     setClickCount(prev => prev + 1);
//   };

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setIsPressed(false);
//   };

//   const handleMouseDown = () => {
//     setIsPressed(true);
//   };

//   const handleMouseUp = () => {
//     setIsPressed(false);
//   };

//   const buttonStyle = {
//     padding: '10px 20px',
//     backgroundColor: isPressed ? '#0056b3' : isHovered ? '#0069d9' : '#007bff',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     transform: isPressed ? 'scale(0.95)' : 'scale(1)',
//     transition: 'all 0.1s ease'
//   };

//   return (
//     <div>
//       <button
//         style={buttonStyle}
//         onClick={handleClick}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//       >
//         Please DO NOT Click! 😡 ({clickCount})
//       </button>
//       <p>Status: {isPressed ? 'Pressed' : isHovered ? 'Hovered' : 'Normal'}</p>
//     </div>
//   );
// }

// export default InteractiveButton;





// <-- EXAMPLE 2: KEYBOARD EVENT HANDLING -->//
// import { useState } from 'react';

// function KeyboardDemo() {
//   const [inputValue, setInputValue] = useState('');
//   const [keyLog, setKeyLog] = useState([]);
//   const [charCount, setCharCount] = useState(0);

//   const handleKeyDown = (e) => {
//     // Handle special keys
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       alert(`You entered: ${inputValue}`);
//     } else if (e.key === 'Escape') {
//       setInputValue('');
//       setCharCount(0);
//     } else if (e.ctrlKey && e.key === 'a') {
//       e.preventDefault();
//       alert('Ctrl+A pressed!');
//     }

//     // Log the key press
//     setKeyLog(prev => [...prev.slice(-4), e.key]);
//   };

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);
//     setCharCount(value.length);
//   };

//   const handleKeyUp = (e) => {
//     console.log(`Key released: ${e.key}`);
//   };

//   return (
//     <div>
//       <h3>Keyboard Event Demo</h3>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleChange}
//         onKeyDown={handleKeyDown}
//         onKeyUp={handleKeyUp}
//         placeholder="Type here... (Try Enter, Escape, Ctrl+A)"
//       />
//       <p>Character count: {charCount}</p>
//       <p>Recent keys: {keyLog.join(', ')}</p>
//       <small>
//         Special commands:<br />
//         • Enter: Show alert<br />
//         • Escape: Clear input<br />
//         • Ctrl+A: Special action
//       </small>
//     </div>
//   );
// }

// export default KeyboardDemo;



//<-- EXAMPLE 3: FORM HANDLING WITH VALIDATION -->//
// import { useState } from 'react';

// function ContactForm() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//     subscribe: false
//   });
  
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = 'Message is required';
//     } else if (formData.message.length < 10) {
//       newErrors.message = 'Message must be at least 10 characters';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       alert('Form submitted successfully!');
//       console.log('Form data:', formData);
//       setFormData({ name: '', email: '', message: '', subscribe: false });
//     } catch (error) {
//       alert('Submission failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Contact Us</h2>
//       <div>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             style={{ borderColor: errors.name ? 'red' : 'initial' }}
//           />
//         </label>
//         {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
//       </div>

//       <div>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             style={{ borderColor: errors.email ? 'red' : 'initial' }}
//           />
//         </label>
//         {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
//       </div>

//       <div>
//         <label>
//           Message:
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleInputChange}
//             rows="4"
//             style={{ borderColor: errors.message ? 'red' : 'initial' }}
//           />
//         </label>
//         {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
//       </div>

//       <div>
//         <label>
//           <input
//             type="checkbox"
//             name="subscribe"
//             checked={formData.subscribe}
//             onChange={handleInputChange}
//           />
//           Subscribe to newsletter
//         </label>
//       </div>

//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? 'Submitting...' : 'Submit'}
//       </button>
//     </form>
//   );
// }

// export default ContactForm;




//<-- EXAMPLE 4: DYNAMIC LIST WITH EVENT DELEGATION -->//
// import { useState } from 'react';

// function DynamicList() {
//   const [items, setItems] = useState([
//     { id: 1, name: 'Apple', category: 'fruit' },
//     { id: 2, name: 'Carrot', category: 'vegetable' },
//     { id: 3, name: 'Banana', category: 'fruit' }
//   ]);
//   const [newItem, setNewItem] = useState('');

//   const handleListClick = (e) => {
//     // Event delegation - handle clicks on list items
//     const listItem = e.target.closest('li');
//     if (!listItem) return;

//     const itemId = parseInt(listItem.dataset.id);
//     const action = e.target.dataset.action;

//     if (action === 'delete') {
//       setItems(prev => prev.filter(item => item.id !== itemId));
//     } else if (action === 'edit') {
//       const newName = prompt('Enter new name:');
//       if (newName) {
//         setItems(prev => prev.map(item => 
//           item.id === itemId ? { ...item, name: newName } : item
//         ));
//       }
//     }
//   };

//   const addItem = () => {
//     if (newItem.trim()) {
//       setItems(prev => [...prev, {
//         id: Date.now(),
//         name: newItem,
//         category: 'other'
//       }]);
//       setNewItem('');
//     }
//   };

//   return (
//     <div>
//       <h2>Dynamic List</h2>
//       <div>
//         <input
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           placeholder="Add new item..."
//           onKeyDown={(e) => e.key === 'Enter' && addItem()}
//         />
//         <button onClick={addItem}>Add Item</button>
//       </div>

//       <ul onClick={handleListClick} style={{ listStyle: 'none', padding: 0 }}>
//         {items.map(item => (
//           <li
//             key={item.id}
//             data-id={item.id}
//             style={{
//               padding: '10px',
//               border: '1px solid #ccc',
//               margin: '5px 0',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center'
//             }}
//           >
//             <span>{item.name} ({item.category})</span>
//             <div>
//               <button data-action="edit">Edit</button>
//               <button data-action="delete" style={{ marginLeft: '5px' }}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default DynamicList;

// import { useState } from "react";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [notifications, setNotifications] = useState([]);

//   const login = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       // 70% success rate
//       if (Math.random() > 0.3) {
//         setUser({
//           id: 1,
//           name: "eykin",
//           role: "admin",
//           avatar: "https://via.placeholder.com/50",
//         });

//         setNotifications([
//           {
//             id: 1,
//             message: "Welcome back!",
//             type: "success",
//           },
//           {
//             id: 2,
//             message: "You have 3 pending tasks",
//             type: "info",
//           },
//         ]);
//       } else {
//         throw new Error("Login failed. Please try again.");
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setNotifications([]);
//     setError(null);
//   };

//   const dismissNotification = (id) => {
//     setNotifications((prev) =>
//       prev.filter((notif) => notif.id !== id)
//     );
//   };

//   return (
//     <div
//       className="dashboard"
//       style={{
//         textAlign: "center",
//         fontFamily: "Arial",
//         marginTop: "40px",
//       }}
//     >
//       <header>
//         <h1>Dashboard</h1>

//         {user ? (
//           <div className="user-info">
//             <img
//               src={user.avatar}
//               alt="Avatar"
//               style={{
//                 width: "50px",
//                 height: "50px",
//                 borderRadius: "50%",
//               }}
//             />

//             <span>Welcome, {user.name}</span>

//             <button
//               onClick={logout}
//               style={{
//                 marginLeft: "10px",
//                 padding: "10px",
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={login}
//             disabled={isLoading}
//             style={{
//               padding: "10px 20px",
//             }}
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         )}
//       </header>

//       <main>
//         {/* ERROR */}
//         {error && (
//           <div
//             className="error-banner"
//             style={{
//               marginTop: "20px",
//               color: "red",
//             }}
//           >
//             <p>❌ {error}</p>

//             <button onClick={() => setError(null)}>
//               X
//             </button>
//           </div>
//         )}

//         {/* LOADING ANIMATION */}
//         {isLoading && (
//           <div>
//             <DotLottieReact
//               src="https://lottie.host/c1d2816a-d622-4719-93fa-3abf12dc7966/Ds0pxUweAo.json"
//               loop
//               autoplay
//               style={{
//                 width: "150px",
//                 height: "150px",
//                 margin: "20px auto",
//               }}
//             />
//             <p>Loading...</p>
//           </div>
//         )}

//         {/* USER LOGGED IN */}
//         {user ? (
//           <div
//             className="dashboard-content"
//             style={{
//               marginTop: "30px",
//             }}
//           >
//             <h2>
//               Welcome to your dashboard, {user.name}!
//             </h2>

//             {/* ADMIN ONLY */}
//             {user.role === "admin" && (
//               <div className="admin-panel">
//                 <h3>Admin Controls</h3>

//                 <button
//                   style={{
//                     margin: "5px",
//                     padding: "10px",
//                   }}
//                 >
//                   Manage Users
//                 </button>

//                 <button
//                   style={{
//                     margin: "5px",
//                     padding: "10px",
//                   }}
//                 >
//                   View Analytics
//                 </button>

//                 <button
//                   style={{
//                     margin: "5px",
//                     padding: "10px",
//                   }}
//                 >
//                   System Settings
//                 </button>
//               </div>
//             )}

//             {/* NOTIFICATIONS */}
//             {notifications.length > 0 && (
//               <div
//                 className="notifications"
//                 style={{
//                   marginTop: "30px",
//                 }}
//               >
//                 <h3>
//                   Notifications ({notifications.length})
//                 </h3>

//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`notification ${notification.type}`}
//                     style={{
//                       margin: "10px",
//                     }}
//                   >
//                     <span>{notification.message}</span>

//                     <button
//                       onClick={() =>
//                         dismissNotification(notification.id)
//                       }
//                       style={{
//                         marginLeft: "10px",
//                       }}
//                     >
//                       X
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* NO NOTIFICATIONS */}
//             {notifications.length === 0 && (
//               <p>No new notifications</p>
//             )}
//           </div>
//         ) : (
//           !isLoading &&
//           !error && (
//             <div
//               className="welcome-message"
//               style={{
//                 marginTop: "30px",
//               }}
//             >
//               <h2>
//                 Please log in to access your dashboard
//               </h2>

//               <p>
//                 Click the login button to get started
//               </p>
//             </div>
//           )
//         )}
//       </main>
//     </div>
//   );
// }

// export default Dashboard;

// import { useState, useMemo } from "react";

// function ProductCatalog() {
//   const [products] = useState([
//     {
//       id: 1,
//       name: "Laptop",
//       price: 999,
//       category: "electronics",
//       inStock: true,
//       rating: 4.5,
//     },
//     {
//       id: 2,
//       name: "Phone",
//       price: 699,
//       category: "electronics",
//       inStock: false,
//       rating: 4.2,
//     },
//     {
//       id: 3,
//       name: "Shirt",
//       price: 29,
//       category: "clothing",
//       inStock: true,
//       rating: 4.0,
//     },
//     {
//       id: 4,
//       name: "Shoes",
//       price: 89,
//       category: "clothing",
//       inStock: true,
//       rating: 4.7,
//     },
//     {
//       id: 5,
//       name: "Book",
//       price: 15,
//       category: "books",
//       inStock: true,
//       rating: 4.8,
//     },
//     {
//       id: 6,
//       name: "Headphones",
//       price: 199,
//       category: "electronics",
//       inStock: false,
//       rating: 4.3,
//     },
//   ]);

//   const [filters, setFilters] = useState({
//     category: "all",
//     inStock: false,
//     minPrice: 0,
//     maxPrice: 1000,
//     searchTerm: "",
//   });

//   const [sortBy, setSortBy] = useState("name");
//   const [sortOrder, setSortOrder] = useState("asc");

//   const filteredAndSortedProducts = useMemo(() => {
//     let filtered = products.filter((product) => {
//       const matchesCategory =
//         filters.category === "all" ||
//         product.category === filters.category;

//       const matchesStock =
//         !filters.inStock || product.inStock;

//       const matchesPrice =
//         product.price >= filters.minPrice &&
//         product.price <= filters.maxPrice;

//       const matchesSearch =
//         product.name
//           .toLowerCase()
//           .includes(filters.searchTerm.toLowerCase());

//       return (
//         matchesCategory &&
//         matchesStock &&
//         matchesPrice &&
//         matchesSearch
//       );
//     });

//     // Sort the filtered results
//     filtered.sort((a, b) => {
//       let comparison = 0;

//       if (sortBy === "price") {
//         comparison = a.price - b.price;
//       } else if (sortBy === "rating") {
//         comparison = b.rating - a.rating;
//       } else {
//         comparison = a[sortBy].localeCompare(b[sortBy]);
//       }

//       return sortOrder === "asc" ? comparison : -comparison;
//     });

//     return filtered;
//   }, [products, filters, sortBy, sortOrder]);

//   const updateFilter = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       category: "all",
//       inStock: false,
//       minPrice: 0,
//       maxPrice: 1000,
//       searchTerm: "",
//     });
//   };

//   const categories = [
//     "all",
//     ...new Set(products.map((p) => p.category)),
//   ];

//   return (
//     <div className="product-catalog">
//       <div className="filters">
//         <h3>Filters</h3>

//         <input
//           type="text"
//           placeholder="Search products..."
//           value={filters.searchTerm}
//           onChange={(e) =>
//             updateFilter("searchTerm", e.target.value)
//           }
//         />

//         <select
//           value={filters.category}
//           onChange={(e) =>
//             updateFilter("category", e.target.value)
//           }
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category.charAt(0).toUpperCase() +
//                 category.slice(1)}
//             </option>
//           ))}
//         </select>

//         <label>
//           <input
//             type="checkbox"
//             checked={filters.inStock}
//             onChange={(e) =>
//               updateFilter("inStock", e.target.checked)
//             }
//           />
//           In Stock Only
//         </label>

//         <div className="price-range">
//           <label>
//             Min Price: $
//             <input
//               type="number"
//               value={filters.minPrice}
//               onChange={(e) =>
//                 updateFilter(
//                   "minPrice",
//                   Number(e.target.value)
//                 )
//               }
//             />
//           </label>

//           <label>
//             Max Price: $
//             <input
//               type="number"
//               value={filters.maxPrice}
//               onChange={(e) =>
//                 updateFilter(
//                   "maxPrice",
//                   Number(e.target.value)
//                 )
//               }
//             />
//           </label>
//         </div>

//         <button onClick={clearFilters}>
//           Clear Filters
//         </button>
//       </div>

//       <div className="sort-controls">
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//         >
//           <option value="name">Name</option>
//           <option value="price">Price</option>
//           <option value="rating">Rating</option>
//         </select>

//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value)}
//         >
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>

//       <div className="results-info">
//         <p>
//           Showing {filteredAndSortedProducts.length} of{" "}
//           {products.length} products
//         </p>
//       </div>

//       <div className="product-grid">
//         {filteredAndSortedProducts.length > 0 ? (
//           filteredAndSortedProducts.map((product) => (
//             <div key={product.id} className="product-card">
//               <h4>{product.name}</h4>

//               <p className="price">
//                 ${product.price}
//               </p>

//               <p className="category">
//                 {product.category}
//               </p>

//               <p className="rating">
//                 ⭐ {product.rating}
//               </p>

//               <div className="stock-status">
//                 {product.inStock ? (
//                   <span className="in-stock">
//                     In Stock
//                   </span>
//                 ) : (
//                   <span className="out-of-stock">
//                     Out of Stock
//                   </span>
//                 )}
//               </div>

//               <button disabled={!product.inStock}>
//                 {product.inStock
//                   ? "Add to Cart"
//                   : "Notify When Available"}
//               </button>
//             </div>
//           ))
//         ) : (
//           <div className="no-results">
//             <h3>No products found</h3>
//             <p>
//               Try adjusting your filters or search terms
//             </p>

//             <button onClick={clearFilters}>
//               Reset Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProductCatalog;

import { useState } from "react";
import "./CommentSystem.css";

function CommentSystem() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      content: "This is a great post!",
      timestamp: new Date("2024-01-15T10:30:00"),
      likes: 5,
      replies: [
        {
          id: 2,
          author: "Jane Smith",
          content: "I totally agree!",
          timestamp: new Date("2024-01-15T11:00:00"),
          likes: 2,
          replies: [],
        },
      ],
    },
    {
      id: 3,
      author: "Bob Wilson",
      content: "Thanks for sharing this information.",
      timestamp: new Date("2024-01-15T12:00:00"),
      likes: 3,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "Current User",
        content: newComment,
        timestamp: new Date(),
        likes: 0,
        replies: [],
      };

      setComments((prev) => [...prev, comment]);
      setNewComment("");
    }
  };

  const addReply = (parentId) => {
    if (replyContent.trim()) {
      const reply = {
        id: Date.now(),
        author: "Current User",
        content: replyContent,
        timestamp: new Date(),
        likes: 0,
        replies: [],
      };

      const addReplyToComment = (comments) => {
        return comments.map((comment) => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...comment.replies, reply],
            };
          } else if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: addReplyToComment(comment.replies),
            };
          }

          return comment;
        });
      };

      setComments((prev) => addReplyToComment(prev));
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  const likeComment = (commentId) => {
    const updateLikes = (comments) => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.likes + 1,
          };
        } else if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateLikes(comment.replies),
          };
        }

        return comment;
      });
    };

    setComments((prev) => updateLikes(prev));
  };

  const deleteComment = (commentId) => {
    const removeComment = (comments) => {
      return comments.filter((comment) => {
        if (comment.id === commentId) {
          return false;
        } else if (comment.replies.length > 0) {
          comment.replies = removeComment(comment.replies);
        }

        return true;
      });
    };

    setComments((prev) => removeComment(prev));
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;

    return `${days}d ago`;
  };

  const CommentComponent = ({ comment, depth = 0 }) => (
    <div
      className="comment"
      style={{
        marginLeft: `${depth * 20}px`,
        borderLeft:
          depth > 0 ? "2px solid #eee" : "none",
        paddingLeft: depth > 0 ? "10px" : "0",
      }}
    >
      <div className="comment-header">
        <strong>{comment.author}</strong>

        <span className="timestamp">
          {formatTime(comment.timestamp)}
        </span>
      </div>

      <div className="comment-content">
        <p>{comment.content}</p>
      </div>

      <div className="comment-actions">
        <button onClick={() => likeComment(comment.id)}>
          👍 {comment.likes}
        </button>

        <button onClick={() => setReplyingTo(comment.id)}>
          Reply
        </button>

        <button onClick={() => deleteComment(comment.id)}>
          Delete
        </button>
      </div>

      {replyingTo === comment.id && (
        <div className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            rows="2"
          />

          <div>
            <button onClick={() => addReply(comment.id)}>
              Post Reply
            </button>

            <button onClick={() => setReplyingTo(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="comments-system">
      <h3>Comments ({comments.length})</h3>

      <div className="new-comment">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
        />

        <button onClick={addComment}>
          Post Comment
        </button>
      </div>

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              comment={comment}
            />
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default CommentSystem;