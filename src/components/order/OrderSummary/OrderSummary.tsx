import { Button, SectionText } from "@/components/ui";
import styles from "./OrderSummary.module.css";

type OrderSummaryProps = {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
  isDisabled?: boolean;
};

export default function OrderSummary({
  totalItems,
  totalPrice,
  onCheckout,
  isDisabled = false,
}: OrderSummaryProps) {
  return (
    <div className={styles.summary}>
      <div className={styles.info}>
        <SectionText>Servicios en el carrito: {totalItems}</SectionText>
        <p className={styles.total}>Total: {totalPrice} zl</p>
      </div>

      <Button onClick={onCheckout} fullWidth disabled={isDisabled}>
        Finalizar pedido
      </Button>
    </div>
  );
}
