import {
  fetchDeposits,
  fetchRetryables,
  fetchClassicRetryables,
} from "@/utils/api";
import { Suspense } from "react";

const Retryables = async () => {
  const retryables = await fetchRetryables();

  return (
    <ul>
      {retryables.map((retryable) => (
        <li key={retryable.id}>Retryable id: {retryable.id}</li>
      ))}
    </ul>
  );
};

const Deposits = async () => {
  const { deposits } = await fetchDeposits();

  return (
    <ul>
      {deposits.map((deposit) => (
        <li key={deposit.id}>Deposit id: {deposit.id}</li>
      ))}
    </ul>
  );
};

const ClassicRetryables = async () => {
  const retryables = await fetchClassicRetryables();

  return (
    <ul>
      {retryables.map((retryable) => (
        <li key={retryable.id}>Retryable id: {retryable.id}</li>
      ))}
    </ul>
  );
};

export default function Home() {
  return (
    <div className="text-center">
      <h2 className="mt-4 mb-2 text-3xl">Retryables:</h2>
      <Suspense fallback="Loading retryables...">
        <Retryables />
      </Suspense>

      <h2 className="mt-4 mb-2 text-3xl">Deposits</h2>
      <Suspense fallback="Loading deposits...">
        <Deposits />
      </Suspense>

      <h2 className="mt-4 mb-2 text-3xl">Classic Retryables</h2>
      {/* <Suspense fallback="Loading classic retryables..."> */}
      <ClassicRetryables />
      {/* </Suspense> */}
    </div>
  );
}
