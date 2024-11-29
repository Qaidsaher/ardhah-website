import React, { useState } from 'react';

const BillboardCard = ({ billboard }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getActiveBookingImage = () => {
    const today = new Date();

    if (billboard.bookings && billboard.bookings.length > 0) {
      for (const booking of billboard.bookings) {
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);

        if (today >= startDate && today <= endDate) {
          return { image: booking.image, isBooking: true }; // Return the active booking image
        }
      }
    }

    return { image: billboard.image, isBooking: false }; // Default to billboard image
  };

  const { image, isBooking } = getActiveBookingImage();

  return (
    <div>
      {/* Billboard Card */}
      <div
        onClick={openModal}
        className="relative overflow-hidden bg-white rounded-md shadow-md cursor-pointer group"
      >
        <img
          src={billboard.image}
          alt={billboard.location}
          className="object-cover w-full h-64 transition-transform duration-500 transform md:h-80 lg:h-96 group-hover:scale-105"
        />
        <span className="absolute top-0 left-0 right-0 w-48 p-1 px-4 m-1 text-center text-white bg-black bg-opacity-50 rounded-md">
          {billboard.location}
        </span>
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-all ${
          isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ transitionDuration: '300ms' }}
      >
        <div
          className={`relative w-[80vw] h-[80vh] rounded-lg overflow-hidden transition-transform ${
            isModalOpen ? 'scale-100' : 'scale-90'
          }`}
          style={{ transitionDuration: '300ms' }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>

          {/* Top Left "Alive" Indicator */}
          <div className="absolute flex items-center gap-2 top-4 left-4">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            <span className="bg-red-500 text-white text-sm px-6 py-0.5 rounded-sm animate-pulse">
              Alive
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute flex items-center justify-center w-10 h-10 text-lg text-white transition bg-red-200 rounded-full top-4 right-4 hover:bg-red-500"
          >
            &times;
          </button>

          {/* Modern Animated Marquee */}
          <div className="absolute bottom-0 flex items-center w-full h-10 overflow-hidden text-sm text-white bg-black bg-opacity-75">
            <div className="animate-marquee whitespace-nowrap">
              {isBooking ? (
                <span className="font-semibold text-green-400">
                  Active Booking Ad: Your ad is live now!
                </span>
              ) : (
                <span className="text-gray-300">
                  Default Billboard Image: No active booking.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(250%); /* Start fully visible */
          }
          100% {
            transform: translateX(-100%); /* Scroll out completely */
          }
        }

        .animate-marquee {
          display: inline;
         
          white-space: nowrap;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BillboardCard;
