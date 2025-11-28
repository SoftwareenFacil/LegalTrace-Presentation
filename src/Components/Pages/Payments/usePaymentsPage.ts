// usePaymentsPage.ts

import { useEffect, useState, useCallback } from "react";
import { getPayments } from "../../../Utils/getEntity";
import { fetchEntities } from "../../../Utils/fetchEntities";
import { formatCLP } from "../../../Utils/formatters";
import paymentService from "../../../Service/paymentService";
import emailService from "../../../Service/emailService";
import Swal from "sweetalert2";

interface Client {
  id: number;
  name: string;
  email: string;
  taxId: string | null;
  address: string;
  created: string;
  vigency: boolean;
}

interface Payment {
  id: number;
  clientId: number;
  title: string;
  description: string;
  paymentDate: string;
  amount: number;
  chargeType: string;
  created: string;
  updated: string;
  fileLink: string;
  isPaidByClient: boolean;
  client: Client;
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

  // Email preview state
  const [emailPreviewData, setEmailPreviewData] = useState<
    Array<{
      id: number;
      title: string;
      clientId: number;
      clientName: string;
      emailHTML: string;
    }>
  >([]);

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
          payment.client?.name?.toLowerCase().includes(term) ||
          payment.title?.toLowerCase().includes(term) ||
          payment.chargeType?.toLowerCase().includes(term)
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

  const handleSendEmails = async () => {
    if (selectedPayments.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Seleccione registros",
        text: "Debe seleccionar al menos un registro para enviar correos.",
      });
      return;
    }
    try {
      const previews: Array<{
        id: number;
        title: string;
        clientId: number;
        clientName: string;
        emailHTML: string;
      }> = [];
      for (const chargeId of selectedPayments) {
        const payment = filteredPayments.find((p) => p.id === chargeId);
        const result = await emailService.getPaymentReminderFormat(chargeId);
        previews.push({
          id: payment?.id ?? 0,
          title: payment?.title ?? "",
          clientId: payment?.clientId ?? 0,
          clientName: payment?.client?.name ?? "",
          emailHTML: result?.data ?? "",
        });
      }
      setEmailPreviewData(previews);
    } catch {
      setEmailPreviewData([]);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo obtener la previsualización del correo.",
      });
    }
  };

  // Utility functions
  const chargeTypeToNumber = (typeString: string): number => {
    const typeMap: { [key: string]: number } = {
      F29: 0,
      Renta: 1,
      LeyesSociales: 2,
      Otros: 3,
    };
    return typeMap[typeString] || 0;
  };

  const formatAmount = (amount: number): string => {
    return formatCLP(amount);
  };

  const formatChargeType = (chargeType: string): string => {
    const typeMap: { [key: string]: string } = {
      F29: "F29",
      Renta: "Renta",
      LeyesSociales: "Leyes Sociales",
      Otros: "Otros",
    };
    return typeMap[chargeType] || chargeType;
  };

  const handleEditPayment = (payment: Payment) => {
    return {
      id: payment.id,
      clientId: payment.clientId,
      title: payment.title,
      description: payment.description,
      paymentDate: payment.paymentDate,
      amount: payment.amount,
      chargeType: chargeTypeToNumber(payment.chargeType),
      isPaidByClient: payment.isPaidByClient,
      fileLink: payment.fileLink || "",
      fileName: "",
      fileType: "",
      fileString: "",
    };
  };

  const handleDeletePayment = async (
    paymentId: number,
    paymentTitle: string
  ) => {
    const result = await Swal.fire({
      title: `¿Seguro desea eliminar el pago: ${paymentTitle}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await paymentService.deleteItem(paymentId);
        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El pago ha sido eliminado exitosamente.",
        });
        handleRefresh();
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el pago.",
        });
      }
    }
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
    emailPreviewData,

    // Setters
    setBankData,
    setEmailPreviewData,

    // Handlers
    handleRefresh,
    handleSearch,
    handleCheckboxChange,
    handleSelectAll,
    handleSendEmails,
    handleEditPayment,
    handleDeletePayment,

    // Utils
    formatAmount,
    formatChargeType,
    chargeTypeToNumber,
  };
};
