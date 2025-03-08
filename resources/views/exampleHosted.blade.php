<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="SSLCommerz">
    <title>Example - Hosted Checkout | SSLCommerz</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>
    {{-- <script>
    window.location.href = route("payment"); // Reload to Blade page
</script> --}}

</head>
<body class="bg-light">
<div class="container">
    <script>
    document.addEventListener("DOMContentLoaded", function () {
        // Get the stored payment data
        const paymentData = JSON.parse(sessionStorage.getItem("payment_data"));

        if (paymentData) {
            let product_id = paymentData.product_id;
            let quantity = paymentData.quantity;
            let product_name = paymentData.product_name;
            let color = paymentData.color;
            let size = paymentData.size;
            // console.log(product_name);
            // console.log(color);
            // console.log(size);
            // console.log(quantity);
            

            // console.log(paymentData);
        // add product_id also 
            document.getElementById("product_id").innerText = paymentData.product_id;
            document.getElementById("product_name").innerText = paymentData.product_name;
            document.getElementById("quantity").innerText = paymentData.quantity;
            document.getElementById("color").innerText = paymentData.color;
            document.getElementById("size").innerText = paymentData.size;
            document.getElementById("amount").innerText = paymentData.amount + " BDT";
             // Update the hidden input field with the correct amount
            document.getElementById("total_amount").value = paymentData.amount;
              // Update the hidden input fields inside the form
 // Update hidden input fields
        document.getElementById("hidden_product_name").value = product_name;
        document.getElementById("hidden_quantity").value = quantity;
        document.getElementById("hidden_color").value = color;
        document.getElementById("hidden_size").value = size;
        document.getElementById("product_id").value = product_id;
         console.log("Product Name:", document.getElementById("product_name").value);
    console.log("Quantity:", document.getElementById("quantity").value);
    console.log("Color:", document.getElementById("color").value);
    console.log("Size:", document.getElementById("size").value);
        }
    });
</script>
    <div class="py-5 text-center">
        <h2>Payment  Checkout Page </h2>
        <p class="lead mt-3 text-muted ">আপনার শিপিং ঠিকানা লিখুন এবং অর্ডার সারাংশ পরীক্ষা করুন।</p>  
    </div>

    <div class="row">
<div class="col-md-4 order-md-2 mb-4">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-muted">Your Order Summary</span>
    </h4>
    <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <h6 class="my-0">Product Name</h6>
                <small class="text-muted" id="product_name">Loading...</small>
            </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <h6 class="my-0">Quantity</h6>
                <small class="text-muted" id="quantity">Loading...</small>
            </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <h6 class="my-0">Color</h6>
                <small class="text-muted" id="color">Loading...</small>
            </div>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <h6 class="my-0">Size</h6>
                <small class="text-muted" id="size">Loading...</small>
            </div>
        </li>
        <li class="list-group-item d-flex justify-content-between">
            <span>Total (BDT)</span>
            <strong id="amount">Loading...</strong>
        </li>
    </ul>
</div>
        <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Shipping address</h4>
            <form action="{{ url('/pay') }}" method="POST" class="needs-validation">
            @csrf
                {{-- <input type="hidden" value="{{ csrf_token() }}" name="_token" /> --}}
                <input type="hidden" value='' name="product_id" id="product_id" />
                <input type="hidden" value='' name="product_name" id="hidden_product_name" />
                <input type="hidden" value='' name="quantity" id="hidden_quantity" />
                <input type="hidden" value='' name="color" id="hidden_color" />
                <input type="hidden" value='' name="size" id="hidden_size" />
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label for="firstName">Full name</label>
                        <input type="text" name="customer_name" class="form-control" id="customer_name" placeholder=""
                               value="John Doe" required>
                        <div class="invalid-feedback">
                            Valid customer name is required.
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="mobile">Mobile</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">+88</span>
                        </div>
                        <input type="text" name="customer_mobile" class="form-control" id="mobile" placeholder="Mobile"
                               value="01711xxxxxx" required>
                        <div class="invalid-feedback" style="width: 100%;">
                            Your Mobile number is required.
                        </div>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email <span class="text-muted">(Optional)</span></label>
                    <input type="email" name="customer_email" class="form-control" id="email"
                           placeholder="you@example.com" value="you@example.com" required>
                    <div class="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" name="customer_address" id="address" placeholder="1234 Main St"
                           value="Public Hall Modon" required>
                    <div class="invalid-feedback">
                        Please enter your shipping address.
                    </div>
                </div>

                <div class="mb-3">
                    <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                    <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
                </div>

                <div class="row">
                    <div class="col-md-5 mb-3">
                        <label for="country">Country</label>
                        <select class="custom-select d-block w-100" id="country" required>
                            <option value="">Choose...</option>
                            <option value="Bangladesh">Bangladesh</option>
                        </select>
                        <div class="invalid-feedback">
                            Please select a valid country.
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="state">State</label>
                        <select class="custom-select d-block w-100" id="state" required>
                            <option value="">Choose...</option>
                            <option value="Dhaka">Netrokona</option>
                        </select>
                        <div class="invalid-feedback">
                            Please provide a valid state.
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="zip">Zip</label>
                        <input type="text" class="form-control" id="zip" placeholder="2200" >
                        <div class="invalid-feedback">
                            Zip code required.
                        </div>
                    </div>
                </div>
                <hr class="mb-4">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="same-address">
                    <input type="hidden" value="1200" name="amount" id="total_amount" required/>
                    <label class="custom-control-label" for="same-address">Shipping address is the same as my billing
                        address</label>
                </div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="save-info">
                    <label class="custom-control-label" for="save-info">Save this information for next time</label>
                </div>
                <hr class="mb-4">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout </button>
            </form>
        </div>
    </div>

    <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">&copy; 2019 Company Name</p>
        <ul class="list-inline">
            <li class="list-inline-item"><a href="#">Privacy</a></li>
            <li class="list-inline-item"><a href="#">Terms</a></li>
            <li class="list-inline-item"><a href="#">Support</a></li>
        </ul>
    </footer>
</div>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
</html>