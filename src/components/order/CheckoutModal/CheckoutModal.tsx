// React component 'CheckoutModal'. Handles a dedicated UI element and its behavior.
"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import type { OrderItem, CheckoutFormValues } from "@/types/order";
import { Modal, Input, Button } from "@/components/ui";
import { contacts } from "@/data/contacts";
import { buildWhatsAppMessage } from "@/utils/buildWhatsAppMessage";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import styles from "./CheckoutModal.module.css";

type CheckoutModalProps = {
  isOpen: boolean;
  items: OrderItem[];
  onCloseAction: () => void;
  onSuccess?: () => void;
};

const checkoutSchema = Yup.object({
  name: Yup.string().trim().required("Introduce tu nombre"),
  phone: Yup.string().trim().required("Introduce tu telefono"),
});

const initialValues: CheckoutFormValues = {
  name: "",
  phone: "",
};

export default function CheckoutModal({
  isOpen,
  items,
  onCloseAction,
  onSuccess,
}: CheckoutModalProps) {
  const handleSubmit = (values: CheckoutFormValues) => {
    const message = buildWhatsAppMessage({
      customer: values,
      items,
    });

    const whatsappUrl = `https://wa.me/${formatPhoneNumber(
      contacts.whatsapp,
    )}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
    onSuccess?.();
    onCloseAction();
  };

  return (
    <Modal
      isOpen={isOpen}
      onCloseAction={onCloseAction}
      className={styles.modal}
      ariaLabel="Formulario de pedido"
    >
      <div className={styles.content}>
        <h2 className={styles.title}>REALIZAR UN PEDIDO</h2>
        <p className={styles.subtitle}>
          Por favor, introduzca sus datos y nuestro asesor se pondra en
          contacto con usted en breve.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className={styles.form}>
              <Input
                label="Su nombre*"
                name="name"
                value={values.name}
                placeholder="Nombre"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                className={styles.inputField}
              />

              <Input
                label="Numero de telefono*"
                name="phone"
                value={values.phone}
                placeholder="+34 123 456 789"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
                className={styles.inputField}
              />

              <Button className={styles.submitButton} type="submit" size="md">
                PEDIR POR WHATSAPP
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
