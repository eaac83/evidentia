
// pages/documentos.js
import React from 'react';
import Link from 'next/link';

export default function Documentos() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Documentos Generados</h1>

        {/* Cotización */}
        <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Cotización del Servicio</h2>
          <p className="mb-4">Descarga la cotización generada para el servicio solicitado.</p>
          <div className="flex gap-4">
            <a
              href="/docs/Cotizacion_Servicio_Justificado_Final.pdf"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar PDF
            </a>
            <a
              href="/docs/Cotizacion_Servicio_Justificado_Final.docx"
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar Word (editable)
            </a>
          </div>
        </div>

        {/* Aceptación */}
        <div className="bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Aceptación del Servicio</h2>
          <p className="mb-4">Descarga el documento de aceptación del servicio por parte del cliente.</p>
          <div className="flex gap-4">
            <a
              href="/docs/Aceptacion_Servicio_Justificado_Final.docx"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar Word (editable)
            </a>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/">
            <span className="text-blue-400 hover:underline">Regresar al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
