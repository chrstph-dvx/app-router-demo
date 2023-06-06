"use client";
import { a } from "./test";

const ClientComponent = () => {
  return (
    <div
      onClick={async () => {
        alert(await a());
      }}
    >
      Client text
    </div>
  );
};

export { ClientComponent };
