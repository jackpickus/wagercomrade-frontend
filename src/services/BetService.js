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
      console.log("Error on POST:", error);
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
