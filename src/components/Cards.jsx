import { useEffect, useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import * as transactionService from "../service/transactionService";

const Cards = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  const getTransactions = async () => {
    const res = await transactionService.getAllTransaction(token);
    setData(res.data);
  };

  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {data.map((transaction) => (
          <Card
            key={transaction._id}
            transaction={transaction}
            getTransactions={getTransactions}
          />
        ))}
      </div>
      {data?.user?.length === 0 && (
        <p className="text-2xl font-bold text-center w-full">
          No transaction history found
        </p>
      )}
    </div>
  );
};
export default Cards;
