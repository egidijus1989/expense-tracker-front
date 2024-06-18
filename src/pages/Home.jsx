import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import * as transactionService from "../service/transactionService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 0,
        borderRadius: 0,
        spacing: 0,
        cutout: 50,
      },
    ],
  });

  const getCategoryStats = async () => {
    const res = await transactionService.transactionsByCategory(token);
    setData(res.data);
  };
  useEffect(() => {
    getCategoryStats();
  }, []);

  useEffect(() => {
    if (data) {
      const categories = data.map((stat) => stat.category);
      const totalAmounts = data.map((stat) => stat.totalAmount);
      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "income") {
          backgroundColors.push("rgba(75, 192, 192)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(54, 162, 235)");
          borderColors.push("rgba(54, 162, 235)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
            <Doughnut data={chartData} />
          </div>

          <TransactionForm getCategoryStats={getCategoryStats} />
        </div>
        <Cards />
      </div>
    </>
  );
};
export default HomePage;
