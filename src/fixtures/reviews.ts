import type { ReviewRecord } from './types';
import rawReviews from '@/data/reviews.json';

export const REVIEWS_FIXTURE: ReviewRecord[] = (rawReviews as any[]).map((r, i) => ({
  _id: r._id || r.id || `rev-${i}`,
  id: r.id || `rev-${i}`,
  name: r.name || 'Verified Guest',
  branch: r.branch === 'Tarnaka' ? 'Tarnaka' : r.branch === 'Brahmanpally' ? 'Brahmanpally' : 'Uppal',
  rating: Number(r.rating) || 5,
  date: r.date || 'Recent',
  service: r.service || 'Salon Service',
  reviewText: r.reviewText || r.review || '',
  source: 'Google',
  sourceUrl: r.branch === 'Tarnaka' ? 'https://maps.app.goo.gl/HtxnUPQ9b9a4f5Qv7' : 'https://maps.app.goo.gl/ocq8uts9jYaCp3bu8',
  avatar: r.avatar,
}));
