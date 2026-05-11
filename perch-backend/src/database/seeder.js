/**
 * Database Seeder — Seeds initial PERCH data
 * Usage: node src/database/seeder.js
 *        node src/database/seeder.js --destroy
 */

require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const User = require('../models/User.model');
const Business = require('../models/Business.model');
const Service = require('../models/Service.model');
const Testimonial = require('../models/Testimonial.model');
const FAQ = require('../models/FAQ.model');
const SEO = require('../models/SEO.model');
const Settings = require('../models/Settings.model');

const seedData = {
  user: {
    name: 'PERCH Admin',
    email: process.env.ADMIN_EMAIL || 'admin@perchbar.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@1234',
    role: 'superadmin',
    isEmailVerified: true,
    isActive: true,
  },

  business: {
    name: 'PERCH Wine & Coffee Bar',
    tagline: 'Elevated Sips, Intimate Moments',
    description: 'PERCH is a premium wine and coffee bar offering an intimate atmosphere, expertly curated wines, and artisan coffee in the heart of the city.',
    shortDescription: 'Premium wine & coffee bar with an elevated, intimate atmosphere.',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'hello@perchbar.com',
    },
    address: {
      street: '123 Elevated Ave',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'USA',
    },
    businessHours: [
      { day: 'Monday', closed: true },
      { day: 'Tuesday', open: '4:00 PM', close: '11:00 PM' },
      { day: 'Wednesday', open: '4:00 PM', close: '11:00 PM' },
      { day: 'Thursday', open: '4:00 PM', close: '12:00 AM' },
      { day: 'Friday', open: '3:00 PM', close: '1:00 AM' },
      { day: 'Saturday', open: '2:00 PM', close: '1:00 AM' },
      { day: 'Sunday', open: '2:00 PM', close: '10:00 PM' },
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/perchwinebar', icon: 'instagram' },
      { platform: 'facebook', url: 'https://facebook.com/perchwinebar', icon: 'facebook' },
    ],
    established: 2019,
    isActive: true,
  },

  services: [
    {
      title: 'Wine Tastings',
      description: 'Explore our curated selection of old and new world wines guided by our sommelier. From light-bodied whites to bold reds, discover your next favorite bottle.',
      shortDescription: 'Guided wine tastings with our expert sommelier.',
      category: 'wine',
      icon: 'wine',
      isFeatured: true,
      order: 1,
      highlights: ['Curated wine flights', 'Sommelier-guided sessions', 'Old & New World selections'],
    },
    {
      title: 'Artisan Coffee',
      description: 'Start your day or wind down your evening with our specialty coffee program. Sourced from single-origin farms, brewed to perfection by our baristas.',
      shortDescription: 'Single-origin specialty coffee crafted by expert baristas.',
      category: 'coffee',
      icon: 'coffee',
      isFeatured: true,
      order: 2,
      highlights: ['Single-origin beans', 'Expert baristas', 'Seasonal specials'],
    },
    {
      title: 'Private Events',
      description: 'Host your next celebration in our intimate private space. Perfect for corporate gatherings, birthday parties, and intimate dinners.',
      shortDescription: 'Exclusive private venue for your special occasions.',
      category: 'private',
      icon: 'calendar',
      isFeatured: true,
      order: 3,
      highlights: ['Up to 40 guests', 'Customizable menu', 'Dedicated event coordinator'],
    },
    {
      title: 'Small Plates & Bites',
      description: 'Thoughtfully crafted small plates designed to complement your wine or coffee. Our kitchen uses locally sourced, seasonal ingredients.',
      shortDescription: 'Locally sourced small plates to complement your drinks.',
      category: 'food',
      icon: 'utensils',
      isFeatured: false,
      order: 4,
      highlights: ['Seasonal menu', 'Local ingredients', 'Perfect pairings'],
    },
  ],

  testimonials: [
    {
      author: 'Sarah M.',
      role: 'Wine Enthusiast',
      content: 'PERCH is my absolute favorite spot in the city. The wine selection is thoughtfully curated and the atmosphere is unmatched. Every visit feels like a special occasion.',
      rating: 5,
      source: 'google',
      isFeatured: true,
      order: 1,
    },
    {
      author: 'James L.',
      role: 'Food Blogger',
      content: "The small plates are divine and the coffee program is world-class. I've been to many wine bars but PERCH stands out for its attention to detail and warm hospitality.",
      rating: 5,
      source: 'yelp',
      isFeatured: true,
      order: 2,
    },
    {
      author: 'Priya K.',
      role: 'Event Planner',
      content: "We hosted a private event at PERCH and it was flawless from start to finish. The team was incredibly accommodating and the space transformed beautifully. Highly recommend.",
      rating: 5,
      source: 'direct',
      isFeatured: true,
      order: 3,
    },
  ],

  faqs: [
    {
      question: 'Do you accept walk-ins?',
      answer: 'Yes! We welcome walk-ins based on availability. However, we highly recommend making a reservation, especially on weekends, to guarantee your spot.',
      category: 'reservations',
      order: 1,
      isActive: true,
    },
    {
      question: 'Do you have a corkage fee?',
      answer: 'We have an extensive wine list, but if you\'d like to bring your own special bottle, our corkage fee is $25 per bottle (limit 2 bottles per table).',
      category: 'menu',
      order: 2,
      isActive: true,
    },
    {
      question: 'Can you accommodate dietary restrictions?',
      answer: 'Absolutely. Our kitchen can accommodate most dietary needs including vegan, vegetarian, gluten-free, and nut-free options. Please inform your server of any restrictions.',
      category: 'menu',
      order: 3,
      isActive: true,
    },
    {
      question: 'What is your private event capacity?',
      answer: 'Our private event space accommodates up to 40 guests for a seated dinner or up to 60 guests for a standing cocktail event. Contact us for customized packages.',
      category: 'events',
      order: 4,
      isActive: true,
    },
    {
      question: 'Is there parking nearby?',
      answer: 'There is a public parking garage one block away on Main Street. Street parking is also available, though it can be limited on weekends. We recommend using rideshare services.',
      category: 'general',
      order: 5,
      isActive: true,
    },
  ],

  seoPages: [
    {
      page: 'home',
      metaTitle: 'PERCH Wine & Coffee Bar | Elevated Sips, Intimate Moments',
      metaDescription: 'PERCH is a premium wine and coffee bar offering curated wines, artisan coffee, and small plates in an intimate San Francisco atmosphere.',
      keywords: ['wine bar', 'coffee bar', 'San Francisco', 'wine tasting', 'specialty coffee'],
      ogType: 'website',
    },
    {
      page: 'gallery',
      metaTitle: 'Gallery | PERCH Wine & Coffee Bar',
      metaDescription: 'Explore the beautiful ambiance, curated wine selection, and artisan coffee offerings at PERCH Wine & Coffee Bar.',
      keywords: ['wine bar gallery', 'PERCH photos', 'San Francisco wine bar'],
    },
    {
      page: 'contact',
      metaTitle: 'Contact & Reservations | PERCH Wine & Coffee Bar',
      metaDescription: 'Reserve your table or contact PERCH Wine & Coffee Bar for inquiries, private events, and reservations.',
      keywords: ['PERCH reservations', 'wine bar contact', 'private events San Francisco'],
    },
  ],

  settings: [
    { key: 'maintenance_mode', value: false, group: 'general', isPublic: true, description: 'Enable maintenance mode' },
    { key: 'booking_enabled', value: true, group: 'features', isPublic: true, description: 'Enable online bookings' },
    { key: 'newsletter_enabled', value: true, group: 'features', isPublic: true, description: 'Enable newsletter subscriptions' },
    { key: 'max_party_size', value: 20, group: 'general', isPublic: true, description: 'Maximum party size for online bookings' },
    { key: 'advance_booking_days', value: 60, group: 'general', isPublic: true, description: 'How many days in advance bookings can be made' },
    { key: 'google_analytics_id', value: '', group: 'advanced', isPublic: false, description: 'Google Analytics tracking ID' },
  ],
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/perch_bar');
    logger.info('Connected to MongoDB for seeding...');

    if (process.argv.includes('--destroy')) {
      await Promise.all([
        User.deleteMany({}),
        Business.deleteMany({}),
        Service.deleteMany({}),
        Testimonial.deleteMany({}),
        FAQ.deleteMany({}),
        SEO.deleteMany({}),
        Settings.deleteMany({}),
      ]);
      logger.info('💥 Database cleared');
      process.exit(0);
    }

    // Seed superadmin
    const existingAdmin = await User.findOne({ email: seedData.user.email });
    if (!existingAdmin) {
      await User.create(seedData.user);
      logger.info(`✅ Admin user created: ${seedData.user.email}`);
    } else {
      logger.info('⏭️  Admin user already exists');
    }

    // Seed business
    const existingBusiness = await Business.findOne({});
    if (!existingBusiness) {
      await Business.create(seedData.business);
      logger.info('✅ Business seeded');
    } else {
      logger.info('⏭️  Business already exists');
    }

    // Seed services
    const serviceCount = await Service.countDocuments({}).setOptions({ includeDeleted: true });
    if (serviceCount === 0) {
      await Service.insertMany(seedData.services);
      logger.info(`✅ ${seedData.services.length} services seeded`);
    } else {
      logger.info('⏭️  Services already exist');
    }

    // Seed testimonials
    const tCount = await Testimonial.countDocuments({}).setOptions({ includeDeleted: true });
    if (tCount === 0) {
      await Testimonial.insertMany(seedData.testimonials);
      logger.info(`✅ ${seedData.testimonials.length} testimonials seeded`);
    } else {
      logger.info('⏭️  Testimonials already exist');
    }

    // Seed FAQs
    const faqCount = await FAQ.countDocuments({}).setOptions({ includeDeleted: true });
    if (faqCount === 0) {
      await FAQ.insertMany(seedData.faqs);
      logger.info(`✅ ${seedData.faqs.length} FAQs seeded`);
    } else {
      logger.info('⏭️  FAQs already exist');
    }

    // Seed SEO pages
    for (const seoPage of seedData.seoPages) {
      await SEO.findOneAndUpdate({ page: seoPage.page }, seoPage, { upsert: true, new: true });
    }
    logger.info(`✅ ${seedData.seoPages.length} SEO pages seeded`);

    // Seed settings
    for (const setting of seedData.settings) {
      await Settings.set(setting.key, setting.value, {
        group: setting.group,
        isPublic: setting.isPublic,
        description: setting.description,
      });
    }
    logger.info(`✅ ${seedData.settings.length} settings seeded`);

    logger.info('\n🌱 Seeding complete! PERCH database is ready.');
    process.exit(0);
  } catch (err) {
    logger.error('Seeding failed:', err);
    process.exit(1);
  }
};

seed();
