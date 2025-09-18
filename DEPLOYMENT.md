# SQE Forge - Vercel Deployment Guide

## 🚀 Quick Deployment

### Prerequisites
- Node.js 18+ installed
- Vercel CLI installed (`npm i -g vercel`)
- Git repository connected to Vercel

### 1. Environment Variables

Copy `env.example` to `.env.local` and fill in your values:

```bash
cp env.example .env.local
```

**Required Environment Variables:**
- `OPENAI_API_KEY` - For AI Assistant functionality
- `STRIPE_SECRET_KEY` - For payment processing
- `STRIPE_WEBHOOK_SECRET` - For Stripe webhooks
- `NEXTAUTH_SECRET` - For authentication (generate with `openssl rand -base64 32`)

### 2. Vercel Configuration

The project includes optimized Vercel configuration:
- `vercel.json` - Deployment settings
- `next.config.mjs` - Next.js optimizations
- `.vercelignore` - Files to exclude from deployment

### 3. Deploy to Vercel

#### Option A: Automatic Deployment (Recommended)
1. Connect your GitHub repo to Vercel
2. Push to main branch
3. Vercel auto-deploys

#### Option B: Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 4. Post-Deployment Setup

1. **Domain Configuration**
   - Add custom domain in Vercel dashboard
   - Update `NEXT_PUBLIC_BASE_URL` environment variable

2. **Webhook Endpoints**
   - Stripe: `https://yourdomain.com/api/stripe-webhook`
   - PayPal: Configure in PayPal Developer Console
   - GoCardless: Configure in GoCardless Dashboard

3. **Analytics**
   - Vercel Analytics is automatically enabled
   - View analytics in Vercel dashboard

## 🔧 Build Optimizations

The project includes several optimizations for Vercel:

- **Bundle Analysis**: Optimized imports for smaller bundles
- **Image Optimization**: WebP/AVIF support with remote patterns
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Dead code elimination
- **Compression**: Automatic gzip/brotli compression

## 📊 Performance Features

- **Edge Runtime**: API routes optimized for edge
- **Static Generation**: Pre-rendered pages where possible
- **Incremental Static Regeneration**: Dynamic content with caching
- **Vercel Analytics**: Built-in performance monitoring

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Run build locally
npm run build
```

### Environment Variables
- Ensure all required variables are set in Vercel dashboard
- Use different values for production vs preview deployments
- Stripe: Use live keys for production, test keys for preview

### Memory Issues
If you encounter memory issues during build:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## 📈 Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Console errors are logged
- **Build Logs**: Available in Vercel dashboard
- **Function Logs**: API route logs in Vercel

## 🔒 Security

- **Environment Variables**: Stored securely in Vercel
- **HTTPS**: Automatic SSL certificates
- **Headers**: Security headers configured
- **CORS**: Properly configured for API routes

## 📝 Deployment Checklist

- [ ] Environment variables configured
- [ ] Domain connected and DNS configured
- [ ] Stripe webhooks configured
- [ ] PayPal/GoCardless webhooks configured
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Performance monitoring enabled
- [ ] SSL certificate active
- [ ] Custom domain working
- [ ] API routes responding correctly

## 🚀 Go Live Steps

1. **Test in Preview Environment**
   ```bash
   vercel
   ```

2. **Deploy to Production**
   ```bash
   vercel --prod
   ```

3. **Verify All Features**
   - User registration/login
   - Payment processing
   - Mock exams functionality
   - AI Assistant
   - All navigation works

4. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor error rates
   - Test load times

Your SQE Forge platform is now ready for production! 🎉
