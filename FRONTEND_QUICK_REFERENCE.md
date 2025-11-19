# MedSecure24 Frontend - Quick Reference Card

## 🚀 Quick Start
```bash
npm run dev  # Start development server
# Visit http://localhost:3000
```

---

## 📁 Key Files Changed

| File | What Changed |
|------|-------------|
| `app/page.tsx` | Homepage with hero section |
| `app/dashboard/page.tsx` | Dashboard with stats |
| `app/simulator/page.tsx` | Simulator controls |
| `app/layout.tsx` | Theme provider setup |
| `app/globals.css` | Custom animations |
| `components/main-header.tsx` | NEW: Navigation header |

---

## 🎨 Color Shortcuts

### Buttons
```tsx
// Primary action
<Button className="bg-blue-600 hover:bg-blue-700">Action</Button>

// Secondary action
<Button className="bg-cyan-600 hover:bg-cyan-700">Secondary</Button>

// Danger action
<Button className="bg-red-600 hover:bg-red-700">Delete</Button>
```

### Alerts
```tsx
// Success
className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"

// Error
className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"

// Info
className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
```

### Backgrounds
```tsx
// Page background
className="bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"

// Card background
className="bg-white dark:bg-slate-800"

// Muted background
className="bg-slate-100 dark:bg-slate-700"
```

---

## ✨ Animation Shortcuts

### Entrance Animations
```tsx
// Fade in
className="animate-in fade-in duration-500"

// Slide up
className="animate-in slide-in-from-bottom-4 duration-700"

// Slide down
className="animate-in slide-in-from-top-2 duration-500"
```

### Continuous Animations
```tsx
// Pulsing
className="animate-pulse"

// Glow
className="animate-glow"

// Slow pulse
className="animate-pulse-slow"
```

### Hover Animations
```tsx
// Scale
className="hover:scale-110 transition-transform duration-300"

// Shadow
className="hover:shadow-xl transition-shadow duration-300"

// Color change
className="hover:bg-blue-700 transition-colors duration-300"
```

---

## 📐 Layout Patterns

### Responsive Grid
```tsx
// 1 col mobile, 2 cols tablet, 3 cols desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"

// 1 col mobile, 4 cols desktop
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
```

### Responsive Text
```tsx
// Small on mobile, larger on desktop
className="text-2xl md:text-3xl lg:text-4xl font-bold"

// Mobile first padding
className="p-4 md:p-6 lg:p-8"
```

### Flex Patterns
```tsx
// Stack mobile, row desktop
className="flex flex-col md:flex-row gap-4"

// Center items
className="flex items-center justify-center"

// Space between
className="flex items-center justify-between"
```

---

## 🧩 Common Components

### Header
```tsx
import { MainHeader } from "@/components/main-header"

<MainHeader />
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Button
```tsx
import { Button } from "@/components/ui/button"

<Button>Click me</Button>
<Button variant="ghost">Ghost</Button>
<Button size="lg">Large</Button>
```

### Icons
```tsx
import { Activity, AlertCircle, Check, X } from "lucide-react"

<Activity className="w-5 h-5 text-blue-600" />
```

---

## 🎯 Best Practices Checklist

- [ ] Always include `dark:` variants for colors
- [ ] Use responsive classes for layouts
- [ ] Add `transition-*` when changing styles on hover
- [ ] Include animations with `duration-*` classes
- [ ] Use semantic HTML (header, main, nav, etc.)
- [ ] Add alt text to images
- [ ] Keep color contrast >= 4.5:1
- [ ] Test on mobile devices
- [ ] Test in dark mode
- [ ] Run Lighthouse audit

---

## 🐛 Common Issues & Fixes

### Dark mode not working
```tsx
// Add to layout.tsx
<html lang="en" suppressHydrationWarning>
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
</html>
```

### Animation jittery
```tsx
// Add GPU acceleration
className="animate-pulse will-change-opacity"
```

### Focus ring not visible
```tsx
// Add explicit focus styling
className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
```

### Mobile menu not closing
```tsx
// Click handler
onClick={() => setIsOpen(false)}
```

---

## 📊 Spacing Scale

```
0   = 0px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
6   = 24px
8   = 32px
12  = 48px
16  = 64px
```

**Usage:** `p-4` = 16px padding, `gap-2` = 8px gap, etc.

---

## 🔤 Typography Scale

```
xs  = 12px
sm  = 14px
base = 16px
lg  = 18px
xl  = 20px
2xl = 24px
3xl = 30px
4xl = 36px
5xl = 48px
6xl = 60px
```

**Usage:** `text-lg font-semibold` = 18px, semibold weight

---

## 🎨 Shadow Scale

```
sm  = 0 1px 2px 0 rgb(0 0 0 / 0.05)
base = 0 1px 3px 0 rgb(0 0 0 / 0.1)
md  = 0 4px 6px -1px rgb(0 0 0 / 0.1)
lg  = 0 10px 15px -3px rgb(0 0 0 / 0.1)
xl  = 0 20px 25px -5px rgb(0 0 0 / 0.1)
2xl = 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

