// import { useState, useEffect } from "react";

// function RealTimeClock() {
//   const [time, setTime] = useState(new Date());
//   const [isRunning, setIsRunning] = useState(true);
//   const [format24Hour, setFormat24Hour] = useState(false);

//   useEffect(() => {
//     let interval;

//     if (isRunning) {
//       interval = setInterval(() => {
//         setTime(new Date());
//       }, 1000);
//     }

//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [isRunning]);

//   useEffect(() => {
//     document.title = `Clock - ${formatTime(time)}`;

//     return () => {
//       document.title = "React App";
//     };
//   }, [time, format24Hour]);

//   const formatTime = (date) => {
//     const options = {
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: !format24Hour,
//     };

//     return date.toLocaleTimeString("en-US", options);
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="clock-container">
//       <div className="date">{formatDate(time)}</div>

//       <div className="time">{formatTime(time)}</div>

//       <div className="controls">
//         <button onClick={() => setIsRunning(!isRunning)}>
//           {isRunning ? "Pause" : "Resume"}
//         </button>

//         <label>
//           <input
//             type="checkbox"
//             checked={format24Hour}
//             onChange={(e) => setFormat24Hour(e.target.checked)}
//           />
//           24-hour format
//         </label>
//       </div>

//       <div className="status">
//         Clock is {isRunning ? "running" : "paused"}
//       </div>
//     </div>
//   );
// }

// export default RealTimeClock;

// import { useState, useEffect } from "react";

