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
    {
      name: "Savita's Kitchen",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
    },
    {
      name: "Grandma's Rasoi",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    },
    {
      name: "Healthy Bowl",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    },
  ],
};