**Usage:** `shadow-lg` for cards, `hover:shadow-xl` for hover

---

## 📱 Breakpoint Guide

```
sm  = 640px
md  = 768px   ← Most common breakpoint
lg  = 1024px
xl  = 1280px
2xl = 1536px
```

**Usage Pattern:**
```tsx
className="w-full md:w-1/2 lg:w-1/3"
// Full width on mobile, 50% on tablet, 33% on desktop
```

---

## 🎭 Dark Mode Classes

```tsx
// Standard pattern
className="bg-white dark:bg-slate-800"
className="text-slate-900 dark:text-white"
className="border-slate-200 dark:border-slate-700"

// With opacity
className="dark:bg-slate-900/30"
className="dark:text-slate-300/75"
```

---

## 🔗 External Resources

- [Tailwind Docs](https://tailwindcss.com)
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)
- [Lucide Icons](https://lucide.dev)
- [Next.js Docs](https://nextjs.org/docs)

---

## 📋 File Structure

```
MedSecure24/
├── app/
│   ├── page.tsx           ← Homepage
│   ├── dashboard/page.tsx ← Dashboard
│   ├── simulator/page.tsx ← Simulator
│   ├── layout.tsx         ← Root layout
│   └── globals.css        ← Global styles
├── components/
│   ├── main-header.tsx    ← NEW: Navigation
│   ├── dashboard/         ← Dashboard components
│   ├── simulator/         ← Simulator components
│   └── ui/                ← UI components
└── public/                ← Static files
```

---

## 🚦 Quick Deployment

```bash
# Test locally
npm run build
npm start

# Deploy to Vercel
git add .
git commit -m "Frontend enhancements"
git push origin main

# Or deploy to other hosting:
# 1. Build: npm run build
# 2. Output: .next directory
# 3. Upload to your host
```

---

## 📊 Before & After Metrics

| Metric | Before | After |
|--------|--------|-------|
| Animations | None | 5+ custom |
| Dark Mode | None | Full support |
| Mobile Menu | None | Responsive |
| Shadows | None | Elevation system |
| Hover Effects | Basic | Rich interactions |
| Color System | Limited | Complete palette |
| Responsive | Basic | Full breakpoints |

---

## 🎓 Learning Path

1. **Start here:** Read `FRONTEND_SUMMARY.md`
2. **Visual guide:** Check `FRONTEND_VISUAL_GUIDE.md`
3. **Implementation:** Follow `FRONTEND_IMPLEMENTATION_GUIDE.md`
4. **Reference:** Use this Quick Reference Card
5. **Code:** Check component files for examples

---

## 🆘 Getting Help

1. **Component issue?** → Check `components/` directory
2. **Styling question?** → See `app/globals.css`
3. **Layout problem?** → Review page files
4. **Dark mode issue?** → Check `app/layout.tsx`
5. **Animation question?** → See `FRONTEND_IMPLEMENTATION_GUIDE.md`

---

## ✅ Testing Checklist

Before deploying:
- [ ] Test on mobile (use DevTools)
- [ ] Test dark mode toggle
- [ ] Check all animations work
- [ ] Verify responsive layout
- [ ] Test all interactive elements
- [ ] Run Lighthouse audit
- [ ] Check console for errors
- [ ] Test form submissions
- [ ] Verify API calls work
- [ ] Check images load correctly

---

## 🎉 You're Ready!

Your MedSecure24 frontend is now modern and professional. Use this quick reference card to:
- Find colors quickly
- Copy common patterns
- Remember breakpoints
- Fix common issues

**Happy coding!** 🚀
