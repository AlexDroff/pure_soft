import type { OrderItem } from "@/types/order";
import { IconButton, SectionText } from "@/components/ui";
import { IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import { services } from "@/data/services";
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
  const service = services.find((s) => s.id === item.serviceId);
  const image = service?.image || "/images/placeholders/placeholders.webp";

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.imageContainer}>
          <img src={image} alt={item.title} className={styles.image} />
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{item.title}</h3>
          <SectionText className={styles.price}>{item.price} €</SectionText>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.quantity}>
          <IconButton
            icon={<IoRemove size={14} />}
            label="Reducir cantidad"
            onClickAction={() => onDecrease(item.serviceId)}
            variant="borderless"
            className={styles.controlButton}
          />

          <span className={styles.count}>{item.quantity}</span>

          <IconButton
            icon={<IoAdd size={14} />}
            label="Aumentar cantidad"
            onClickAction={() => onIncrease(item.serviceId)}
            variant="borderless"
            className={styles.controlButton}
          />
        </div>

        <IconButton
          icon={<IoTrashOutline size={14} />}
          label="Eliminar servicio"
          onClickAction={() => onRemove(item.serviceId)}
          variant="borderless"
          className={styles.controlButton}
        />
      </div>
    </div>
  );
}
