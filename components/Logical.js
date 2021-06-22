import React from "react";

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
