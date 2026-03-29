import type { OrderItem } from "@/types/order";
import { Button, IconButton, SectionText } from "@/components/ui";
import { IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import styles from "./OrderItemCard.module.css";

type OrderItemCardProps = {
  item: OrderItem;
  onIncrease: (serviceId: string) => void;
  onDecrease: (serviceId: string) => void;
  onRemove: (serviceId: string) => void;
};

export default function OrderItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: OrderItemCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.title}>{item.title}</h3>

        <SectionText>
          {item.price} zł / {item.unit}
        </SectionText>
      </div>

      <div className={styles.controls}>
        <div className={styles.quantity}>
          <IconButton
            icon={<IoRemove size={18} />}
            label="Decrease quantity"
            onClick={() => onDecrease(item.serviceId)}
          />

          <span className={styles.count}>{item.quantity}</span>

          <IconButton
            icon={<IoAdd size={18} />}
            label="Increase quantity"
            onClick={() => onIncrease(item.serviceId)}
          />
        </div>

        <Button variant="secondary" onClick={() => onRemove(item.serviceId)}>
          <IoTrashOutline size={18} />
        </Button>
      </div>
    </div>
  );
}
