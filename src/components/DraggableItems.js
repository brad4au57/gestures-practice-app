import React, { useRef } from "react";
import { useSprings, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import { clamp, move } from "./helpers";

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => (index) =>
  down && index === originalIndex
    ? {
        y: curIndex * 100 + y,
        scale: 1.1,
        zIndex: "1",
        shadow: 15,
        immediate: (n) => n === "y" || n === "zIndex",
      }
    : {
        y: order.indexOf(index) * 100,
        scale: 1,
        zIndex: "0",
        shadow: 1,
        immediate: false,
      };

export default function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index));
  const [springs, setSprings] = useSprings(items.length, fn(order.current));
  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      items.length - 1
    );
    const newOrder = move(order.current, curIndex, curRow);
    setSprings(fn(newOrder, down, originalIndex, curIndex, y));
    if (!down) order.current = newOrder;
  });

  return (
    <div className="content">
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale,
          }}
          children={items[i]}
        />
      ))}
    </div>
  );
}
