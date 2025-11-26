// usePaymentsPage.ts

import { useEffect, useState, useCallback } from "react";
import { getPayments } from "../../../Utils/getEntity";
import { fetchEntities } from "../../../Utils/fetchEntities";
import { formatCLP } from "../../../Utils/formatters";
import Swal from "sweetalert2";

interface Payment {
  id: number;
  clientId?: number;
  clientName?: string;
  email?: string;
  title?: string;
  description?: string;
  type?: string;
  date?: string;
  amount?: number;
  chargeType?: number;
  vigency?: boolean;
}

interface BankData {
  banco: string;
  numeroCuenta: string;
  clave: string;
  titular: string;
}

export const usePaymentsPage = () => {
  // Payments state
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [empty, setEmpty] = useState(true);
  const [, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayments, setSelectedPayments] = useState<number[]>([]);

  // Bank data state
  const [bankData, setBankData] = useState<BankData>({
    banco: "",
    numeroCuenta: "",
    clave: "",
    titular: "",
  });

  // Load payments
  const loadPayments = useCallback(async () => {
    await fetchEntities(
      { id: 0 },
      getPayments,
      setPayments,
      setLoading,
      setError,
      setEmpty
    );
  }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  useEffect(() => {
    setFilteredPayments(payments);
  }, [payments]);

  // Handlers
  const handleRefresh = () => {
    loadPayments();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter(
        (payment) =>
          payment.clientName?.toLowerCase().includes(term) ||
          payment.title?.toLowerCase().includes(term) ||
          payment.type?.toLowerCase().includes(term)
      );
      setFilteredPayments(filtered);
    }
  };

  const handleCheckboxChange = (paymentId: number) => {
    setSelectedPayments((prev) => {
      if (prev.includes(paymentId)) {
        return prev.filter((id) => id !== paymentId);
      } else {
        return [...prev, paymentId];
      }
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedPayments(filteredPayments.map((p) => p.id));
    } else {
      setSelectedPayments([]);
    }
  };

  const handleSendEmails = () => {
    if (selectedPayments.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Seleccione registros",
        text: "Debe seleccionar al menos un registro para enviar correos.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Correos enviados",
      text: `Se enviaron ${selectedPayments.length} correos exitosamente.`,
    });
  };

  // Utility functions
  const getChargeTypeLabel = (type: number): string => {
    const types: { [key: number]: string } = {
      0: "Pesos",
      1: "UF",
      2: "UTM",
      3: "USD",
    };
    return types[type] || "Pesos";
  };

  const formatAmount = (amount: number, chargeType: number): string => {
    if (chargeType === 0) {
      return formatCLP(amount);
    }
    return `${amount} ${getChargeTypeLabel(chargeType)}`;
  };

  return {
    // State
    payments,
    filteredPayments,
    empty,
    loading,
    searchTerm,
    selectedPayments,
    bankData,

    // Setters
    setBankData,

    // Handlers
    handleRefresh,
    handleSearch,
    handleCheckboxChange,
    handleSelectAll,
    handleSendEmails,

    // Utils
    formatAmount,
  };
};
