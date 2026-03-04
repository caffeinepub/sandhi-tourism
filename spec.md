# Sandhi Tourism

## Current State
Full bilingual (EN/Gujarati) Islamic travel website with hero, services, booking widget, testimonials, about, and footer. Previous build failed to deploy due to a build error.

## Requested Changes (Diff)

### Add
- WhatsApp floating button (bottom-right, green pulsing) linking to wa.me/919099786906
- WhatsApp link in footer contact section

### Modify
- Booking form: all input/textarea fields must have white background + black text (not dark/transparent bg)
- Ensure inputs are clearly visible with proper contrast

### Remove
- Nothing

## Implementation Plan
1. Fix BookingWidget: change all Input and Textarea fields to have `bg-white text-gray-900` styling, remove dark bg overrides that cause invisible text
2. Add WhatsApp floating button in App.tsx (fixed bottom-right)
3. Add WhatsApp link in Footer contact section
4. Ensure all spacing and color consistency is maintained
