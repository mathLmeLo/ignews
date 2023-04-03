import { fauna } from '@/services/fauna';
import { stripe } from '@/services/stripe';
import { query as q } from 'faunadb';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
) {
  // Buscar o usuário no bancp do FaunaDB com o ID {customerId}
  // Salvar os dados da subscription nno FaunaDB
  console.log(subscriptionId, customerId)

  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  }

  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData}
    )
  )
   
}