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
          if (canSelectSeat(index)) {
            seat.classList.add('selected');
            selectedSeats.push(index);
          } else {
            alert('Please select seats without empty seats between them.');
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

  function canSelectSeat(index) {
    if (selectedSeats.length === 0) {
      return true;
    }

    const lastSelectedIndex = selectedSeats[selectedSeats.length - 1];
    const rowOfSelectedSeat = Math.floor(lastSelectedIndex / 8);
    const rowOfCurrentSeat = Math.floor(index / 8);

    // Check if the seat is consecutive with the last selected seat
    if (Math.abs(index - lastSelectedIndex) === 1) {
      if (rowOfSelectedSeat === rowOfCurrentSeat && !isSeatEmptyBetween(lastSelectedIndex, index)) {
        return true;
      }
    }

    // Check if there's no empty seat between the last selected seat and the current seat
    if (rowOfSelectedSeat !== rowOfCurrentSeat && !isSeatEmptyBetween(lastSelectedIndex, index)) {
      return true;
    }

    return false;
  }

  function canSelectSeat(index) {
    if (selectedSeats.length === 0) {
      return true;
    }
  
    const lastSelectedIndex = selectedSeats[selectedSeats.length - 1];
    const rowOfSelectedSeat = Math.floor(lastSelectedIndex / 8);
    const rowOfCurrentSeat = Math.floor(index / 8);
  
    // Check if the seat is consecutive with the last selected seat
    if (Math.abs(index - lastSelectedIndex) === 1) {
      if (rowOfSelectedSeat === rowOfCurrentSeat && !isSeatEmptyBetween(lastSelectedIndex, index)) {
        return true;
      }
    }
  
    // Check if there's no empty seat between the last selected seat and the current seat
    if (rowOfSelectedSeat !== rowOfCurrentSeat) {
      return true;
    }
  
    return false;
  }
  

  function isSeatEmptyBetween(startIndex, endIndex) {
    const step = Math.sign(endIndex - startIndex);
    let i = startIndex + step;
    while (i !== endIndex) {
      if (!seats[i].classList.contains('sold')) {
        return true; // There's an empty seat between selected seats
      }
      i += step;
    }
    return false;
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
