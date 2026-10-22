import { Injectable, signal } from '@angular/core';
import { Review } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  readonly reviews = signal<Review[]>([
    {
      id: 'rev-1',
      productId: 'jbl-live-660nc',
      authorName: 'Marco Delgado',
      rating: 5,
      comment: 'Incredible sound clarity and punchy bass! Battery easily lasts whole work week without charging. Best headphones for everyday commute.',
      date: 'Sep 24, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-2',
      productId: 'jbl-live-660nc',
      authorName: 'Sarah Jenkins',
      rating: 5,
      comment: 'Very comfortable earpads, and the adaptive noise cancelling works wonders in busy coffee shops.',
      date: 'Sep 21, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-3',
      productId: 'jbl-live-660nc',
      authorName: 'David Tan',
      rating: 4,
      comment: 'Sound quality is great. Treble is bright and clear, and bass punch is very satisfying right out of the box.',
      date: 'Sep 17, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-4',
      productId: 'jbl-live-660nc',
      authorName: 'Patricia Reyes',
      rating: 3,
      comment: 'Good overall, but slightly tight on larger head sizes after three hours of continuous wear.',
      date: 'Sep 12, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-5',
      productId: 'jbl-live-660nc',
      authorName: 'Carlos Mendoza',
      rating: 2,
      comment: 'Bluetooth sometimes cuts out when walking between concrete walls in my apartment.',
      date: 'Sep 05, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-6',
      productId: 'jbl-live-660nc',
      authorName: 'Anton Santos',
      rating: 1,
      comment: 'Did not match my audio setup expectations. Bass felt too overpowering for acoustic music.',
      date: 'Aug 29, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-7',
      productId: 'bose-crusher-evo',
      authorName: 'Alex Mercer',
      rating: 5,
      comment: 'The sensory haptic bass slider literally vibrates your skull! If you love EDM or hip hop, this is the Holy Grail.',
      date: 'Sep 26, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-8',
      productId: 'bose-crusher-evo',
      authorName: 'Elena Rostova',
      rating: 5,
      comment: 'Build quality is top notch. Folds neatly and comes with a durable travel case. Premium purchase.',
      date: 'Sep 22, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-9',
      productId: 'bose-crusher-evo',
      authorName: 'Kenneth Lim',
      rating: 4,
      comment: 'Bass slider is insane. For podcasts I turn the bass slider to minimum and dialogue sounds crystal clear.',
      date: 'Sep 19, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-10',
      productId: 'bose-crusher-evo',
      authorName: 'Rachel Green',
      rating: 3,
      comment: 'Heavy bass is fun for gaming, but a bit too bulky for outdoor workouts.',
      date: 'Sep 10, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-11',
      productId: 'bose-crusher-evo',
      authorName: 'Liam Murphy',
      rating: 1,
      comment: 'Too bass heavy for my taste. Even on minimum settings the low frequencies are pronounced.',
      date: 'Aug 24, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-12',
      productId: 'sony-ath-m50x',
      authorName: 'Julian Ramirez',
      rating: 5,
      comment: 'Studio monitor grade accuracy. The flat response curve gives you true master fidelity.',
      date: 'Sep 25, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-13',
      productId: 'sony-ath-m50x',
      authorName: 'Claire Vance',
      rating: 5,
      comment: 'Replaced my old cans with this. Zero latency and super crisp highs. Worth every peso.',
      date: 'Sep 18, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-14',
      productId: 'sony-ath-m50x',
      authorName: 'Brian Lee',
      rating: 4,
      comment: 'Outstanding clarity for audio mixing. Earpads can get slightly warm during long mixing sessions.',
      date: 'Sep 14, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-15',
      productId: 'apple-airpods-max',
      authorName: 'Dominic Cruz',
      rating: 5,
      comment: 'The spatial audio with Apple ecosystem is magic. Transparency mode feels like you are not wearing anything.',
      date: 'Sep 20, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-16',
      productId: 'apple-airpods-max',
      authorName: 'Hannah Kim',
      rating: 4,
      comment: 'Flawless aluminum construction. Heavy on the head at first, but the knit mesh canopy balances it well.',
      date: 'Sep 15, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-17',
      productId: 'apple-airpods-max',
      authorName: 'Jerome Castillo',
      rating: 1,
      comment: 'Smart case provides very little protection. Headphones sound sublime though.',
      date: 'Sep 02, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-18',
      productId: 'apple-airpods-pro',
      authorName: 'Maya Aquino',
      rating: 5,
      comment: 'The noise cancellation blocks out plane engine rumble completely. Compact case with speaker is super handy.',
      date: 'Sep 22, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-19',
      productId: 'sony-wf1000xm5',
      authorName: 'Vincent Sy',
      rating: 5,
      comment: 'Tiny form factor yet monumental sound. Sony really perfected the noise cancellation algorithm.',
      date: 'Sep 23, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-20',
      productId: 'jbl-flip-6',
      authorName: 'Rico Gomez',
      rating: 5,
      comment: 'Took it to the beach and it survived sand, splashes, and 8 hours of loud tunes with zero issues!',
      date: 'Sep 19, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-21',
      productId: 'bose-soundlink-flex',
      authorName: 'Tristan Flores',
      rating: 5,
      comment: 'PositionIQ adjusts the EQ whether sitting upright or lying on its back. Outstanding engineering.',
      date: 'Sep 21, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-22',
      productId: 'shure-sm7b',
      authorName: 'Marcus Vance',
      rating: 5,
      comment: 'The gold standard for voiceover and podcasting. Warm, intimate vocal presence with zero plosive issues.',
      date: 'Oct 02, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-23',
      productId: 'shure-sm7b',
      authorName: 'Danielle Brooks',
      rating: 5,
      comment: 'Pair it with a decent preamp or interface like a Cloudlifter and it sounds like broadcast television.',
      date: 'Sep 28, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-24',
      productId: 'rode-podmic',
      authorName: 'Liam O\'Connor',
      rating: 5,
      comment: 'Unbeatable build quality for under $100. Heavy all-metal body and crisp vocal clarity out of the box.',
      date: 'Oct 01, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-25',
      productId: 'blue-yeti-x',
      authorName: 'Kelsey Reed',
      rating: 5,
      comment: 'The LED volume meter is super helpful during live streams to avoid clipping. Clear pickup.',
      date: 'Sep 30, 2026',
      verifiedPurchase: true
    },
    {
      id: 'rev-26',
      productId: 'audio-technica-at2020',
      authorName: 'Gabriel Santos',
      rating: 5,
      comment: 'Crisp condenser clarity. Captures acoustic guitar and vocals with wonderful high-end sheen.',
      date: 'Sep 29, 2026',
      verifiedPurchase: true
    }
  ]);

  getReviewsByProduct(productId: string): Review[] {
    return this.reviews().filter(r => r.productId === productId);
  }

  getTopReviews(productId: string, limit: number = 3): Review[] {
    return this.getReviewsByProduct(productId).slice(0, limit);
  }

  getStarCounts(productId: string): Record<number, number> {
    const list = this.getReviewsByProduct(productId);
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    for (const r of list) {
      if (counts[r.rating] !== undefined) {
        counts[r.rating]++;
      }
    }
    return counts;
  }

  getAverageRating(productId: string): { average: number; count: number } {
    const list = this.getReviewsByProduct(productId);
    if (!list.length) {
      return { average: 5.0, count: 0 };
    }
    const sum = list.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = Number((sum / list.length).toFixed(1));
    return { average: avg, count: list.length };
  }

  addReview(data: { productId: string; authorName: string; rating: number; comment: string }): Review {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: data.productId,
      authorName: data.authorName.trim() || 'Verified Customer',
      rating: data.rating,
      comment: data.comment.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      verifiedPurchase: true
    };

    this.reviews.update(prev => [newReview, ...prev]);
    return newReview;
  }
}
