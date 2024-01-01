import "./Card.css";
export default function Card({ card, handleCardClick }) {
  const handleClick = () => {
    handleCardClick(card);
  };
  return (
    <div className="card" onClick={handleClick}>
      <img src={card.src} alt={card.name} />
      <h2>{card.name}</h2>
    </div>
  );
}
