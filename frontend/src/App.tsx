// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ProductsPage from "./pages/Catalog/Products";
import RentalRequestForm from "./pages/Catalog/RentalRequestForm";
import ReviewRequest from "./pages/Admin/ReviewRequest";
import ManageContract from "./pages/Admin/ManageContract";
import GenerateCertificate from "./pages/Admin/GenerateCertificate";
import ContractsPage from "./pages/Client/ContractsPage";
import ContractDetailsPage from "./pages/Client/ContractDetailsPage";
import CertificatesPage from "./pages/Client/CertificatesPage";
import HomePage from "./pages/Home/Home";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/rental-request" element={<RentalRequestForm />} />
        <Route
          path="/admin/review-request/:requestId"
          element={<ReviewRequest />}
        />
        <Route
          path="/admin/manage-contract/:requestId"
          element={<ManageContract />}
        />
        <Route
          path="/admin/generate-certificate/:contractId"
          element={<GenerateCertificate />}
        />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/contract/:contractId" element={<ContractDetailsPage />} />
        <Route
          path="/contract/:contractId/certificates"
          element={<CertificatesPage />}
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
