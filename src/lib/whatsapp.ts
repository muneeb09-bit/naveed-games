import type { CartItem } from '@/types';

const WHATSAPP_NUMBER = '923339348891';

interface WhatsAppOrderData {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  notes?: string;
}

/**
 * Generate a pre-filled WhatsApp URL with order details
 */
export function generateWhatsAppOrderUrl(data: WhatsAppOrderData): string {
  const itemLines = data.items
    .map(
      (item, i) =>
        `${i + 1}. ${item.product.name} × ${item.quantity} — Rs. ${(item.product.price * item.quantity).toLocaleString('en-PK')}`
    )
    .join('\n');

  const message = `🎮 *NAVEED GAMES — New Order*

*Order #${data.orderNumber}*

━━━━━━━━━━━━━━━━
*Items:*
${itemLines}
━━━━━━━━━━━━━━━━

Subtotal: Rs. ${data.subtotal.toLocaleString('en-PK')}
Delivery: ${data.deliveryFee === 0 ? 'Free' : `Rs. ${data.deliveryFee.toLocaleString('en-PK')}`}
*Total: Rs. ${data.total.toLocaleString('en-PK')}*

━━━━━━━━━━━━━━━━
*Customer:*
Name: ${data.customerName}
Phone: ${data.customerPhone}
City: ${data.customerCity}
Address: ${data.customerAddress}
${data.notes ? `Notes: ${data.notes}` : ''}
━━━━━━━━━━━━━━━━
Payment: Cash on Delivery`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Generate a simple product inquiry WhatsApp URL
 */
export function generateWhatsAppProductUrl(productName: string, sku: string): string {
  const message = `Hi, I'm interested in:\n\n*${productName}*\nSKU: ${sku}\n\nIs this available? Can you share the latest price?`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * WhatsApp contact URL
 */
export function getWhatsAppContactUrl(): string {
  return `https://wa.me/${WHATSAPP_NUMBER}`;
}
