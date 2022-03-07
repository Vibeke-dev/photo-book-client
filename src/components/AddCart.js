import React, { useEffect, useState } from "react";

function AddCart() {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isEmpty, setIsEmpty] = useState(false);
    const [vat, setVat] = useState(0);
  
    useEffect(() => {
      total();
    }, [cart]);
  
    const total = () => {
      let totalVal = 0;
  
      for (let i = 0; i < cart.length; i++) {
        totalVal = totalVal + cart[i].price * cart[i].quanlity;
      }
  
      let newVat = totalVal * 0.1;
      let newTotalPrice = totalVal + newVat;
      setTotalPrice(newTotalPrice);
      setVat(newVat);
      setCartTotal(totalVal);
    };
  
    const decToCart = (item) => {
      let newItem = cart.find((pro) => pro.id === item.id);
      if (newItem.quanlity > 1) {
        setCart(
          cart.map((pro) =>
            pro.id === item.id
              ? { ...newItem, quanlity: newItem.quanlity - 1 }
              : pro
          )
        );
      }
    };
  
    const addToCart = (item) => {
      let newItem = cart.find((pro) => pro.id === item.id);
      let newCart;
  
      if (newItem) {
        newCart = cart.map((pro) =>
          pro.id === item.id
            ? { ...newItem, quanlity: newItem.quanlity + 1 }
            : pro
        );
      } else {
        newCart = [...cart, { ...item, quanlity: 1 }];
      }
  
      setCart(newCart);
      setIsEmpty(false);
    };
  
    const removeFromCart = (item) => {
      let hardCopy = [...cart];
  
      hardCopy = hardCopy.filter((cartItem) => cartItem.id !== item.id);
  
      if (hardCopy.length === 0) {
        setIsEmpty(true);
      }
  
      setCart(hardCopy);
    };
  
    const listItems = items.map((product) => (
      <div className="card cart-card" key={product.id}>
        <img className="card-img-top cart-img" src={product.image} alt="" />
        <div className="card-body">
          <h5 className="card-title App-card-title">{product.name}</h5> <br />
          <span className="card-text">
            {product.price.toLocaleString("vi-VN")} đ{" "}
          </span>
        </div>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>
          {" "}
          Add To Cart
        </button>
      </div>
    ));
  
    return (
      <div>
        <h2 className="title">STORE</h2>
        <div className="App-list">{listItems}</div>
        <hr />
        <h2 className="title">CART</h2>
        <div>
          {!isEmpty ? (
            cart.map((item) => (
              <div key={item.id} className=" card-cart">
                <img className="card-img-top" src={item.image} alt="" />
                <div className="card-body">
                  <h5 className="card-title ">{item.name}</h5> <br />
                  <span className="card-text">
                    <div className="App-price-info">
                      <button
                        className="btn btn-info"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>{" "}
                      {item.quanlity}{" "}
                      <button
                        className="btn btn-info"
                        onClick={() => decToCart(item)}
                      >
                        -
                      </button>{" "}
                    </div>{" "}
                    <br /> {item.price.toLocaleString("vi-VN")} đ{" "}
                  </span>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <h2 className="title">YOUR CART IS EMPTY</h2>
          )}
        </div>
  
        <hr />
  
        <div className="App-price">
          <div>CurentTotal: {cartTotal.toLocaleString("vi-VN")} đ</div>
          <span>VAT: {vat.toLocaleString("vi-VN")} đ</span> <br />
          <span>Total: {totalPrice.toLocaleString("vi-VN")} đ </span>
        </div>
      </div>
    );
  };
  
  export default AddCart;