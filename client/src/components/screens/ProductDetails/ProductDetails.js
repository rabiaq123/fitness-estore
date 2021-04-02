import React from "react";
import { useLocation } from "react-router-dom";

export default function ProductDetails() {
  let { state } = useLocation();

  return <div>ProductDetails</div>;
}
