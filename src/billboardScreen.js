import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For routing
import { database, storage } from "./firebase"; // Ensure path is correct
import { ref, onValue } from "firebase/database";
import { getDownloadURL, ref as storageRef } from "firebase/storage";

function BillboardScreen() {
  const { billboardId } = useParams(); // Get the billboard ID from URL params
  const [billboard, setBillboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageToShow, setImageToShow] = useState("");

  useEffect(() => {
    const billboardRef = ref(database, `billboardsItems/${billboardId}`);

    const unsubscribe = onValue(billboardRef, async (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // Fetch the default image
        let defaultImageUrl = "";
        if (data.image) {
          try {
            defaultImageUrl = await getDownloadURL(storageRef(storage, data.image));
          } catch (error) {
            console.error("Error fetching default image URL:", error);
          }
        }

        // Check for today's booking
        const today = new Date().toISOString().split("T")[0];
        let bookingImageUrl = "";
        let hasBookingToday = false;

        if (data.bookingBillboard) {
          for (const bookingKey in data.bookingBillboard) {
            const booking = data.bookingBillboard[bookingKey];
            const startDate = new Date(booking.date_start);
            const endDate = new Date(booking.date_end);
            const todayDate = new Date(today);

            if (todayDate >= startDate && todayDate <= endDate) {
              hasBookingToday = true;

              if (booking.image) {
                try {
                  bookingImageUrl = await getDownloadURL(storageRef(storage, booking.image));
                } catch (error) {
                  console.error("Error fetching booking image URL:", error);
                }
              }
              break;
            }
          }
        }

        // Determine which image to show
        setImageToShow(hasBookingToday ? bookingImageUrl : defaultImageUrl);

        // Set billboard data
        setBillboard({
          id: data.id,
          location: data.location_name,
          locationAddress: data.location_address,
          price: data.price,
          size: data.size,
          defaultImage: defaultImageUrl,
          bookings: data.bookingBillboard || {},
        });
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [billboardId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent border-b-transparent animate-spin"></div>
        <p className="mt-4 text-blue-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!billboard) {
    return <p className="text-center">Billboard not found.</p>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Billboard Screen</h1>
      <img
        src={imageToShow}
        alt="Billboard"
        className="w-full max-w-2xl border rounded-lg shadow-md"
      />
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">Location: {billboard.location}</p>
        <p className="text-sm">Address: {billboard.locationAddress}</p>
        <p className="text-sm">Price: ${billboard.price}</p>
        <p className="text-sm">Size: {billboard.size}</p>
      </div>
    </div>
  );
}

export default BillboardScreen;
