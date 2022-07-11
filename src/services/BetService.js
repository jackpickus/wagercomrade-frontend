const api = "http://localhost:8080/api/v1/wager";

export default function createNewBet(data) {
  fetch("http://localhost:8080/api/v1/wager", {
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

export async function getAllBets() {
  const response = await fetch(api);
  return await response.json();
}

export function updateBet(betId, betStatus) {
  fetch(api + `/${betId}?status=${betStatus}`, {
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
  fetch(api + `/${betId}`, {
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
