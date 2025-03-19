<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Order;

class OrderPdfController extends Controller
{
    public function generatePDF($orderId)
    {
        $order = Order::with('customer', 'merchant')->findOrFail($orderId);

        $pdf = Pdf::loadView('pdf.order_proof', compact('order'));
        return $pdf->download("Order_Proof_{$order->id}.pdf");
    }
}
