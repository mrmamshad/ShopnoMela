<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Library\SslCommerz\SslCommerzNotification;
use Inertia\Inertia;
use App\Models\PaymentHistory;
use App\Models\Order;
use App\Models\ProductCart;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;


class SslCommerzPaymentController extends Controller
{

    public function exampleEasyCheckout()
    {
        return view('exampleEasycheckout');
    }
        public function preparePayment(Request $request)
    {
       session(['payment_data' => $request->all()]); // Store data in session
        return redirect()->route('payment'); // Redirect to the Blade view
    }

    public function exampleHostedCheckout(Request $request)
    {
        $paymentData = session('payment_data', []);
        $cartItems = $this->cartItems();
        $customerProfile = \App\Models\CustomerProfile::where('user_id', auth()->id())->first();

        return view('exampleHosted', compact('paymentData', 'cartItems', 'customerProfile'));
    }

    // Load cart for logged-in user or guest session
    protected function cartItems()
    {
        $query = ProductCart::with('product');
        if (auth()->check()) {
            $query->where('user_id', auth()->id());
        } else {
            $query->where('session_id', session()->getId());
        }
        return $query->get();
    }

    // Find existing user by email, otherwise create one with the checkout details
    protected function findOrCreateUser($email, $name, $phone = null, $password = null)
    {
        $email = $email ?: 'guest@shopnomela.com';
        $phone = $phone ? preg_replace('/\D+/', '', $phone) : null;

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name ?: 'ShopnoMela User',
                'phone' => $phone,
                'password' => Hash::make($password ?: Str::random(16)),
            ]
        );

        if ($user->phone !== $phone) {
            $user->update(['phone' => $phone]);
        }

        if (!$user->hasAnyRole(['customer', 'merchant', 'admin'])) {
            $user->assignRole('customer');
        }

        return $user;
    }


    public function index(Request $request)
    {
        # Here you have to receive all the order data to initate the payment.
        # Let's say, your oder transaction informations are saving in a table called "orders"
        # In "orders" table, order unique identity is "transaction_id". "status" field contain status of the transaction, "amount" is the order amount to be paid and "currency" is for storing Site Currency which will be checked with paid currency.

        $user = auth()->user();

        $cartItems = $this->cartItems();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart')->with('error', 'Your cart is empty. Please add products first.');
        }

        $post_data = array();
        $post_data['total_amount'] = $request->input('amount'); // Get amount from form
        $post_data['currency'] = "BDT";
        $post_data['tran_id'] = uniqid(); // Unique transaction ID

        # CUSTOMER INFORMATION
        $post_data['cus_name'] = $request->input('customer_name') ?? $user->name;
        $post_data['cus_email'] = $request->input('customer_email') ?? $user->email;
        $post_data['cus_add1'] = $request->input('customer_address') ?? "N/A";
        $post_data['cus_add2'] = $request->input('address2') ?? "";
        $post_data['cus_city'] = "";
        $post_data['cus_state'] = "";
        $post_data['cus_postcode'] = $request->input('zip') ?? "";
        $post_data['cus_country'] = "Bangladesh";
        $post_data['cus_phone'] = "+88" . ltrim($request->input('customer_mobile'), "+");
        $post_data['cus_fax'] = "";

        # SHIPMENT INFORMATION (You can modify this if you have separate shipping details)
        $post_data['ship_name'] = $post_data['cus_name'];
        $post_data['ship_add1'] = $post_data['cus_add1'];
        $post_data['ship_add2'] = $post_data['cus_add2'];
        $post_data['ship_city'] = "";
        $post_data['ship_state'] = "";
        $post_data['ship_postcode'] = $post_data['cus_postcode'];
        $post_data['ship_phone'] = $post_data['cus_phone'];
        $post_data['ship_country'] = "Bangladesh";

        $post_data['shipping_method'] = "NO";
        $post_data['product_name'] = "Product Purchase";
        $post_data['product_category'] = "Goods";
        $post_data['product_profile'] = "physical-goods";

        # OPTIONAL PARAMETERS
        $post_data['value_a'] = "ref001";
        $post_data['value_b'] = "ref002";
        $post_data['value_c'] = "ref003";
        $post_data['value_d'] = "ref004";

        # Auto-create the user from the checkout details if they are not logged in
        $userId = $user?->id;
        if (!$userId) {
            $newUser = $this->findOrCreateUser(
                $post_data['cus_email'],
                $post_data['cus_name'],
                $request->input('customer_mobile'),
                $request->input('customer_password') // optional password set by the user
            );
            $userId = $newUser->id;
            \Illuminate\Support\Facades\Auth::login($newUser);
        }

        # Create one order per cart item (all share the same transaction id),
        # then clear the cart before redirecting to the gateway.
        foreach ($cartItems as $item) {
            Order::create([
                'user_id' => $userId,
                'product_id' => $item->product_id,
                'product_name' => $item->product->title,
                'product_quantity' => $item->qty,
                'product_color' => $item->color,
                'product_size' => $item->size,
                'amount' => $item->price * $item->qty,
                'payment_method' => 'Online Payment',
                'status' => 'Pending',
                'name' => $post_data['cus_name'],
                'phone' => $post_data['cus_phone'],
                'address' => $post_data['cus_add1'],
                'transaction_id' => $post_data['tran_id'],
                'currency' => $post_data['currency'],
                'email' => $post_data['cus_email'],
            ]);
        }

        // Clear the cart for this user or guest session
        if ($user) {
            ProductCart::where('user_id', $user->id)->delete();
        } else {
            ProductCart::where('session_id', session()->getId())->delete();
        }

        // Save shipping profile so the fields are pre-filled on next checkout
        if (auth()->check()) {
            \App\Models\CustomerProfile::updateOrCreate(
                ['user_id' => auth()->id()],
                [
                    'cus_name' => $post_data['cus_name'],
                    'cus_phone' => $request->input('customer_mobile'),
                    'ship_name' => $post_data['cus_name'],
                    'ship_add' => $post_data['cus_add1'],
                    'ship_city' => 'Dhaka',
                    'ship_state' => 'Dhaka',
                ]
            );
        }

        // Get the gateway URL without the library's internal exit() call
        // (which would skip Laravel's session-save middleware)
        $sslc = new SslCommerzNotification();
        $result = $sslc->makePayment($post_data, 'checkout', 'json');
        $parsed = json_decode($result, true);

        if (is_array($parsed) && in_array($parsed['status'] ?? '', ['success', 'SUCCESS']) && !empty($parsed['data'])) {
            return redirect()->away($parsed['data']);
        }

        $error = $parsed['message'] ?? 'Payment initiation failed.';
        return redirect()->route('cart')->with('error', $error);
    }

    public function payViaAjax(Request $request)
    {

        # Here you have to receive all the order data to initate the payment.
        # Lets your oder trnsaction informations are saving in a table called "orders"
        # In orders table order uniq identity is "transaction_id","status" field contain status of the transaction, "amount" is the order amount to be paid and "currency" is for storing Site Currency which will be checked with paid currency.

        $post_data = array();
        $post_data['total_amount'] = '10'; # You cant not pay less than 10
        $post_data['currency'] = "BDT";
        $post_data['tran_id'] = uniqid(); // tran_id must be unique

        # CUSTOMER INFORMATION
        $post_data['cus_name'] = 'Customer Name';
        $post_data['cus_email'] = 'customer@mail.com';
        $post_data['cus_add1'] = 'Customer Address';
        $post_data['cus_add2'] = "";
        $post_data['cus_city'] = "";
        $post_data['cus_state'] = "";
        $post_data['cus_postcode'] = "";
        $post_data['cus_country'] = "Bangladesh";
        $post_data['cus_phone'] = '8801XXXXXXXXX';
        $post_data['cus_fax'] = "";

        # SHIPMENT INFORMATION
        $post_data['ship_name'] = "Store Test";
        $post_data['ship_add1'] = "Dhaka";
        $post_data['ship_add2'] = "Dhaka";
        $post_data['ship_city'] = "Dhaka";
        $post_data['ship_state'] = "Dhaka";
        $post_data['ship_postcode'] = "1000";
        $post_data['ship_phone'] = "";
        $post_data['ship_country'] = "Bangladesh";

        $post_data['shipping_method'] = "NO";
        $post_data['product_name'] = "Computer";
        $post_data['product_category'] = "Goods";
        $post_data['product_profile'] = "physical-goods";

        # OPTIONAL PARAMETERS
        $post_data['value_a'] = "ref001";
        $post_data['value_b'] = "ref002";
        $post_data['value_c'] = "ref003";
        $post_data['value_d'] = "ref004";


        #Before  going to initiate the payment order status need to update as Pending.
        $update_product = DB::table('orders')
            ->where('transaction_id', $post_data['tran_id'])
            ->updateOrInsert([
                'name' => $post_data['cus_name'],
                'email' => $post_data['cus_email'],
                'phone' => $post_data['cus_phone'],
                'amount' => $post_data['total_amount'],
                'status' => 'Pending',
                'address' => $post_data['cus_add1'],
                'transaction_id' => $post_data['tran_id'],
                'currency' => $post_data['currency']
            ]);

        $sslc = new SslCommerzNotification();
        # initiate(Transaction Data , false: Redirect to SSLCOMMERZ gateway/ true: Show all the Payement gateway here )
        $payment_options = $sslc->makePayment($post_data, 'checkout', 'json');

        if (!is_array($payment_options)) {
            print_r($payment_options);
            $payment_options = array();
        }

    }

