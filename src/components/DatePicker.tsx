import "react-datepicker/dist/react-datepicker.css"; // Import the default styles

import React, { useState } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";

const DateAndTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // Start with today's date

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Select Date and Time</h1>

      {/* Date and Time Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        showTimeSelect // Enable time selection
        dateFormat="MMMM d, yyyy h:mm aa" // Format for date and time display
        minDate={new Date()} // Restrict selection to dates starting from today
        placeholderText="Select date and time"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
      />

      {/* Display Selected Date and Time */}
      {selectedDate && (
        <div className="mt-4">
          <strong>Selected Date and Time:</strong>{" "}
          {moment(selectedDate).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      )}
    </div>
  );
};

export default DateAndTimePicker;
