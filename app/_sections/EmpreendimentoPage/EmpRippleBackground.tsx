import styles from "./EmpRippleBackground.module.css";

const drops = [
  { className: styles.dropOne },
  { className: styles.dropTwo },
  { className: styles.dropThree },
  { className: styles.dropFour },
];

export function EmpRippleBackground() {
  return (
    <div aria-hidden="true" className={styles.layer}>
      <div className={styles.wash} />
      {drops.map((drop, index) => (
        <span key={index} data-ripple-drop className={`${styles.drop} ${drop.className}`} />
      ))}
    </div>
  );
}
