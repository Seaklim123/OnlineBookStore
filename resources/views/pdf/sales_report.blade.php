<!DOCTYPE html>
<html>
<head>
    <title>Sales Report</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .total { text-align: right; font-weight: bold; font-size: 16px; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>{{ $title }}</h1>
    <p>Generated on: {{ $date }}</p>

    <table>
        <thead>
            <tr>
                <th>Order ID</th>
                <!-- ADD THIS HEADER -->
                <th>Customer</th> 
                <th>Date</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order)
            <tr>
                <td>#{{ $order->id }}</td>
                <!-- ADD THIS DATA CELL -->
                <td>{{ $order->customer->name ?? 'Guest/Deleted' }}</td> 
                <td>{{ $order->created_at->format('d/m/Y') }}</td>
                <td>${{ number_format($order->order_total + 2, 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">Grand Total: ${{ number_format($total + 2, 2) }}</div>
</body>
</html>
