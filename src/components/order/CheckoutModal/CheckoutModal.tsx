"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import type { OrderItem, CheckoutFormValues } from "@/types/order";
import {
  Modal,
  Input,
  Button,
  SectionTitle,
  SectionText,
} from "@/components/ui";
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
    >
      <div className={styles.content}>
        <SectionTitle>Finalizar pedido</SectionTitle>

        <SectionText>
          Introduce tus datos para continuar en WhatsApp con el pedido ya
          preparado.
        </SectionText>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className={styles.form}>
              <Input
                label="Nombre"
                name="name"
                value={values.name}
                placeholder="Introduce tu nombre"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
              />

              <Input
                label="Telefono"
                name="phone"
                value={values.phone}
                placeholder="+48 123 456 789"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
              />

              <Button type="submit" fullWidth>
                Pedir por WhatsApp
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
