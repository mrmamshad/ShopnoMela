<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FlashSale;
use Carbon\Carbon;



class FlashSaleController extends Controller
{
    public function index()
    {
        $flashSales = FlashSale::with('product')->where('end_time', '>', Carbon::now())->get();
        return response()->json($flashSales);
    }
}
