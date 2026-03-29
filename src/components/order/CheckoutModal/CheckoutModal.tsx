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
  onClose: () => void;
  onSuccess?: () => void;
};

const checkoutSchema = Yup.object({
  name: Yup.string().trim().required("Введіть ім’я"),
  phone: Yup.string().trim().required("Введіть номер телефону"),
});

const initialValues: CheckoutFormValues = {
  name: "",
  phone: "",
};

export default function CheckoutModal({
  isOpen,
  items,
  onClose,
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
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <div className={styles.content}>
        <SectionTitle>Оформлення замовлення</SectionTitle>

        <SectionText>
          Вкажіть ваші дані, щоб перейти до WhatsApp із готовим замовленням.
        </SectionText>

        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className={styles.form}>
              <Input
                label="Ваше ім’я"
                name="name"
                value={values.name}
                placeholder="Введіть ім’я"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
              />

              <Input
                label="Номер телефону"
                name="phone"
                value={values.phone}
                placeholder="+48 123 456 789"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
              />

              <Button type="submit" fullWidth>
                Замовити через WhatsApp
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
