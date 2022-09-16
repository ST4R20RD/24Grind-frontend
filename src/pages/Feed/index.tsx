import React, { useEffect } from "react";
import { Card } from "../../components";
import { useGetFeed } from "../../lib/api-hooks";
import { CardData } from "../../utils/types";

export function Feed() {
  const [cards, feedFetchState, getCards] = useGetFeed();

  useEffect(() => {
    getCards();
  }, []);
  return (
    <>
      <h1>Feed Page</h1>
      {cards.map((card: CardData) => {
        return (
          <article key={card.id}>
            <Card {...card} />
          </article>
        );
      })}
    </>
  );
}
