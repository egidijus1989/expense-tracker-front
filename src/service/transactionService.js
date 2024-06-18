const backendDomain = "http://localhost:8888/api/v1/transaction/";

export const createTransaction = async (transactionData, token) => {
  try {
    const res = await fetch(`${backendDomain}create-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(transactionData),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const updateTransaction = async (data, id, token) => {
  try {
    const res = await fetch(`${backendDomain}update-transaction/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const deleteTransaction = async (id, token) => {
  try {
    const res = await fetch(`${backendDomain}delete-transaction/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const getAllTransaction = async (token) => {
  try {
    const res = await fetch(`${backendDomain}transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const getTransaction = async (id, token) => {
  try {
    const res = await fetch(`${backendDomain}transaction/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const transactionsByCategory = async (token) => {
  try {
    const res = await fetch(`${backendDomain}transactionsByCategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
