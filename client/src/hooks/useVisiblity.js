import React from "react";
import { useState } from "react";

export default function useVisiblity(component, visibility = false) {
  const [visible, setVisibility] = useState(() => visibility);

  return [
    visible ? component : null,
    ()  => setVisibility((vis) => !vis)
  ];
}
