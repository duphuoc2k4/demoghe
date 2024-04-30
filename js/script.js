document.addEventListener("DOMContentLoaded", function() {
  const seats = document.querySelectorAll('.row .seat:not(.sold)');
  const buyButton = document.getElementById('buyButton');
  const bookingDetails = document.getElementById('bookingDetails');
  let selectedSeats = [];

  seats.forEach(function(seat) {
    seat.addEventListener('click', function() {
      if (!seat.classList.contains('selected')) {
        seat.classList.add('selected');
      
        const seatRow = seat.parentElement.querySelector('.seatrow').innerText;
        const seatColumn = [...seat.parentElement.querySelectorAll('.seat')].indexOf(seat) + 1;
        const selectedSeat = `${seatRow}${seatColumn}`;
        console.log('Selected Seat: ', selectedSeat);
        
        selectedSeats.push(selectedSeat);
      } else {
        seat.classList.remove('selected');
      
        const seatRow = seat.parentElement.querySelector('.seatrow').innerText;
        const seatColumn = [...seat.parentElement.querySelectorAll('.seat')].indexOf(seat) + 1;
        const unselectedSeat = `${seatRow}${seatColumn}`;
        const unselectedSeatIndex = selectedSeats.indexOf(unselectedSeat);
        if (unselectedSeatIndex !== -1) {
          selectedSeats.splice(unselectedSeatIndex, 1);
        }
      }
    });
  });

  buyButton.addEventListener('click', function() {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat before buying!');
      return;
    }

    // Format selected seats
    const formattedSeats = selectedSeats.join(', ');

    // Clear previous booking details
    bookingDetails.innerText = '';

    // Get current date
    const currentDate = new Date().toLocaleDateString();

    // Display booking details
    bookingDetails.innerText = `Selected Seats: ${formattedSeats}\nBooking Date: ${currentDate}`;

    // Clear selected seats
    selectedSeats = [];
    seats.forEach(function(seat) {
      seat.classList.remove('selected');
    });
  });
});

