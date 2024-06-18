import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { toast } from "react-toastify";
import * as transactionService from "../service/transactionService";
import { useSelector } from "react-redux";

const Card = ({ transaction, getTransactions }) => {
  let { category, amount, location, date, paymentType, description } =
    transaction;
  const id = transaction._id;
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  description = description[0]?.toUpperCase() + description.slice(1);
  category = category[0]?.toUpperCase() + category.slice(1);
  paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);
  const formattedDate = formatDate(date);

  const handleDelete = async () => {
    try {
      await transactionService.deleteTransaction(id, token);
      toast.success("Transaction deleted successfully");
      await getTransactions();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`rounded-md p-4 bg-gradient-to-br from-blue-700 to-blue-400`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{category}</h2>
          <div className="flex items-center gap-2">
            <FaTrash className={"cursor-pointer"} onClick={handleDelete} />
            <Link to={`/transaction/${transaction._id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Description: {description}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: ${amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Location: {location || "N/A"}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-black font-bold">{formattedDate}</p>
          <img
            src={`${currentUser.data.profilePicture}`}
            className="h-8 w-8 border rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
