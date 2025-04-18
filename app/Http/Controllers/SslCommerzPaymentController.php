<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Library\SslCommerz\SslCommerzNotification;
use Inertia\Inertia;
use App\Models\PaymentHistory;
use App\Models\Order;


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
        // dd($request->all());
       $paymentData = session('payment_data', []); // Retrieve data from session
        return view('exampleHosted', compact('paymentData'));
        // return Inertia::render('sslcommerz/PaymentInit');
    }


    public function index(Request $request)
    {
        # Here you have to receive all the order data to initate the payment.
        # Let's say, your oder transaction informations are saving in a table called "orders"
        # In "orders" table, order unique identity is "transaction_id". "status" field contain status of the transaction, "amount" is the order amount to be paid and "currency" is for storing Site Currency which will be checked with paid currency.

           # Retrieve form data

        //    dd($request->all());
           $product_id = $request->input('product_id');
        //    dd($product_id);
           $product_name = $request->input('product_name');  
        //    dd($product_name);
           $product_quantity = $request->input('quantity');
           $product_color = $request->input('color');
           $product_size = $request->input('size');
        //    dd([
        //        'product_id' => $product_id,
        //        'product_name' => $product_name,
        //        'product_quantity' => $product_quantity,
        //        'product_color' => $product_color,
        //        'product_size' => $product_size
        //    ]);
  
    $post_data = array();
    $post_data['total_amount'] = $request->input('amount'); // Get amount from form
    $post_data['currency'] = "BDT";
    $post_data['tran_id'] = uniqid(); // Unique transaction ID

    # CUSTOMER INFORMATION
    $post_data['cus_name'] = $request->input('customer_name');
    $post_data['cus_email'] = $request->input('customer_email');
    $post_data['cus_add1'] = $request->input('customer_address');
    $post_data['cus_add2'] = $request->input('address2') ?? "";
    $post_data['cus_city'] = "";
    $post_data['cus_state'] = "";
    $post_data['cus_postcode'] = $request->input('zip') ?? "";
    $post_data['cus_country'] = "Bangladesh";
    $post_data['cus_phone'] = "+88" . $request->input('customer_mobile');
    $post_data['cus_fax'] = "";

    # SHIPMENT INFORMATION (You can modify this if you have separate shipping details)
    $post_data['ship_name'] = $request->input('customer_name');
    $post_data['ship_add1'] = $request->input('customer_address');
    $post_data['ship_add2'] = $request->input('address2') ?? "";
    $post_data['ship_city'] = "";
    $post_data['ship_state'] = "";
    $post_data['ship_postcode'] = $request->input('zip') ?? "";
    $post_data['ship_phone'] = "";
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

        #Before  going to initiate the payment order status need to insert or update as Pending.
        $update_product = DB::table('orders')
            ->where('transaction_id', $post_data['tran_id'])
            ->updateOrInsert([
                'name' => $post_data['cus_name'],
                'user_id' => auth()->user()->id,
                'email' => $post_data['cus_email'],
                'phone' => $post_data['cus_phone'],
                'amount' => $post_data['total_amount'],
                'status' => 'Pending',
                'address' => $post_data['cus_add1'],
                'transaction_id' => $post_data['tran_id'],
                'currency' => $post_data['currency'],
                'product_id' => $product_id,
                'product_name' => $product_name,
                'product_quantity' => $product_quantity,
                'product_color' => $product_color,
                'product_size' => $product_size,
                'created_at' => now(),
                'updated_at' => now()
            ]);

        $sslc = new SslCommerzNotification();
        # initiate(Transaction Data , false: Redirect to SSLCOMMERZ gateway/ true: Show all the Payement gateway here )
        $payment_options = $sslc->makePayment($post_data, 'hosted');

        if (!is_array($payment_options)) {
            print_r($payment_options);
            $payment_options = array();
        }

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

    // Check if the order exists
    $order = Order::where('transaction_id', $tran_id)->first();

    if (!$order) {
        return redirect()->route('orders')->with('error', 'Order not found!');
    }

    if ($order->status == 'Pending') {
        $validation = $sslc->orderValidate($request->all(), $tran_id, $amount, $currency);

        if (!$validation) {
            return redirect()->route('orders')->with('error', 'Payment validation failed!');
        }

        // Update order with payment details
        $order->update([
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