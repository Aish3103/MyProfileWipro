const http = require('http');
const { URL } = require('url');

function fetchOrder(orderId, callback) {
  setTimeout(() => {
    const mockDb = {
      1: { id: 1, item: "Pizza", price: 399 },
      2: { id: 2, item: "Burger", price: 299 }
    };

    const order = mockDb[orderId];
    if (!order) {
      return callback(new Error("Order not found"));
    }

    callback(null, order);
  }, 1000); 
}

function processPayment(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const paymentSuccess = true;

      if (!paymentSuccess) {
        return reject(new Error("Payment failed: insufficient funds"));
      }

      resolve({ message: `Payment processed for Rs${order.price}`, transactionId: `tx-${Date.now()}` });
    }, 1000);
  });
}


function generateInvoice(order) {
  return new Promise(resolve => {
    setTimeout(() => {
      const invoice = {
        invoiceId: `inv-${Date.now()}`,
        orderId: order.id,
        amount: order.price,
        item: order.item
      };
      resolve(invoice);
    }, 1000); 
  });
}


function fetchOrderPromise(orderId) {
  return new Promise((resolve, reject) => {
    fetchOrder(orderId, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

async function handleFullFlow(orderId) {
 
  const order = await fetchOrderPromise(orderId); 
  const paymentResult = await processPayment(order); 
  const invoice = await generateInvoice(order); 

  return { order, paymentResult, invoice };
}

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    if (pathname === '/order' || pathname.startsWith('/order/')) {
      let id = parsedUrl.searchParams.get('id');
      if (!id) {
        const parts = pathname.split('/').filter(Boolean); 
        if (parts.length >= 2) id = parts[1];
      }

      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "Missing order id. Use /order?id=1 or /order/1" }));
      }

      const numericId = Number(id);
      if (Number.isNaN(numericId)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "Order id must be a number" }));
      }

      try {
        const result = await handleFullFlow(numericId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(result, null, 2));
      } catch (flowErr) {

        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: flowErr.message }));
      }
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("404 Not Found");
  } catch (err) {

    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error', details: err.message }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
