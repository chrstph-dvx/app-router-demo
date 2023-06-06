import { useState, useEffect } from "react";
import {
  fetchDeposits,
  fetchRetryables,
  fetchClassicRetryables,
} from "@/utils/api";

function Retryables() {
  const [retryables, setRetryables] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const _retryables = await fetchRetryables();
      setRetryables(_retryables);
    }

    fetchData();
  }, []);

  if (!retryables) {
    return <div>Loading retryables...</div>;
  }

  return (
    <ul>
      {retryables.map((retryable) => (
        <li key={retryable.id}>Retryable id: {retryable.id}</li>
      ))}
    </ul>
  );
}

function Deposits() {
  const [deposits, setDeposits] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { deposits: _deposits } = await fetchDeposits();
      setDeposits(_deposits);
    }

    fetchData();
  }, []);

  if (!deposits) {
    return <div>Loading deposits...</div>;
  }

  return (
    <ul>
      {deposits.map((deposit) => (
        <li key={deposit.id}>Deposit id: {deposit.id}</li>
      ))}
    </ul>
  );
}

function ClassicRetryables() {
  const [retryables, setRetryables] = useState<any[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const _retryables = await fetchClassicRetryables();
      setRetryables(_retryables);
    }

    fetchData();
  }, []);

  if (!retryables) {
    return <div>Loading classic retryables...</div>;
  }

  return (
    <ul>
      {retryables.map((retryable) => (
        <li key={retryable.id}>Classic retryable id: {retryable.id}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div className="text-center">
      <h2 className="mt-4 mb-2 text-3xl">Retryables:</h2>
      <Retryables />

      <h2 className="mt-4 mb-2 text-3xl">Deposits</h2>
      <Deposits />

      <h2 className="mt-4 mb-2 text-3xl">Classic Retryables</h2>
      <ClassicRetryables />
    </div>
  );
}
