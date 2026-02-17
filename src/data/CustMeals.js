export const meals = [
    {
      id: 1,
      name: "Dadi's Special Paneer Butter Masala",
      chef: "Sharma's Satvik Rasoi",
      price: 349,
      rating: 4.9,
      veg: true,
      image: "/images/d1.jpg",
  
      desc: "Rich tomato-based gravy with hand-pressed cottage cheese, simmered for 4 hours with secret spices and finished with farm-fresh butter.",
  
      time: "25–30 min",
      calories: 450,
      serves: "1–2",
  
      dietary: ["Contains Dairy", "Gluten Free", "Mild Spicy"],
  
      ingredients: [
        "Organic Paneer",
        "Vine-ripened Tomatoes",
        "Cashew Paste",
        "Desi Ghee",
        "Secret Garam Masala",
        "Fresh Cream",
        "Kasuri Methi",
      ],
  
      sides: [
        { name: "Garlic Butter Naan", price: 45 },
        { name: "Jeera Pulao", price: 120 },
        { name: "Mixed Veg Raita", price: 60 },
      ],
    },
  
    {
      id: 2,
      name: "Spicy Kerala Fish Curry",
      chef: "Meena Aunty Kitchen",
      price: 320,
      rating: 4.8,
      veg: false,
      image: "/images/d2.jpg",
  
      desc: "Traditional coconut-based fish curry slow cooked with coastal spices and fresh curry leaves.",
  
      time: "30–35 min",
      calories: 380,
      serves: "1–2",
  
      dietary: ["Gluten Free", "High Protein", "Spicy"],
  
      ingredients: [
        "Fresh Seer Fish",
        "Coconut Milk",
        "Red Chili Paste",
        "Curry Leaves",
        "Tamarind",
        "Coconut Oil",
      ],
  
      sides: [
        { name: "Kerala Parotta", price: 50 },
        { name: "Steamed Rice", price: 40 },
        { name: "Cucumber Salad", price: 35 },
      ],
    },
  
    {
      id: 3,
      name: "Gujarati Thali Special",
      chef: "Radha's Rasoi",
      price: 250,
      rating: 4.7,
      veg: true,
      image: "/images/d3.jpg",
  
      desc: "Complete traditional Gujarati thali with seasonal vegetables, dal, roti, rice, farsan and sweet.",
  
      time: "35 min",
      calories: 520,
      serves: "1",
  
      dietary: ["Vegetarian", "Balanced Meal", "Mild"],
  
      ingredients: [
        "Seasonal Vegetables",
        "Gujarati Dal",
        "Phulka Roti",
        "Steamed Rice",
        "Farsan",
        "Traditional Sweet",
      ],
  
      sides: [
        { name: "Extra Roti", price: 15 },
        { name: "Kadhi", price: 40 },
        { name: "Shrikhand", price: 60 },
      ],
    },
  
    {
      id: 4,
      name: "Homestyle Chicken Biryani",
      chef: "Dadi's Dum House",
      price: 210,
      rating: 4.9,
      veg: false,
      image: "/images/d4.jpg",
  
      desc: "Slow dum-cooked chicken biryani layered with fragrant basmati rice and homemade spice blend.",
  
      time: "45 min",
      calories: 600,
      serves: "1–2",
  
      dietary: ["High Protein", "Spicy"],
  
      ingredients: [
        "Farm Chicken",
        "Basmati Rice",
        "Homemade Masala",
        "Saffron Milk",
        "Mint & Coriander",
      ],
  
      sides: [
        { name: "Boiled Egg", price: 20 },
        { name: "Onion Raita", price: 40 },
        { name: "Salad", price: 30 },
      ],
    },
  
    {
      id: 5,
      name: "Ragi Mudde & Dal",
      chef: "Traditional Tastes",
      price: 150,
      rating: 4.6,
      veg: true,
      image: "/images/d5.jpg",
  
      desc: "Healthy Karnataka staple made with ragi balls served with protein-rich dal.",
  
      time: "20 min",
      calories: 390,
      serves: "1",
  
      dietary: ["Healthy", "Gluten Free"],
  
      ingredients: [
        "Ragi Flour",
        "Toor Dal",
        "Spices",
        "Garlic",
        "Mustard Seeds",
      ],
  
      sides: [
        { name: "Ghee Tadka", price: 15 },
        { name: "Extra Dal", price: 40 },
      ],
    },
  
    {
      id: 6,
      name: "Stuffed Paneer Paratha Platter",
      chef: "The Paratha Point",
      price: 120,
      rating: 4.5,
      veg: true,
      image: "/images/d6.jpg",
  
      desc: "Hand-rolled parathas stuffed with paneer and served with butter, pickle and curd.",
  
      time: "15–20 min",
      calories: 430,
      serves: "1",
  
      dietary: ["Vegetarian"],
  
      ingredients: [
        "Whole Wheat Dough",
        "Fresh Paneer",
        "Butter",
        "Curd",
        "Pickle",
      ],
  
      sides: [
        { name: "Extra Butter", price: 10 },
        { name: "Curd Bowl", price: 30 },
      ],
    },
  
    {
      id: 7,
      name: "Bengali Mustard Fish",
      chef: "Joyous Jhal",
      price: 240,
      rating: 4.8,
      veg: false,
      image: "/images/d7.jpg",
  
      desc: "Fresh fish steamed in mustard gravy with authentic Bengali flavors.",
  
      time: "30 min",
      calories: 410,
      serves: "1–2",
  
      dietary: ["Gluten Free"],
  
      ingredients: [
        "Fresh Rohu Fish",
        "Mustard Paste",
        "Green Chili",
        "Mustard Oil",
      ],
  
      sides: [
        { name: "Steamed Rice", price: 40 },
        { name: "Lime Pickle", price: 15 },
      ],
    },
  
    {
      id: 8,
      name: "Rajma Chawal Bowl",
      chef: "Mummy's Magic",
      price: 160,
      rating: 4.9,
      veg: true,
      image: "/images/d8.jpg",
  
      desc: "Comfort food classic: slow-cooked rajma served with fluffy rice.",
  
      time: "25 min",
      calories: 480,
      serves: "1",
  
      dietary: ["Vegetarian", "Protein Rich"],
  
      ingredients: [
        "Kidney Beans",
        "Tomato Gravy",
        "Basmati Rice",
        "Cumin",
      ],
  
      sides: [
        { name: "Papad", price: 10 },
        { name: "Curd", price: 30 },
      ],
    },
    {
        id: 9,
        name: "South Indian Mini Meals",
        chef: "Annapurna Kitchen",
        price: 180,
        rating: 4.7,
        veg: true,
        image: "/images/d4.jpg",
        desc: "Mini South Indian platter with sambar rice, poriyal and papad.",
        time: "20 min",
        calories: 390,
        serves: "1",
        dietary: ["Vegetarian"],
        ingredients: ["Rice", "Sambar", "Vegetables", "Papad"],
        sides: [{ name: "Extra Sambar", price: 25 }],
      },
      
      {
        id: 10,
        name: "Punjabi Chole Bhature",
        chef: "Punjab Rasoi",
        price: 160,
        rating: 4.8,
        veg: true,
        image: "/images/d3.jpg",
        desc: "Fluffy bhature with spicy Punjabi chole.",
        time: "25 min",
        calories: 520,
        serves: "1",
        dietary: ["Vegetarian", "Spicy"],
        ingredients: ["Chickpeas", "Flour", "Spices"],
        sides: [{ name: "Pickle & Onion", price: 10 }],
      },
      
      {
        id: 11,
        name: "Egg Curry with Rice",
        chef: "Home Comfort Kitchen",
        price: 190,
        rating: 4.6,
        veg: false,
        image: "/images/d2.jpg",
        desc: "Boiled eggs simmered in onion tomato gravy.",
        time: "20 min",
        calories: 410,
        serves: "1",
        dietary: ["High Protein"],
        ingredients: ["Eggs", "Tomato", "Spices"],
        sides: [{ name: "Extra Egg", price: 20 }],
      },
      
      {
        id: 12,
        name: "Veg Pulao Bowl",
        chef: "Healthy Bites",
        price: 140,
        rating: 4.5,
        veg: true,
        image: "/images/d1.jpg",
        desc: "Light vegetable pulao cooked with aromatic spices.",
        time: "15 min",
        calories: 330,
        serves: "1",
        dietary: ["Healthy"],
        ingredients: ["Rice", "Vegetables", "Spices"],
        sides: [{ name: "Curd", price: 30 }],
      },
      
      {
        id: 13,
        name: "Butter Chicken Bowl",
        chef: "Royal Kitchen",
        price: 260,
        rating: 4.9,
        veg: false,
        image: "/images/d8.jpg",
        desc: "Creamy butter chicken served with rice.",
        time: "30 min",
        calories: 580,
        serves: "1–2",
        dietary: ["High Protein"],
        ingredients: ["Chicken", "Cream", "Tomato"],
        sides: [{ name: "Naan", price: 40 }],
      },
      
      {
        id: 14,
        name: "Dal Tadka & Rice",
        chef: "Simple Rasoi",
        price: 120,
        rating: 4.6,
        veg: true,
        image: "/images/d7.jpg",
        desc: "Yellow dal tempered with ghee and spices.",
        time: "15 min",
        calories: 310,
        serves: "1",
        dietary: ["Vegetarian"],
        ingredients: ["Dal", "Ghee", "Spices"],
        sides: [{ name: "Papad", price: 10 }],
      },
      
      {
        id: 15,
        name: "Chicken Fried Rice",
        chef: "Urban Kitchen",
        price: 210,
        rating: 4.7,
        veg: false,
        image: "/images/d6.jpg",
        desc: "Wok tossed fried rice with chicken.",
        time: "20 min",
        calories: 450,
        serves: "1",
        dietary: ["High Protein"],
        ingredients: ["Rice", "Chicken", "Soy"],
        sides: [{ name: "Chilli Sauce", price: 10 }],
      },
      
      {
        id: 16,
        name: "Veg Khichdi Bowl",
        chef: "Grandma's Kitchen",
        price: 110,
        rating: 4.5,
        veg: true,
        image: "/images/d5.jpg",
        desc: "Comfort khichdi cooked with vegetables.",
        time: "15 min",
        calories: 280,
        serves: "1",
        dietary: ["Healthy", "Gluten Free"],
        ingredients: ["Rice", "Dal", "Vegetables"],
        sides: [{ name: "Ghee", price: 10 }],
      },
      
      {
        id: 17,
        name: "Mutton Curry & Rice",
        chef: "Heritage Kitchen",
        price: 320,
        rating: 4.9,
        veg: false,
        image: "/images/d4.jpg",
        desc: "Slow cooked mutton in rich curry.",
        time: "45 min",
        calories: 620,
        serves: "1–2",
        dietary: ["High Protein"],
        ingredients: ["Mutton", "Spices"],
        sides: [{ name: "Extra Curry", price: 60 }],
      },
      
      {
        id: 18,
        name: "Paneer Tikka Roll",
        chef: "Street Rasoi",
        price: 140,
        rating: 4.6,
        veg: true,
        image: "/images/d3.jpg",
        desc: "Grilled paneer rolled in soft roti.",
        time: "10 min",
        calories: 300,
        serves: "1",
        dietary: ["Vegetarian"],
        ingredients: ["Paneer", "Roti"],
        sides: [{ name: "Mint Chutney", price: 10 }],
      },
      
      {
        id: 19,
        name: "Fish Fry Meal",
        chef: "Coastal Kitchen",
        price: 240,
        rating: 4.8,
        veg: false,
        image: "/images/d2.jpg",
        desc: "Crispy fried fish served with rice.",
        time: "25 min",
        calories: 480,
        serves: "1",
        dietary: ["Gluten Free"],
        ingredients: ["Fish", "Spices"],
        sides: [{ name: "Lemon", price: 5 }],
      },
      
      {
        id: 20,
        name: "Veg Biryani Bowl",
        chef: "Home Feast",
        price: 160,
        rating: 4.7,
        veg: true,
        image: "/images/d1.jpg",
        desc: "Fragrant veg biryani with spices.",
        time: "30 min",
        calories: 410,
        serves: "1",
        dietary: ["Vegetarian"],
        ingredients: ["Rice", "Vegetables"],
        sides: [{ name: "Raita", price: 30 }],
      }
      
  ];
  