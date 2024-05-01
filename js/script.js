document.addEventListener("DOMContentLoaded", function() {
  const seats = document.querySelectorAll('.row .seat:not(.sold)');
  const bookingDetails = document.getElementById('bookingDetails');
  const pricePerSeat = 10; // Giá mỗi ghế
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Các hàng ghế
  let selectedSeats = [];

  seats.forEach(function(seat, index) {
    seat.addEventListener('click', function() {
      if (!seat.classList.contains('sold')) {
        if (!seat.classList.contains('selected')) {
          if (isConsecutiveSeat(index)) {
            seat.classList.add('selected');
            selectedSeats.push(index);
          } else {
            alert('Please select consecutive seats');
          }
        } else {
          seat.classList.remove('selected');
          const unselectedSeatIndex = selectedSeats.indexOf(index);
          if (unselectedSeatIndex !== -1) {
            selectedSeats.splice(unselectedSeatIndex, 1);
          }
        }

        // Update booking details
        updateBookingDetails();
      }
    });
  });

  function isConsecutiveSeat(index) {
    if (selectedSeats.length === 0) {
      return true;
    }

    const lastSelectedIndex = selectedSeats[selectedSeats.length - 1];

    // Check if the seat is next to the last selected seat
    return Math.abs(index - lastSelectedIndex) === 1;
  }

  function updateBookingDetails() {
    if (selectedSeats.length === 0) {
      bookingDetails.innerText = '';
    } else {
      const selectedSeatsInfo = selectedSeats.map(seatIndex => {
        const row = rows[Math.floor(seatIndex / 8)];
        const column = seatIndex % 8 + 1;
        return `${column}${row}`;
      });

      // Calculate total price
      const totalPrice = selectedSeats.length * pricePerSeat;

      // Update booking details
      bookingDetails.innerText = `Selected Seats: ${selectedSeatsInfo.join(', ')}\nTotal Price: $${totalPrice}`;
    }
  }
});
