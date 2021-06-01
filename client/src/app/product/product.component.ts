import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor() { }

  priceId = "Your_price_Id";
  stripePromise = loadStripe("Stripe_public_key");
  quantity = 1;

  ngOnInit(): void {
  }

  async checkOut() {

    const stripe = await this.stripePromise;

    const checkoutSession = await axios.post("http://localhost:5000/createStripeSession", {
      priceId : this.priceId,
      quantity : this.quantity,
    })

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if (result?.error){
      alert(result.error.message)
    }
  }

}
