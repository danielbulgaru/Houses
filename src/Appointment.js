import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

function Appointment(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [isOpen, setIsFormOpen] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const sendSMS = () => {
        async function doSMS() {
            let payload={
                id:props.id,
                name:document.getElementById("name").value,
                msg:document.getElementById("msg").value,
                tel:document.getElementById("tel").value,
                date: document.getElementById("date").value,
                time: document.getElementById("time").value
            }
            console.log (payload)
            let response = await fetch("http://localhost:3001/sms", {
                method: "POST", body: JSON.stringify(payload), headers: {
                     'Accept': 'application/json', 'Content-Type': 'application/json' 
                }                
            })
            let result = await response.json()
        }
        doSMS()
    }
    if (isOpen) {
        return (
            <div>
                <label>Name:</label><input id='name' type='text'></input><br />
                <label>Preferred date:</label><DatePicker id='date' selected={startDate} onChange={date => setStartDate(date)} /><br />
                <label>Preferred time:</label><input id='time' type='text'></input><br />
                <label>Contact email:</label><input id='email' type='text'></input><br />
                <label>Contact phone:</label><input id='tel' type='text'></input><br />
                <label>Notes/comments:</label><br /><textarea id='msg' rows="5" cols="40"></textarea><br />
                <button onClick={() => { setIsFormOpen(false); setIsBooked(true); sendSMS()}}>Submit</button>
            </div>
        );
    }
    return (
        <button onClick={() => setIsFormOpen(true)}>{isBooked ? "Booked" : "Request viewing"}</button>
    )
}
export default Appointment;


// Adam's code version ("reactive")
// more React code 

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import React, { useState, useEffect } from "react";
// function Appointment({index}) {
//   const [booking, setBooking] = useState({
//     isBooked: false,
//     isOpen: false,
//     msg: "",
//     tel: "",
//     startDate: new Date(),
//     sendSMS: false,
//   });
//   useEffect(() => {
//     if (booking.sendSMS) {
//       async function doSMS() {
//         let payload = { msg: booking.msg, tel: booking.tel };
//         console.log(payload);
//         let response = await fetch("http://localhost:3001/sms", {
//           method: "POST",
//           body: JSON.stringify(payload),
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         });
//         let result = await response.json();
//         setBooking((prevState) => ({ ...prevState, sendSMS: false }));
//       }
//       doSMS();
//     } else {
//       console.log(booking);
//     }
//   }, [booking]);
//   return booking.isOpen ? (
//     <div >
//       <label>Preferred date:</label>
//       <DatePicker
//         selected={booking.startDate}
//         onChange={(date) => setBooking((prevState) => ({ ...prevState, startDate: date }))}
//       />
//       <br />
//       <label>Preferred time:</label>
//       <input  type="text"></input>
//       <br />
//       <label>Contact email:</label>
//       <input  type="text"></input>
//       <br />
//       <label>Contact phone:</label>
//       <input       
//         type="text"
//         onChange={(e) => setBooking((prevState) => ({ ...prevState, tel: e.target.value }))}
//       ></input>
//       <br />
//       <label>Notes/comments:</label>
//       <br />
//       <textarea      
//         rows="5"
//         cols="40" onChange={(e) => setBooking((prevState) => ({ ...prevState, msg: e.target.value }))}
//       ></textarea>
//       <br />
//       <button
//         onClick={() => setBooking((prevState) => ({ ...prevState, isOpen: false, isBooked: true, sendSMS: true }))}
//       >
//         Submit
//       </button>
//     </div>
//   ) : (
//     <button
//       onClick={() => setBooking((prevState) => ({ ...prevState, isOpen: true }))}
//       disabled={booking.isBooked ? true : false}
//     >
//       {booking.isBooked ? "Booked" : "Request viewing"}
//     </button>
//   );
// }
// export default Appointment;