import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
const CartPage = () => {
  const [clientToken, setClientToken] = useState("");
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col">
          <h1 className="text-center">
            {`Hello ${auth?.token && auth?.user?.name}`}{" "}
          </h1>
        </div>
        <h4 className="text-center text-2xl">
          {cart?.length
            ? `You have ${cart.length} items in your cart ${
                auth?.token ? "" : "Please login to checkout"
              }`
            : "Your cart is empty"}
        </h4>
        <div className="grid lg:grid-cols-2 text-center">
          <div className="grid-cols-6">
            {cart.map((p) => (
              <div className="grid lg:grid-cols-2 border-4 p-4 flex-row">
                <div className="  justify-center flex">
                  <figure>
                    <img
                      className="w-52 h-52 border-red-600"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </figure>
                </div>
                <div className="col text-left">
                  <h4>Name: {p.name} </h4>
                  <p>Description: {p.description.substring(0, 30)} </p>
                  <p>Price: ${p.price} </p>
                  <button
                    onClick={() => removeCartItem(p._id)}
                    className="btn btn-warning"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}{" "}
          </div>
          <div className="grid-cols-6 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h3 className="m-5">Total: {totalPrice()}</h3>
            {auth?.user?.address ? (
              <>
                <div>
                  <h4>Current address: {auth?.user?.address}</h4>

                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className="btn"
                  >
                    Update address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    onClick={() => navigate("/dashboard/user/profile")}
                    className="btn"
                  >
                    Update address
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                    className="btn"
                  >
                    Please to Login checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
