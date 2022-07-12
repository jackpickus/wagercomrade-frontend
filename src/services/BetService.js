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
      console.log("Error:", error);
    });
}

export function updateBet(betId, betStatus) {
  const url = `${API_URL}/${betId}?status=${betStatus}`;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Successfully updated bet status:", data);
    })
    .catch((error) => {
      console.log("Error on PUT:", error);
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
      console.log("Error on delete:", error);
    });
}
