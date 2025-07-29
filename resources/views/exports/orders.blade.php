<table>
    <thead>
        <tr>
            <th>Tanggal</th>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>Produk</th>
            <th>Jumlah</th>
        </tr>
    </thead>
    <tbody>
        @foreach($orders as $order)
            @php
                $itemCount = $order->items->count();
            @endphp
            @foreach($order->items as $i => $item)
                <tr>
                    @if($i === 0)
                        <td rowspan="{{ $itemCount }}">{{ $order->created_at->format('Y-m-d') }}</td>
                        <td rowspan="{{ $itemCount }}">{{ $order->invoice_code }}</td>
                        <td rowspan="{{ $itemCount }}">{{ $order->user->name ?? '-' }}</td>
                        <td rowspan="{{ $itemCount }}">{{ $order->status }}</td>
                        <td rowspan="{{ $itemCount }}">{{ $order->total }}</td>
                    @endif
                    <td>{{ $item->product->name ?? '-' }}</td>
                    <td>{{ $item->quantity }}</td>
                </tr>
            @endforeach
        @endforeach
    </tbody>
</table>