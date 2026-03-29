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
        <SectionText>Послуг у кошику: {totalItems}</SectionText>
        <p className={styles.total}>Загальна сума: {totalPrice} zł</p>
      </div>

      <Button onClick={onCheckout} fullWidth disabled={isDisabled}>
        Оформити замовлення
      </Button>
    </div>
  );
}
