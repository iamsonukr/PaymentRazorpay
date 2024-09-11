import axios from 'axios'
import React from 'react'
import { useState } from 'react';

const Product = () => {

    const amount = 100;
    const currency = "INR";
    const receiptId = "thisissonu";

    const paymentHandler = async (e) => {
        const response = await axios.post('http://localhost:5000/api/order', { amount, currency, receipt: receiptId, },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        const order = response.data
        // console.log("This is the order generate from the backend and send to the server along with the order.id which is very essential")
        // console.log(order)


        // THESE ARE THE THINGS YOU WANT TO SHOW ON THE DASHBOARD LIKE COMPNAY NAME , NUMBER , AMOUNT , LOGO 
        // It uses the data obtained from the response to set up the dashboard like order.id
        var paymentWindowConfig = {
            // Enter the Key ID generated from the Dashboard
            "key": "rzp_test_RakCckTlR6axJb",
            // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "amount": amount,
            currency,
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "order_id": order.id,

            // 🔰🔰🔰 after the payment is made the control goes to the handler to verify the payment 🔰🔰🔰
            "handler": async function (response) {
                console.log('Payment Successful', response);
                try {
                    const validateRes = await axios.post('http://localhost:5000/api/order/validate', response);
                    // console.log(validateRes.data);
                } catch (error) {
                    console.error("Payment validation failed:", error);
                }
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#cc3333"
            }
        };

        // creating the payment window using the options
        var paymentWindow = new window.Razorpay(paymentWindowConfig);
        paymentWindow.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        paymentWindow.open();
        e.preventDefault();
    }

    // Form handle

    const [formData, setFormData] = useState({
        clientName: "",
        email: "",
        phoneNumber: "",
        clientAddress: "",
        dueDate: "",
        description: "",
        quantity: "1",
        price: "50",
        comments: "",
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        // Handle form submission logic here



        paymentHandler()
      };

    
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full">
                    <h2 className="text-2xl font-bold text-center mb-6">Invoice Form</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      
                        <div>
                            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
                            <input
                                type="text"
                                id="clientName"
                                name="clientName"
                                value={formData.clientName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter client name"
                                required
                            />
                        </div>

                     
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter client email"
                                required
                            />
                        </div>

                        
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter client phone number"
                                required
                            />
                        </div>

                    
                        <div>
                            <label htmlFor="clientAddress" className="block text-sm font-medium text-gray-700">Client Address</label>
                            <textarea
                                id="clientAddress"
                                name="clientAddress"
                                value={formData.clientAddress}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter client address"
                                required
                            ></textarea>
                        </div>

                    
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Invoice Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                     
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter item description"
                                required
                            />
                        </div>

                       
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <select
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                    
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <select
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="50">$50</option>
                                <option value="100">$100</option>
                                <option value="150">$150</option>
                                <option value="200">$200</option>
                                <option value="250">$250</option>
                            </select>
                        </div>

                      
                        <div>
                            <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
                            <textarea
                                id="comments"
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Additional comments or instructions"
                            ></textarea>
                        </div>

                    
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                            >
                                Submit Invoice
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Product