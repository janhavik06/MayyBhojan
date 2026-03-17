const API_BASE = "http://localhost:8080/api/foods";

// Get homemaker menu
export async function getMenu(userId) {
  const res = await fetch(`${API_BASE}/cook/${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }

  return await res.json();
}

// Add new dish
export async function addDish(userId, dish) {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("name", dish.name);
  formData.append("price", dish.price);
  formData.append("category", dish.type.toUpperCase());
  formData.append("description", "Homemade dish");
  formData.append("image", dish.image);

  const res = await fetch(API_BASE, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to add dish");
  }

  return await res.json();
}