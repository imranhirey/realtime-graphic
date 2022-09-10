import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";

const BookCartCheckOut = () => {
  let navigate= useHistory()
  const { books, carts } = useContext(Context);
  let [intent,setintent] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  let handlecheckout=async()=>{
  let res= await axios.post('http://144.126.252.62:3009/pay',{
    totalPrice
  })
 setintent(res.data.status)
 navigate.push('/pay',{
  intent:res.data
 })
 
 

  }
  const shippingCost = 5;

  const getSubtotal = (books, carts) => {
    let subtotal = 0;
    carts.forEach(cart => {
      books.forEach(book => {
        if (book.id === cart.id) {
          subtotal = subtotal + book.price * cart.quantity;
        }
      });
    });

    return subtotal.toFixed(2);
  };

  let subtotal = getSubtotal(books, carts);
  let tempTotal = (parseFloat(subtotal) + shippingCost).toFixed(2);

  useEffect(() => {
    setTotalPrice(tempTotal);
  }, [tempTotal]);

  return (
    <div className="container">
      <div className="checkout-area w-75 mx-auto my-5">
        <h1 className="heading text-center">Total</h1>
        <table className="table">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>${subtotal}</td>
            </tr>
            <tr>
              <td>Shipping Cost</td>
              <td>$0{shippingCost}</td>
            </tr>
            <tr className="text-primary h4">
              <td>Total</td>
              <td>${totalPrice}</td>
            </tr>
            <tr>
              <td>
                <Link className="btn btn-outline-primary" to="/">
                  Back To Shopping
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-outline-info"
                  onClick={() => {
                    handlecheckout()
                 
                  }}
                >
                  Checkout
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookCartCheckOut;