public function success(Request $request)
{
    $tran_id = $request->input('tran_id');
    $amount = $request->input('amount');
    $currency = $request->input('currency');

    $sslc = new SslCommerzNotification();

    // Check if the order exists (a payment can cover multiple order rows)
    $orders = Order::where('transaction_id', $tran_id)->get();

    if ($orders->isEmpty()) {
        return redirect()->route('orders')->with('error', 'Order not found!');
    }

    $order = $orders->first();

    if ($order->status == 'Pending') {
        $validation = $sslc->orderValidate($request->all(), $tran_id, $amount, $currency);

        if (!$validation) {
            return redirect()->route('orders')->with('error', 'Payment validation failed!');
        }

        // Update all orders sharing this transaction id
        Order::where('transaction_id', $tran_id)->update([
            'status' => 'Processing', // Order is now being processed
            'payment_method' => $request->input('card_type') ?? 'Unknown', // Bkash, Nagad, etc.
            'payment_date' => $request->input('tran_date') ?? now(), // Payment timestamp
        ]);

        // Store or update payment history
        PaymentHistory::updateOrInsert(
            ['transaction_id' => $tran_id], // Prevent duplicate records
            [
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'validation_id' => $request->input('val_id'),
                'amount' => $amount,
                'currency' => $currency,
                'status' => 'VALID',
                'payment_method' => $request->input('card_type') ?? 'Unknown',
                'bank_transaction_id' => $request->input('bank_tran_id'),
                'response_data' => json_encode($request->all()),
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        return redirect()->route('orders')->with('success', 'Order successfully processed!');
    }

    if ($order->status == 'Processing' || $order->status == 'Complete') {
        return redirect()->route('orders')->with('success', 'Transaction already completed!');
    }

    return redirect()->route('orders')->with('error', 'Invalid transaction!');
}

    

    public function fail(Request $request)
    {
        $tran_id = $request->input('tran_id');

        $order_details = DB::table('orders')
            ->where('transaction_id', $tran_id)
            ->select('transaction_id', 'status', 'currency', 'amount')->first();

        if ($order_details->status == 'Pending') {
            $update_product = DB::table('orders')
                ->where('transaction_id', $tran_id)
                ->update(['status' => 'Failed']);
            echo "Transaction is Falied";
        } else if ($order_details->status == 'Processing' || $order_details->status == 'Complete') {
            echo "Transaction is already Successful";
        } else {
            echo "Transaction is Invalid";
        }
         return redirect()->route('orders');

    }

    public function cancel(Request $request)
    {
        $tran_id = $request->input('tran_id');

        $order_details = DB::table('orders')
            ->where('transaction_id', $tran_id)
            ->select('transaction_id', 'status', 'currency', 'amount')->first();

        if ($order_details->status == 'Pending') {
            $update_product = DB::table('orders')
                ->where('transaction_id', $tran_id)
                ->update(['status' => 'Canceled']);
            echo "Transaction is Cancel";
        } else if ($order_details->status == 'Processing' || $order_details->status == 'Complete') {
            echo "Transaction is already Successful";
        } else {
            echo "Transaction is Invalid";
        }

       return redirect()->route('orders');
    }

    public function ipn(Request $request)
    {
        #Received all the payement information from the gateway
        if ($request->input('tran_id')) #Check transation id is posted or not.
        {

            $tran_id = $request->input('tran_id');

            #Check order status in order tabel against the transaction id or order id.
            $order_details = DB::table('orders')
                ->where('transaction_id', $tran_id)
                ->select('transaction_id', 'status', 'currency', 'amount')->first();

            if ($order_details->status == 'Pending') {
                $sslc = new SslCommerzNotification();
                $validation = $sslc->orderValidate($request->all(), $tran_id, $order_details->amount, $order_details->currency);
                if ($validation == TRUE) {
                    /*
                    That means IPN worked. Here you need to update order status
                    in order table as Processing or Complete.
                    Here you can also sent sms or email for successful transaction to customer
                    */
                    $update_product = DB::table('orders')
                        ->where('transaction_id', $tran_id)
                        ->update(['status' => 'Processing']);

                    echo "Transaction is successfully Completed";
                }
            } else if ($order_details->status == 'Processing' || $order_details->status == 'Complete') {

                #That means Order status already updated. No need to udate database.

                echo "Transaction is already successfully Completed";
            } else {
                #That means something wrong happened. You can redirect customer to your product page.

                echo "Invalid Transaction";
            }
        } else {
            echo "Invalid Data";
        }
    }

}