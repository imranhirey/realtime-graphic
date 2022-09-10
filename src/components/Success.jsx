import React from 'react';

const Success = () => {
    return (
        <div className="container">
        <div className="row">
           <div className="col-md-6 mx-auto mt-5">
              <div className="payment">
                 <div className="payment_header">
                    <div className="check"><i className="fa fa-check" aria-hidden="true"></i></div>
                 </div>
                 <div className="content">
                    <h1>Payment Success !</h1>
                    <p>great , we have successfully recieved your payment  </p>
                    <p>your order will be dilivered at the next day  </p>
                    <a href="#">Go to Home</a>
                 </div>
                 
              </div>
           </div>
        </div>
     </div>
    );
};

export default Success;