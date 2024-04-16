<!doctype html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Invoice</title>
    <style>
      h4 {
        margin: 0;
      }
      .w-full {
          width: 100%;
      }
      .w-half {
          width: 50%;
      }
      .margin-top {
          margin-top: 1.25rem;
      }
      .footer {
          font-size: 0.875rem;
          padding: 1rem;
          background-color: rgb(241 245 249);
      }
      table {
          width: 100%;
          border-spacing: 0;
      }
      table.products {
          font-size: 0.875rem;
      }
      table.products tr {
          background-color: rgb(96 165 250);
      }
      table.products th {
          color: #ffffff;
          padding: 0.5rem;
      }
      table tr.items {
          background-color: rgb(241 245 249);
      }
      table tr.items td {
          padding: 0.5rem;
      }
      .total {
          text-align: right;
          margin-top: 1rem;
          font-size: 0.875rem;
      }
    </style>
</head>
<body>
    <table class="w-full">
        <tr>
            <td style="text-align: left;" class="w-half">
                <h4>No Invoice : {{ $data[0]['transaksi']->no_invoice }}</h4>
            </td>
        </tr>
    </table>
 
    <div class="margin-top">
        <table class="w-full">
            <tr>
                <td class="w-half">
                    <div><h4>Olivia Cakes & Brownies</h4></div>
                    <div>{{ $data[0]['transaksi']->tanggal }}</div>
                </td>
            </tr>
        </table>
    </div>
 
    <div class="margin-top">
        <table class="products">
            <tr>
                <th>Qty</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Jumlah</th>
            </tr>
            @foreach($data as $item)
                @foreach ($item['item'] as $allitem)
                    <tr class="items">
                        <td align="center">
                            {{ $allitem['qty'] }}
                        </td>
                        <td align="center">
                            {{ $allitem['nama'] }}
                        </td>
                        <td align="center">
                            {{ $allitem['harga'] / $allitem['qty'] }}
                        </td>
                        <td align="center">
                            {{ $allitem['harga'] }}
                        </td>
                    </tr>
                @endforeach
            @endforeach
        </table>
    </div>
 
    <div class="total">
        Subtotal: Rp. {{ $data[0]['transaksi']->total_harga }}
    </div>
    <div style="margin-top: 0.5rem;" class="total">
        Diskon: Rp. {{ $data[0]['diskon'] }}
    </div>
    <div style="font-weight: bold; margin-top: 0.5rem;" class="total">
        Total: Rp. {{ $data[0]['transaksi']->pembayaran }}
    </div>
 
    <div class="footer margin-top">
        <div>Hormat Kami,</div>
        <div>Olivia Cakes & Brownies</div>
    </div>
</body>
</html>