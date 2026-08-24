<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Checkout | Tajim BD</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

    <style>
        .bd-placeholder-img { font-size: 1.125rem; text-anchor: middle; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    </style>
</head>
<body class="bg-light">
<div class="container">
    <div class="py-5 text-center">
        <h2>Payment Checkout Page</h2>
        <p class="lead mt-3 text-muted">আপনার শিপিং ঠিকানা লিখুন এবং অর্ডার সারাংশ পরীক্ষা করুন।</p>
    </div>

    <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Your Order Summary</span>
            </h4>
            <ul class="list-group mb-3">
                @forelse ($cartItems as $item)
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">{{ $item->product->title }}</h6>
                            <small class="text-muted">
                                Qty: {{ $item->qty }}
                                @if ($item->color) · {{ $item->color }} @endif
                                @if ($item->size) · Size: {{ $item->size }} @endif
                            </small>
                        </div>
                        <span class="text-muted">৳ {{ number_format($item->price * $item->qty) }}</span>
                    </li>
                @empty
                    <li class="list-group-item">Your cart is empty.</li>
                @endforelse
                <li class="list-group-item d-flex justify-content-between">
                    <span>Total (BDT)</span>
                    <strong>৳ {{ number_format($cartItems->sum(fn ($i) => $i->price * $i->qty)) }}</strong>
                </li>
            </ul>
        </div>

        <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Shipping address</h4>
            <form action="{{ url('/pay') }}" method="POST" class="needs-validation">
                @csrf
                <input type="hidden" value="{{ $cartItems->sum(fn ($i) => $i->price * $i->qty) }}" name="amount" id="total_amount" required/>
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label for="firstName">Full name</label>
                        <input type="text" name="customer_name" class="form-control" id="customer_name"
                               value="{{ old('customer_name', auth()->user()->name ?? '') }}" required>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="mobile">Mobile</label>
                    <input type="text" name="customer_mobile" class="form-control" id="mobile" placeholder="Mobile"
                           value="{{ old('customer_mobile', $customerProfile->cus_phone ?? '') }}" required>
                </div>

                <div class="mb-3">
                    <label for="email">Email <span class="text-muted">(Optional)</span></label>
                    <input type="email" name="customer_email" class="form-control" id="email"
                           placeholder="you@example.com" value="{{ old('customer_email', auth()->user()->email ?? '') }}" required>
                </div>

                <div class="mb-3">
                    <label for="password">Password <span class="text-muted">(optional — for login to your account)</span></label>
                    <input type="password" name="customer_password" class="form-control" id="password"
                           placeholder="Set a password (optional)">
                </div>

                <div class="mb-3">
                    <label for="address">Address</label>
                    <input type="text" class="form-control" name="customer_address" id="address"
                           placeholder="আপনার বিস্তারিত ঠিকানা লিখুন"
                           value="{{ old('customer_address', $customerProfile->ship_add ?? '') }}" required>
                </div>

                <hr class="mb-4">
                <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
            </form>
        </div>
    </div>

    <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">&copy; 2025 Tajim BD</p>
    </footer>
</div>
</body>
</html>
