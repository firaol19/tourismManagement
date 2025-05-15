// components/ReviewServer.tsx

import ReviewClient from './ReviewClient';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getAllReviews } from '@/lib/action';
import { getServerSession } from 'next-auth';

const ReviewServer = async () => {

    const session = await getServerSession(authOptions)
  const reviews = await getAllReviews();
  const userId = Number(session?.user.id)

  // Convert date to string
  const formattedReviews = reviews.map(review => ({
    ...review,
    date: review.date.toString(), // Convert Date to string
  }));

  return <ReviewClient reviews={formattedReviews} userId={userId}/>;
};

export default ReviewServer;
