export function getMenu() {
  return JSON.parse(localStorage.getItem("maybhojan_menu")) || [];
}

export function saveMenu(menu) {
  localStorage.setItem("maybhojan_menu", JSON.stringify(menu));
}

export function addDish(dish) {
  const menu = getMenu();

  menu.push(dish);

  saveMenu(menu);

  return menu;
}
