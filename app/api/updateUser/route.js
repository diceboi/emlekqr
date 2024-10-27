import User from '../../(models)/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, checkoutSession, zip, city, address1, address2, phone, stripeSubscription, secret } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          checkoutSession,
          zip,
          city,
          address1,
          address2,
          phone,
          stripeSubscription,
          secret,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log(updatedUser)
    return NextResponse.json({ message: 'User updated successfully', updatedUser });
    
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
