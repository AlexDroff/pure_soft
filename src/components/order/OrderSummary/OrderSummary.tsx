// React component 'OrderSummary'. Handles a dedicated UI element and its behavior.
import { Button } from "@/components/ui";
import { useI18n } from "@/providers/locale-provider";
import styles from "./OrderSummary.module.css";

type OrderSummaryProps = {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
  onClose: () => void;
  isDisabled?: boolean;
};

export default function OrderSummary({
  totalPrice,
  onCheckout,
  onClose,
  isDisabled = false,
}: OrderSummaryProps) {
  const { t } = useI18n();

  return (
    <div className={styles.summary}>
      <div className={styles.info}>
        <p className={styles.subtotal}>
          {t("order.summary.subtotalTemplate", { totalPrice })}
        </p>
      </div>

      <Button
        className={styles.cta}
        onClick={onCheckout}
        size="md"
        disabled={isDisabled}
      >
        {t("order.summary.checkoutCta")}
      </Button>

      <button className={styles.continueText} onClick={onClose} type="button">
        {t("order.summary.continueShopping")}
      </button>
    </div>
  );
}
