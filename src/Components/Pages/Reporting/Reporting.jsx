import React, { useState, useEffect } from 'react';
import '../Reporting/Reporting.scss';
import { Form, Button } from 'react-bootstrap';
import { getClients } from '../../../Utils/getEntity';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { PDF_MOV, PDF_WITHNOMOV, BASE_URL } from '../../../Constants/Url';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const BEARER_TOKEN = await Cookies.get("token");

  if (BEARER_TOKEN) {
    config.headers.Authorization = `Bearer ${BEARER_TOKEN}`;
  }

  return config;
});

const Reporting = () => {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [date, setDate] = useState(null);
  const [dateWP, setDateWP] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloading2, setDownloading2] = useState(false);

  const fetchClients = async () => {
    try {
      const data_clients = await getClients({ id: 0 });
      setClients(data_clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const downloadFile = async (url, fileName, buttonType) => {
    try {
      if (buttonType === 'reporte') {
        setDownloading(true); 
      } else if (buttonType === 'sinmovimientos') {
        setDownloading2(true); 
      }

      const response = await apiClient.get(url, { responseType: 'blob' });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (buttonType === 'reporte') {
        setDownloading(false); 
      } else if (buttonType === 'sinmovimientos') {
        setDownloading2(false); 
      }
    } catch (error) {
      console.error('Error descargando el reporte:', error);
      Swal.fire({
        icon: "question",
        title: 'Alerta',
        text: 'No se encontraron registros asociados!'
      });

      if (buttonType === 'reporte') {
        setDownloading(false); 
      } else if (buttonType === 'sinmovimientos') {
        setDownloading2(false); 
      }
    }
  };

  const handleDownload = () => {
    if (!clientId || !date) {
      Swal.fire({
        icon: 'info',
        title: 'Debe completar los Datos',
        text: 'Por favor seleccione un cliente y una fecha.'
      });
      return;
    }
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const fileName = `Reporte_${clientId}_${formattedDate}.pdf`;
    const url = `${PDF_MOV}?month=${formattedDate}&id=${clientId}`;
    downloadFile(url, fileName, 'reporte'); 
  };

  const handleDownloadNoMov = () => {
    if (!dateWP) {
      Swal.fire({
        icon: 'info',
        title: 'Debe completar los Datos',
        text: 'Por favor seleccione una fecha.'
      });
      return;
    }
    const formattedDate = `${dateWP.getFullYear()}-${String(dateWP.getMonth() + 1).padStart(2, '0')}`;
    const fileName = `ReporteSinMovimientos_${formattedDate}.pdf`;
    const url = `${PDF_WITHNOMOV}?month=${formattedDate}`;
    downloadFile(url, fileName, 'sinmovimientos'); 
  };

  return (
    <div>
      <div className='d-flex title'>Reportería</div>
      <Form className='mx-5 d-grid w-100'>
        <Form.Group>
          <div className='d-flex subtitle mb-2'>Datos del cliente por mes</div>
          <Form.Group className='d-flex gap-2'>
            <Form.Select
              className="custom-form-control w-50"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              {clients.length > 0 ? (
                <>
                  <option value="">Seleccionar Cliente</option>
                  {clients.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No hay clientes registrados</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className='d-flex gap-2'>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="yyyy/MM"
              showMonthYearPicker
              className="dateP"
              placeholderText="Seleccionar mes y año"
            />
          </Form.Group>
          <Button disabled={downloading} className='btnDownload' onClick={handleDownload}>Descargar Reporte</Button>
        </Form.Group>
        <div className='d-flex subtitle mb-2'>Clientes sin Movimientos</div>
        <Form.Group className='mb-5'>
          <Form.Group className='d-flex gap-2 w-100'>
            <DatePicker
              selected={dateWP}
              onChange={(d) => setDateWP(d)}
              dateFormat="yyyy/MM"
              showMonthYearPicker
              className="dateP"
              placeholderText="Seleccionar mes y año"
            />
          </Form.Group>
          <Button disabled={downloading2} className='btnDownload' onClick={handleDownloadNoMov}>Reporte sin movimientos</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Reporting;
