// React component 'CheckoutModal'. Handles a dedicated UI element and its behavior.
"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import type { OrderItem, CheckoutFormValues } from "@/types/order";
import { Modal, Input, Button } from "@/components/ui";
import { contacts } from "@/data/contacts";
import { useI18n } from "@/providers/locale-provider";
import { sanitizePhone, formatPhoneNumber } from "@/utils/phone.utils";
import { buildWhatsAppMessage } from "@/utils/buildWhatsAppMessage";
import styles from "./CheckoutModal.module.css";

type CheckoutModalProps = {
  isOpen: boolean;
  items: OrderItem[];
  onCloseAction: () => void;
  onSuccess?: () => void;
};

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
  const { t } = useI18n();

  const nameRegex = /^[A-Za-zÀ-ÿ\s-]{3,50}$/;
  const phoneRegex = /^\+\d{11,12}$/;

  const checkoutSchema = Yup.object({
    name: Yup.string()
      .required(t("checkoutModal.fields.name.requiredError"))
      .min(3, t("checkoutModal.fields.name.minLengthError"))
      .max(50, t("checkoutModal.fields.name.maxLengthError"))
      .matches(nameRegex, t("checkoutModal.fields.name.invalidCharsError")),
    phone: Yup.string()
      .transform((value) => sanitizePhone(value))
      .required(t("checkoutModal.fields.phone.requiredError"))
      .matches(phoneRegex, t("checkoutModal.fields.phone.formatError")),
  });

  const handleSubmit = (values: CheckoutFormValues) => {
    const message = buildWhatsAppMessage({
      customer: values,
      items,
      messages: {
        template: t("whatsAppTemplate.message"),
        itemTemplate: t("whatsAppTemplate.itemLineTemplate"),
      },
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
      ariaLabel={t("checkoutModal.ariaLabel")}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{t("checkoutModal.title")}</h2>
        <p className={styles.subtitle}>
          {t("checkoutModal.subtitle")}
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
            const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const sanitized = sanitizePhone(e.target.value);
              setFieldValue("phone", sanitized);
            };

            return (
              <Form className={styles.form}>
                <Input
                  label={t("checkoutModal.fields.name.label")}
                  name="name"
                  value={values.name}
                  placeholder={t("checkoutModal.fields.name.placeholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  touched={touched.name}
                  className={styles.inputField}
                />

                <Input
                  label={t("checkoutModal.fields.phone.label")}
                  name="phone"
                  value={values.phone}
                  placeholder={t("checkoutModal.fields.phone.placeholder")}
                  onChange={handlePhoneChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                  touched={touched.phone}
                  className={styles.inputField}
                />

                <Button className={styles.submitButton} type="submit" size="md">
                  {t("checkoutModal.submitCta")}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}
