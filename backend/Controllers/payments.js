require("dotenv").config();
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const Stripe = require("stripe");
const order = require("../Models/order");
const user = require("../Models/user");
const product = require("../Models/product");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const checkout = asyncErrorHandler(async (req, res) => {
  const { email } = req.query;
  const { coupon } = req.body;

  const userobj = await user.findOne({ email }).select("_id");
  if (!userobj) {
    return res.status(400).json({ message: "User not found" });
  }
  const uid = userobj._id.toString();
  const cartObj = await user
    .findOne({ email })
    .populate({
      path: "cart.items.productId",
      select: "name price image brand quantity",
    })
    .select("cart name");

  const formattedCart = cartObj.cart.items.map((item) => {
    // Assuming item.productId.quantity now directly holds the available quantity for the product
    const availablequantity = item.productId.quantity; // Directly use quantity since no size exists anymore

    return {
      productId: item.productId._id,
      name: `${item.productId.brand} ${item.productId.name}`,
      image: item.productId.image,
      quantity:
        item.quantity > availablequantity ? availablequantity : item.quantity, // Ensure quantity does not exceed available stock
      price: item.productId.price,
    };
  });

  let customer;

  const existingCustomer = await stripe.customers.list({ email: email });
  if (existingCustomer.data.length > 0) {
    customer = existingCustomer.data[0];
  } else {
    customer = await stripe.customers.create({
      name: cartObj.name,
      email: email,
      metadata: { userId: uid },
    });
  }

  const line_items = formattedCart.map((item) => {
    return {
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.name,
          images: [item.image],

          metadata: {
            productId: item.productId.toString(),
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity, // Use `item.quantity` instead of `item.quantity`
    };
  });

  // Calculate the total price of the cart
  const totalAmount = line_items.reduce(
    (total, item) => total + item.price_data.unit_amount * item.quantity,
    0
  );

  if (totalAmount < 5000) {
    return res.status(400).json({
      success: false,
      message:
        "The total amount must be at least 50.00 to proceed with the checkout.",
    });
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    phone_number_collection: { enabled: true },
    billing_address_collection: "required",
    shipping_address_collection: {},
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "pkr" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 30000, currency: "pkr" },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 1 },
            maximum: { unit: "business_day", value: 1 },
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      cart: JSON.stringify(
        formattedCart.map((item) => {
          return {
            productId: item.productId,
            quantity: item.quantity,
          };
        })
      ),
    },
    customer: customer.id,
    discounts: coupon !== "" ? [{ coupon }] : [],
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.json({ url: session.url });
});

const createOrder = async (customer, data) => {
  try {
    const products = JSON.parse(data.metadata.cart);

    await order.create({
      userId: customer.metadata.userId,
      paymentIntentId: data.payment_intent,
      products,
      subtotal: data.amount_subtotal / 100,
      total: data.amount_total / 100,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });

    const userObj = await user.findById(customer.metadata.userId);
    userObj.cart.items = [];
    userObj.cart.totalPrice = 0;
    await userObj.save();

    console.log("Order created successfully");
  } catch (err) {
    console.log(err);
  }
};

const webhook = asyncErrorHandler((request, response) => {
  const sig = request.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Construct the event using the raw body and the signature
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err);
    return response.sendStatus(400);
  }

  // Process the event data
  const data = event.data.object;
  const eventType = event.type;

  switch (eventType) {
    case "checkout.session.completed":
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          await createOrder(customer, data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
      break;
    default:
      // Handle other events
      break;
  }

  response.status(200).send();
});

module.exports = { checkout, webhook };
