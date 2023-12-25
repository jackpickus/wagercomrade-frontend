const API_URL = "http://localhost:8080/api/v1/wager";

export default function createNewBet(data) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.log("Error: on POST:", error);
    });
}

export function updateBet(betId, data) {
  const url = `${API_URL}/${betId}`;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Successfully updated bet: ", data);
    })
    .catch((error) => {
      console.log("Error on PUT: ", error);
    });
}

export function deleteBet(betId) {
  const url = `${API_URL}/${betId}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Successfully deleted bet:", data);
    })
    .catch((error) => {
      console.log("Error on DELETE:", error);
    });
}

export function getBetCategory(category) {
  const url = `${API_URL}/wagerlist/${category}`;
  fetch(url, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error GET category: ", error);
    });
}
