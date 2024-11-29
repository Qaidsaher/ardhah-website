// src/App.js
import React, { useState, useEffect } from "react";
import { database, storage } from "./firebase"; // Ensure this path is correct
import { ref, onValue } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import BillboardCard from "./components/BillboardCard"; // Ensure this path is correct
import "./App.css"; // Ensure this path is correct

function App() {
  const [billboards, setBillboards] = useState([]); // JavaScript without type annotations
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const billboardsRef = ref(database, "billboardsItems"); // Adjust the path as needed

    const unsubscribe = onValue(billboardsRef, async (snapshot) => {
      const data = snapshot.val();
      const billboardsList = [];

      if (data) {
        for (const id in data) {
          const billboardData = data[id];

          // Fetch image URL from Firebase Storage
          const imagePath = billboardData.image || "";
          let imageUrl = "";
          if (imagePath) {
            try {
              imageUrl = await getDownloadURL(storageRef(storage, imagePath));
            } catch (error) {
              console.error("Error fetching image URL:", error);
            }
          }

          // Parse bookings if any
          let bookings = [];
          if (billboardData.bookingBillboard) {
            bookings = Object.values(billboardData.bookingBillboard).map(
              (booking) => ({
                startDate: booking.date_start,
                endDate: booking.date_end,
                userId: booking.user_id,
                image:booking.image || "",
                details: booking.details || "",
                createdAt: booking.created_at,
              })
            );
          }

          const billboard = {
            id: billboardData.id || "",
            location: billboardData.location_name || "",
            locationAddress: billboardData.location_address || "",
            image: imageUrl,
            price: parseFloat(billboardData.price) || 0,
            size: billboardData.size || "",
            ads: billboardData.ads || {},
            bookings: bookings.length > 0 ? bookings : undefined,
            locationLat: billboardData.location_lat
              ? parseFloat(billboardData.location_lat)
              : undefined,
            locationLng: billboardData.location_lng
              ? parseFloat(billboardData.location_lng)
              : undefined,
            createdAt: billboardData.created_at || new Date().toISOString(),
          };

          billboardsList.push(billboard);
        }
      }

      setBillboards(billboardsList);
      setIsLoading(false); // Update loading state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gray-100 App">
      <h1 className="mb-6 text-3xl font-bold text-center">
        {" "}
        Ardhah Billboards
      </h1>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent border-b-transparent animate-spin"></div>

          {/* Animated Loading Text */}
          <p className="text-center text-blue-500 animate-pulse">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {billboards.map((billboard) => (
            <BillboardCard key={billboard.id} billboard={billboard} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
