export const profileData = {
  name: "Rajesh",
  orders: 12,
  subscribed: 2,

  plan: {
    title: "Dadi's Special Lunch Plan",
    nextDelivery: "Tomorrow, 1:00 PM",
    daysLeft: 24,
    savings: 1250,
  },

  recentOrders: [
    {
      id: 1,
      title: "Homestyle Paneer Thali",
      kitchen: "Annapurna Rasoi",
      price: 180,
      status: "Preparing",
      image: "/images/d1.jpg",
    },
    {
      id: 2,
      title: "Dal Bati Churma",
      kitchen: "Marwari Kitchen",
      price: 250,
      status: "Out for Delivery",
      image: "/images/d2.jpg",
    },
  ],

  favorites: [
    { name: "Amma's South Indian", rating: 4.9 },
    { name: "Punjabi Tadka", rating: 4.7 },
    { name: "Healthy Bowl", rating: 4.8 },
  ],
};
