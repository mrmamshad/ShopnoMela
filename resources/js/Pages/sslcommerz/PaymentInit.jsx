import React from "react";

const SSLCommerzCheckout = () => {
  return (
    <>
      <div className="container bg-light">
        <div className="py-5 text-center">
          <h2>Payment Checkout Page</h2>
          <p className="lead">
            Below is an example form built entirely with Bootstrap’s form controls. We have provided this sample form for understanding Hosted Checkout Payment with SSLCommerz.
          </p>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your Order Summary</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Product name</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">1000</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Second product</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">50</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Third item</h6>
                  <small className="text-muted">Brief description</small>
                </div>
                <span className="text-muted">150</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (BDT)</span>
                <strong>1200 TK</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Shipping address</h4>
            <form action="/pay" method="POST" className="needs-validation">
              <input type="hidden" value="csrf_token_placeholder" name="_token" />
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="customer_name">Full name</label>
                  <input type="text" name="customer_name" className="form-control" id="customer_name" defaultValue="John Doe" required />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="mobile">Mobile</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">+88</span>
                  </div>
                  <input type="text" name="customer_mobile" className="form-control" id="mobile" defaultValue="01711xxxxxx" required />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                <input type="email" name="customer_email" className="form-control" id="email" defaultValue="you@example.com" required />
              </div>

              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" defaultValue="93 B, New Eskaton Road" required />
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <select className="custom-select d-block w-100" id="country" required>
                    <option value="">Choose...</option>
                    <option value="Bangladesh">Bangladesh</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select className="custom-select d-block w-100" id="state" required>
                    <option value="">Choose...</option>
                    <option value="Dhaka">Dhaka</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input type="text" className="form-control" id="zip" required />
                </div>
              </div>

              <hr className="mb-4" />
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="same-address" />
                <input type="hidden" value="1200" name="amount" id="total_amount" required />
                <label className="custom-control-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Continue to checkout (Hosted)
              </button>
            </form>
          </div>
        </div>

        <footer className="my-5 pt-5 text-muted text-center text-small">
          <p className="mb-1">&copy; 2019 Company Name</p>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="#">Privacy</a></li>
            <li className="list-inline-item"><a href="#">Terms</a></li>
            <li className="list-inline-item"><a href="#">Support</a></li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default SSLCommerzCheckout;
