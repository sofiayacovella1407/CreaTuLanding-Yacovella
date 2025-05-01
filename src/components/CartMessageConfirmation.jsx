import React from "react";
import { Modal, Button } from "react-bootstrap";

const CartMessageConfirmation = ({
  show,
  onClose,
  clientData,
  purchaseId,
  finalTotal,
}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title style={{ color: "green" }}>¡Compra Confirmada!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Gracias por tu compra, {clientData.name}.</p>
      <p>
        El ID de tu compra es: <strong style={{ color: "red" }}>{purchaseId}</strong>
      </p>
      <p>
        Por favor, realiza la transferencia del total de{" "}
        <strong>${finalTotal.toLocaleString()}</strong> al siguiente alias:{" "}
        <strong>sofiayacovella.mp</strong>
      </p>
      <p>
        Una vez realizada la transferencia, envía el comprobante al WhatsApp:{" "}
        <strong>
          <a
            href={`https://wa.me/5493424302010?text=Hola%20Sofia!%20Soy%20${encodeURIComponent(clientData.name)}%F0%9F%98%81%0AQueria%20enviarte%20el%20comprobante%20de%20la%20compra:%20${purchaseId}%E2%9C%85`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar comprobante
          </a>
        </strong>.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="primary"
        onClick={() => {
          onClose();
          window.location.reload();
          window.location.href = "/";
        }}
      >
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CartMessageConfirmation;