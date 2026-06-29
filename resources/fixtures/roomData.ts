export const invalidRoomTypeBody = {
  roomName: 1,
  type: 1,
  accessible: 1,
  image: "https://blog.postman.com/wp-content/uploads/2014/07/logo.png",
  description: "This is room 101, dare you enter?",
  roomPrice: 100,
  features: ["WiFi", "Safe"],
};

export const roomFeatures = [
  "King Bed",
  "Ocean View",
  "Private Balcony",
  "Smart TV",
  "Mini Fridge",
  "Air Conditioning",
  "Walk-in Closet",
  "Rainfall Shower",
  "High-Speed WiFi",
  "Coffee Maker",
];

export const roomType = ["Single", "Double", "Twin"];

export const defultRoom = {
  roomid: 1,
  roomName: "100",
  type: "single",
  accessible: true,
  image: "https://blog.postman.com/wp-content/uploads/2014/07/logo.png",
  description:
    "this is is a defult room with basic features, it is a single room with a king bed, private balcony, and a mini fridge.",
  features: ["TV", "WiFi", "Safe"],
  roomPrice: 100,
};
