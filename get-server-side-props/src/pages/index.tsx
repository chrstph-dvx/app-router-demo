import { GetServerSideProps } from "next";
import {
  fetchDeposits,
  fetchRetryables,
  fetchClassicRetryables,
} from "@/utils/api";

type Props = {
  deposits: any[];
  retryables: any[];
  classicRetryables: any[];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [deposits, retryables, classicRetryables] = await Promise.all([
    fetchDeposits(),
    fetchRetryables(),
    fetchClassicRetryables(),
  ]);

  return {
    props: {
      deposits: deposits.deposits,
      retryables,
      classicRetryables,
    },
  };
};

export default function Home({
  deposits,
  retryables,
  classicRetryables,
}: Props) {
  return (
    <div className="text-center">
      <h2 className="mt-4 mb-2 text-3xl">Retryables:</h2>
      <ul>
        {retryables.map((retryable) => (
          <li key={retryable.id}>Retryable id: {retryable.id}</li>
        ))}
      </ul>

      <h2 className="mt-4 mb-2 text-3xl">Deposits</h2>
      <ul>
        {deposits.map((deposit) => (
          <li key={deposit.id}>Deposit id: {deposit.id}</li>
        ))}
      </ul>

      <h2 className="mt-4 mb-2 text-3xl">Classic Retryables</h2>
      <ul>
        {classicRetryables.map((classicRetryables) => (
          <li key={classicRetryables.id}>
            Classic retryable id: {classicRetryables.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
