import { Button, SectionText } from "@/components/ui";
import styles from "./OrderSummary.module.css";

type OrderSummaryProps = {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
  onClose: () => void;
  isDisabled?: boolean;
};

export default function OrderSummary({
  totalItems,
  totalPrice,
  onCheckout,
  onClose,
  isDisabled = false,
}: OrderSummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.info}>
        <p className={styles.subtotal}>Subtotal: {totalPrice} €</p>
      </div>

      <Button
        className={styles.cta}
        onClick={onCheckout}
        size="md"
        disabled={isDisabled}
      >
        REALIZAR PEDIDO
      </Button>

      <button className={styles.continueText} onClick={onClose} type="button">
        Continuar comprando
      </button>
    </div>
  );
}
