
import React, { useState, useEffect, useRef, UIEvent, forwardRef, useImperativeHandle } from "react";
import { ProductList } from "./productlist";
import { Spinner } from "./spinner";
import "./auto.css";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
  limit: number;
  skip: number;
}

export interface AutocompleteHandle {
  focusInput: () => void;
}

export const Autocomplete = forwardRef<AutocompleteHandle>((props, ref) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [placeholder, setPlaceholder] = useState("Search for products...");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus();
    }
  }));


  const fetchProducts = async (searchQuery: string, newSkip = 0, append = false) => {
    if (searchQuery.length < 2) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${newSkip}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data: ProductResponse = await res.json();
      setTotal(data.total);
      setSkip(newSkip);
      setProducts((prev) =>
        append ? [...prev, ...data.products] : data.products
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial & reset search
  useEffect(() => {
    if (query.length >= 2) {
      fetchProducts(query, 0, false);
    } else {
      setProducts([]);
      setTotal(0);
      setSkip(0);
    }
  }, [query]);

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20 &&
      !isLoading &&
      skip + limit < total
    ) {
      fetchProducts(query, skip + limit, true);
    }
  };

  // Rotating placeholder 
  useEffect(() => {
    const placeholders = [
      "Search for products...",
      "Search iPhone...",
      "Search laptop...",
      "Search furniture...",
      "Search watches...",
    ];
    let idx = 0;
    const id = setInterval(() => {
      idx = (idx + 1) % placeholders.length;
      setPlaceholder(placeholders[idx]);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // Debounced input
  // in this i have set the query to and set it to 2 so after 2 seconds it will send the query
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (val.length < 2) setProducts([]);
    }, 300);
  };




  return (
    <div className="autocomplete-container" style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="autocomplete-input"
      />
      {!isLoading && query && (
        <button
          type="button"
          className="autocomplete-reset-btn"
          onClick={() => setQuery("")}
          tabIndex={-1}
        >
          ×
        </button>
      )}
      {isLoading && (
        <div className="autocomplete-spinner">
          <Spinner />
        </div>
      )}
      {products.length > 0 && (
        <div
          className="autocomplete-dropdown"
          ref={dropdownRef}
          onScroll={onScroll}
        >
          {error && (
            <div className="autocomplete-error">{error}</div>
          )}
          <ProductList products={products} />
        
          {isLoading && (
            <div className="autocomplete-bottom-spinner">
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
});