// function WindowTracker() {
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   const [scrollPosition, setScrollPosition] = useState({
//     x: window.scrollX,
//     y: window.scrollY,
//   });

//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollPosition({
//         x: window.scrollX,
//         y: window.scrollY,
//       });
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   useEffect(() => {
//     const data = {
//       windowSize,
//       scrollPosition,
//       timestamp: new Date().toISOString(),
//     };

//     localStorage.setItem("windowTracker", JSON.stringify(data));
//   }, [windowSize, scrollPosition]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         console.log("Page is hidden");
//       } else {
//         console.log("Page is visible");
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   return (
//     <div className="window-tracker">
//       <h3>Window & Scroll Tracker</h3>

//       <div className="info-grid">
//         <div className="info-card">
//           <h4>Window Size</h4>

//           <p>Width: {windowSize.width}px</p>
//           <p>Height: {windowSize.height}px</p>

//           <p>
//             Aspect Ratio:
//             {(windowSize.width / windowSize.height).toFixed(2)}
//           </p>
//         </div>

//         <div className="info-card">
//           <h4>Scroll Position</h4>

//           <p>X: {scrollPosition.x}px</p>
//           <p>Y: {scrollPosition.y}px</p>

//           <p>
//             Total Scrolled:{" "}
//             {Math.round(
//               Math.sqrt(scrollPosition.x ** 2 + scrollPosition.y ** 2),
//             )}
//             px
//           </p>
//         </div>

//         <div className="info-card">
//           <h4>Connection Status</h4>

//           <p className={isOnline ? "online" : "offline"}>
//             {isOnline ? "🟢 Online" : "🔴 Offline"}
//           </p>
//         </div>

//         <div className="info-card">
//           <h4>Viewport Classification</h4>

//           <p>
//             {windowSize.width < 768
//               ? "Mobile"
//               : windowSize.width < 1024
//                 ? "Tablet"
//                 : "Desktop"}
//           </p>
//         </div>
//       </div>

//       <div
//         style={{
//           height: "200vh",
//           background: "linear-gradient(to bottom, #f0f0f0, #e0e0e0)",
//         }}
//       >
//         <p>Scroll down to see the scroll position change...</p>
//       </div>
//     </div>
//   );
// }

// export default WindowTracker;

// import { useState } from "react";
// import UserProfile from "./UserProfile";

// const mockUsers = {
//   1: {
//     id: 1,
//     name: "John Doe",
//   },

//   2: {
//     id: 2,
//     name: "Jane Smith",
//   },
// };

// function App() {
//   const [selectedUserId, setSelectedUserId] =
//     useState(null);

//   return (
//     <div>
//       <h2>
//         Example 3: Data Fetching with Loading States
//       </h2>

//       <h3>Select a User</h3>

//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//         }}
//       >
//         {Object.values(mockUsers).map((user) => (
//           <button
//             key={user.id}
//             onClick={() =>
//               setSelectedUserId(user.id)
//             }
//           >
//             {user.name}
//           </button>
//         ))}
//       </div>

//       <hr />

//       <UserProfile userId={selectedUserId} />
//     </div>
//   );
// }

// export default App;

// import { useEffect, useRef, useState } from "react";
// import "./App.css";

// function App() {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       sender: "Lavender",
//       text: "Hi! Welcome to Live Chat 👋",
//     },
//   ]);

//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const [isTyping, setIsTyping] = useState(false);

//   const bottomRef = useRef(null);

//   // Sample automatic messages
//   const autoMessages = [
//     "Hello! How are you?",
//     "What are you doing?",
//     "React is actually fun 😂",
//     "I'm learning useEffect now!",
//     "This is a live chat simulator 💜",
//     "Did you understand useEffect?",
//   ];

//   // ========================================
//   // 1. AUTO-GENERATE MESSAGE
//   // ========================================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Show typing indicator first
//       setIsTyping(true);

//       const typingTimer = setTimeout(() => {
//         const randomMessage =
//           autoMessages[
//             Math.floor(Math.random() * autoMessages.length)
//           ];

//         const newMessage = {
//           id: Date.now(),
//           sender: "Lavender",
//           text: randomMessage,
//         };

//         setMessages((previousMessages) => [
//           ...previousMessages,
//           newMessage,
//         ]);

//         setIsTyping(false);
//       }, 1500);

//       return () => clearTimeout(typingTimer);
//     }, 4000);

//     // ========================================
//     // 2. CLEANUP INTERVAL
//     // ========================================
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   // ========================================
//   // 3. ONLINE / OFFLINE STATUS
//   // ========================================
//   useEffect(() => {
//     const handleOnline = () => {
//       setIsOnline(true);
//     };

//     const handleOffline = () => {
//       setIsOnline(false);
//     };

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   // ========================================
//   // 4. AUTO SCROLL TO BOTTOM
//   // ========================================
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, isTyping]);

//   return (
//     <div className="page">
//       <div className="chat-container">

//         {/* HEADER */}
//         <div className="chat-header">
//           <div className="profile">
//             <div className="avatar">L</div>

//             <div>
//               <h2>Lavender</h2>

//               <p className={isOnline ? "online" : "offline"}>
//                 <span className="status-dot"></span>

//                 {isOnline ? "Online" : "Offline"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* CHAT MESSAGES */}
//         <div className="chat-body">
//           <div className="today">Today</div>

//           {messages.map((message) => (
//             <div className="message-row" key={message.id}>
//               <div className="message">
//                 <p>{message.text}</p>

//                 <span>
//                   {new Date(message.id).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//               </div>
//             </div>
//           ))}

//           {/* ========================================
//               5. TYPING INDICATOR
//           ======================================== */}

//           {isTyping && (
//             <div className="typing">
//               <span></span>
//               <span></span>
//               <span></span>
//             </div>
//           )}

//           <div ref={bottomRef}></div>
//         </div>

//         {/* BOTTOM INFO */}
//         <div className="chat-footer">
//           <p>
//             {isOnline
//               ? "Waiting for new messages..."
//               : "You are currently offline"}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import SystemDashboard from "./SystemDashboard";
// import "./App.css";

// function App() {
//   const [showDashboard, setShowDashboard] = useState(true);

//   const handleDashboardToggle = () => {
//     setShowDashboard((prev) => !prev);
//   };

//   return (
//     <div className="app">
//       <h1>Exercise 2: System Monitor Dashboard</h1>

//       <button
//         className="toggle-btn"
//         onClick={handleDashboardToggle}
//       >
//         {showDashboard
//           ? "Stop Dashboard (Unmount)"
//           : "Start Dashboard (Mount)"}
//       </button>

//       <hr />

//       {showDashboard && <SystemDashboard />}
//     </div>
//   );
// }

// export default App;