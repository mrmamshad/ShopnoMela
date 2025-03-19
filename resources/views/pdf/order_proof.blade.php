<!DOCTYPE html>
<html>
<head>
    <title>Order Proof</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .order-details { border: 1px solid #ddd; padding: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Order Proof</h2>
            <p>Order ID: {{ $order->id }}</p>
        </div>

        <div class="order-details">
            <p><strong>Customer Name:</strong> {{ $order->customer->name }}</p>
            <p><strong>Merchant:</strong> {{ $order->merchant->name }}</p>
            <p><strong>Total Amount:</strong> ৳{{ $order->total_amount }}</p>
            <p><strong>Payment Method:</strong> {{ $order->payment_method }}</p>
        </div>
    </div>
</body>
</html>
