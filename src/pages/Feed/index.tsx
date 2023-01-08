import { useEffect } from "react";
import { Card } from "../../components";
import { useGetFeed } from "../../lib/api-hooks";
import { CardData } from "../../utils/types";

export function Feed() {
  const [cards, , getCards] = useGetFeed();

  useEffect(() => {
    getCards();
  }, []);

  return (
    <>
      {cards
        .map((card: CardData) => {
          return (
            <article key={card.id}>
              <Card {...card} />
            </article>
          );
        })
        .reverse()}
    </>
  );
}
