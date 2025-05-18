
import React from "react";
import type { Product } from "./auto";
import "./product.css";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-item"
          onClick={() => {
          }}
        >
          <img
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            className="product-image"
          />
          <div className="product-info">
            <div className="product-title">{product.title}</div>
            <div className="product-brand">{product.brand}</div>
          </div>
          <div className="product-price">${product.price}</div>
        </div>
      ))}
    </div>
  );
}
