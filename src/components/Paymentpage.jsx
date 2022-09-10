import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Paymentpage = () => {
    let [payment, setPayment] = useState("");
    /// track the state of the payment
    let [paymentState, setPaymentState] = useState('unpaid');


 
    let history = useHistory();
   useEffect(()=>{
    setPayment(history.location.state.intent.data)
    localStorage.setItem('paymentid',history.location.state.intent.data.intent_id)
   },[])
   useEffect(()=>{


    setInterval(() => {
        let paymentid = localStorage.getItem('paymentid')
        console.log('djkdjkjkdjkdjkdjk',paymentid)

        console.log('checking payment status')
        axios.post('http://144.126.252.62:3009/track',{
            paymentId: paymentid
        })
        .then((res)=>{
            
            setPaymentState(res.data.status)
            if(res.data.status=='paid'){
                history.replace('/success')
            }
            
        })
        .catch((err)=>{
            console.log(err)
        })

        
    }, 1000);
   
   },[])



   // creaet timer for 60 seconds
    let [timer, setTimer] = useState(120);
    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((timer) => timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    // create timer for 60 seconds

 
  return (
    <div className="container">
      <div className="checkout-area w-75 mx-auto my-5">
        <h1 className="heading text-center">REAL TIME PAYMENT  USING PAYSOM PAYMENT PLATFORM</h1>
        <table className="table">
          <tbody>
            <tr>
                <td>Bussiness Name</td>
                <td>{payment?.who?.bname}</td>
            </tr>
            <tr>
                <td>Amount</td>
                <td>${payment.ammount}</td>
            </tr>
            <tr>
                <td>Payment Method</td>
                <td>direct payment</td>
            </tr>
            <tr>
                <td>Payment Status</td>
                <td>{payment.status}</td>
            </tr>

            <tr>
                <td>Payment Reference</td>
                <td>{payment.intent_id}</td>
            </tr>

            <tr>
                <td>Payment Date</td>
                <td>{payment.created_at}</td>
            </tr>
            <div style={{
            display: "flex",
           }}>
           <div >
           <h3>please scan this qr code to pay</h3>
            <img src={payment.qrcodeurl}/>
           </div>
           <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
           }}>
            <h2>please scan this qr code to pay</h2>
            <div style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "dodgerblue",
            }}>
           <h2 style={{
            color: "white",
           }}>{timer}</h2>
            </div>
              
           </div>
            </div>
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Paymentpage;
