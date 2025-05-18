# 🛒 Real‑Time Product Search =

A lightning‑fast, React + TypeScript app that lets users search products in real time no clunky pagination.

---

## 📦 Tech Stack & Dependencies

- **React** (v18) – Component-driven UI  
- **TypeScript** – Type safety, better DX  
- **Create React App** – Zero‑config bundling  
- **CSS** – Plain, modular CSS (no Tailwind)  
- **Fetch API** – Built‑in, promise‑based HTTP requests  
- **DummyJSON** – Public fake‑products API  
- **Debounce** (`setTimeout`) – Throttle API calls on input   
- **CSS Animations** – Fade placeholder, spinner keyframes  

---

## 🚀 Setup Instructions

1. **Clone & enter repo**  
   ```bash
   git clone https://github.com/iamyuviii/Clinikally-assignment-.git

2. **Install Dependency**  
   ```bash
   npm install

3. **Start porject**  
   ```bash
   npm start
   
3. **Open to view the project (make sure that no other project is running on port 3000 )**  
   ```bash
   http://localhost:3000
------------------------------------------------------------------------------------------------


##  Screenshots 
![Screenshot 2025-05-18 172114](https://github.com/user-attachments/assets/48946b20-37ce-43c5-838a-63d3df2d29f4)
![Screenshot 2025-05-18 172127 - Copy](https://github.com/user-attachments/assets/548873eb-40e0-4d55-987b-b197de92adb6)



 ## 💡 Thought Process & Approach

### 🧠 User-First UX
- **🔄 Real-Time Feedback**  
  Search input uses **debounced requests (300ms)** — the app waits until the user stops typing to send API calls, reducing server load and improving performance.

---

### 🧩 Modular Component Design

- **`Autocomplete` Component**  
  Handles:
  - Search state management  
  - Debounced input  
  - Infinite scrolling  
  - Placeholder rotation  
  - Open/close logic  
  - API interaction  

- **`ProductList` Component**  
  Pure presentational component that:
  - Displays product info
  - Handles empty thumbnails (fallback)
  - Applies truncation & hover effects for clean UI

- **`Spinner` Component**  
  Lightweight loading indicator using CSS keyframes, used during initial load and infinite scroll states.

---

### ⚙️ Performance & Clean Code
- Written in **TypeScript** with clearly defined interfaces for `Product` and API response shape.
- A single fetch function handles both full result replacement (new search) and incremental appending (infinite scroll).
- Clean code and readable structure with separation of logic and UI.

---

### 🎨 Styling
- Semantic class names like `.autocomplete-container`, `.product-item`, etc.
- Global reset and utility classes ensure consistent look & spacing.

---

### ♿ Accessibility & Polish
- Dropdown closes on outside click for better UX.
- Supports keyboard navigation with proper focus outlines.
- Animated, rotating placeholder text keeps UI lively.
