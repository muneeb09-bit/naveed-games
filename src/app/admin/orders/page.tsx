'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/data/products';
import { createClient } from '@/lib/supabase/client';
import { WhatsappLogo, Printer, X, ShieldCheck, Truck, Storefront } from '@phosphor-icons/react';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  items: string;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

const initialOrders: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'NG-M101-A48',
    customerName: 'Kashif Khan',
    customerPhone: '+92 333 1234567',
    city: 'Peshawar',
    address: 'House 14, Sector F-3, Phase 6, Hayatabad, Peshawar',
    items: 'PlayStation 5 Pro Console × 1',
    total: 249999,
    status: 'pending',
    date: '2 hours ago',
  },
  {
    id: 'ord-102',
    orderNumber: 'NG-M102-B72',
    customerName: 'Tariq Mahmood',
    customerPhone: '+92 312 9876543',
    city: 'Islamabad',
    address: 'Street 45, Sector F-8/1, Islamabad',
    items: 'DJI Mini 4 Pro Drone (Fly More Combo) × 1',
    total: 314999,
    status: 'confirmed',
    date: '5 hours ago',
  },
  {
    id: 'ord-103',
    orderNumber: 'NG-M103-C19',
    customerName: 'Bilal Ahmed',
    customerPhone: '+92 300 4567890',
    city: 'Lahore',
    address: 'Block C, Model Town, Lahore',
    items: 'Meta Quest 3 (512GB) × 1',
    total: 174999,
    status: 'shipped',
    date: '1 day ago',
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [filter, setFilter] = useState<string>('all');
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const supabase = createClient();
        if (!supabase) return;

        const { data: dbOrders, error } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .order('created_at', { ascending: false });

        if (!error && dbOrders && dbOrders.length > 0) {
          const mappedOrders: Order[] = dbOrders.map((o: any) => {
            const itemNames = (o.order_items || [])
              .map((item: any) => `${item.product_name} × ${item.quantity}`)
              .join(', ');

            const createdDate = new Date(o.created_at);
            const formattedDate = isNaN(createdDate.getTime())
              ? 'Recently'
              : createdDate.toLocaleDateString('en-PK', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                });

            return {
              id: o.id,
              orderNumber: o.order_number,
              customerName: o.customer_name,
              customerPhone: o.customer_phone,
              city: o.customer_city || 'Peshawar',
              address: o.customer_address,
              items: itemNames || 'Store Items',
              total: Number(o.total),
              status: o.status || 'pending',
              date: formattedDate,
            };
          });

          setOrders([...mappedOrders, ...initialOrders]);
        }
      } catch (err) {
        console.warn('Could not fetch Supabase orders:', err);
      }
    }

    loadOrders();
  }, []);

  const filteredOrders = orders.filter(
    (o) => filter === 'all' || o.status === filter
  );

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    try {
      const supabase = createClient();
      if (supabase && orderId.length > 15) {
        await supabase
          .from('orders')
          .update({ status: newStatus })
          .eq('id', orderId);
      }
    } catch (err) {
      console.warn('Order status update warning:', err);
    }
  };

  const getWhatsAppNotifyUrl = (order: Order) => {
    const message = `Hello ${order.customerName},\n\nThis is Naveed Games, Karkhano Market, Peshawar regarding your Order #${order.orderNumber}.\nStatus Update: *${order.status.toUpperCase()}*.\nTotal Payable (Cash on Delivery): ${formatPrice(order.total)}\n\nThank you for choosing Naveed Games!`;
    return `https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  const printWaybill = () => {
    window.print();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.02em', color: 'var(--white)' }}>
          Order Fulfillment & Logistics
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '4px' }}>
          Process, confirm, print courier waybills, and notify customer orders via WhatsApp
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '24px',
        }}
      >
        {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              type="button"
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: '1px solid var(--graphite-border)',
                background: filter === status ? 'var(--white)' : 'var(--bg-secondary)',
                color: filter === status ? 'var(--black)' : 'var(--muted-light)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                cursor: 'pointer',
              }}
            >
              {status} ({status === 'all' ? orders.length : orders.filter((o) => o.status === status).length})
            </button>
          )
        )}
      </div>

      {/* Orders Table */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--muted)', textTransform: 'uppercase', fontSize: '0.6875rem', letterSpacing: '0.06em' }}>
                <th style={{ padding: '14px 20px' }}>Order #</th>
                <th style={{ padding: '14px 20px' }}>Customer Details</th>
                <th style={{ padding: '14px 20px' }}>Items</th>
                <th style={{ padding: '14px 20px' }}>COD Total</th>
                <th style={{ padding: '14px 20px' }}>Status</th>
                <th style={{ padding: '14px 20px' }}>Logistics & Notify</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--white)' }}>
                    #{o.orderNumber}
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 400 }}>{o.date}</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--white)' }}>{o.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{o.customerPhone}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted-light)', maxWidth: '200px' }}>{o.address}</div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--muted-light)', maxWidth: '240px' }}>
                    {o.items}
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--white)' }}>
                    {formatPrice(o.total)}
                    <div style={{ fontSize: '0.6875rem', color: 'var(--success)' }}>Cash on Delivery</div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <select
                      className="checkout__input"
                      style={{ padding: '4px 8px', fontSize: '0.75rem', fontWeight: 600, height: '36px' }}
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value as Order['status'])}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => setPrintingOrder(o)}
                        className="button button--secondary"
                        style={{ height: '32px', padding: '0 10px', fontSize: '0.6875rem' }}
                        title="Print Courier Shipping Label"
                      >
                        <Printer size={14} weight="bold" />
                        Waybill
                      </button>

                      <a
                        href={getWhatsAppNotifyUrl(o)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button--whatsapp"
                        style={{ height: '32px', padding: '0 10px', fontSize: '0.6875rem' }}
                      >
                        <WhatsappLogo size={14} weight="fill" />
                        Notify
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Courier Waybill / Thermal Packing Slip Modal */}
      {printingOrder && (
        <div className="waybill-modal-overlay" onClick={() => setPrintingOrder(null)}>
          <div className="waybill-modal" onClick={(e) => e.stopPropagation()}>
            <div className="waybill-modal__header">
              <h3>Courier Dispatch Waybill & Thermal Slip</h3>
              <button
                type="button"
                onClick={() => setPrintingOrder(null)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Printable Area */}
            <div className="waybill-slip printable-document">
              <div className="waybill-slip__brand-header">
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900 }}>NAVEED GAMES</h2>
                  <span style={{ fontSize: '0.75rem', color: '#555' }}>
                    Shop #12, Block A, Karkhano Market, Peshawar | +92 333 9348891
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '1rem', color: '#000' }}>#{printingOrder.orderNumber}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#555' }}>CASH ON DELIVERY</div>
                </div>
              </div>

              <hr style={{ margin: '12px 0', borderColor: '#ccc' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.8125rem' }}>
                <div>
                  <strong style={{ display: 'block', color: '#333' }}>CONSIGNEE (SHIP TO):</strong>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, marginTop: '2px' }}>{printingOrder.customerName}</div>
                  <div>{printingOrder.customerPhone}</div>
                  <div style={{ marginTop: '4px', lineHeight: 1.4 }}>{printingOrder.address}</div>
                  <div style={{ fontWeight: 700, marginTop: '2px' }}>{printingOrder.city}, Pakistan</div>
                </div>

                <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                  <strong style={{ display: 'block', color: '#333' }}>PAYMENT SUMMARY:</strong>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span>Payment Mode:</span>
                    <strong>Cash on Delivery (COD)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '1rem', fontWeight: 900 }}>
                    <span>Amount to Collect:</span>
                    <span>{formatPrice(printingOrder.total)}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '16px', border: '1px solid #ddd', borderRadius: '4px', padding: '8px 12px' }}>
                <strong style={{ fontSize: '0.75rem', color: '#555', textTransform: 'uppercase' }}>Items Description:</strong>
                <div style={{ marginTop: '4px', fontWeight: 600, fontSize: '0.875rem' }}>{printingOrder.items}</div>
              </div>

              <div style={{ marginTop: '16px', fontSize: '0.6875rem', color: '#666', borderTop: '1px dashed #ccc', paddingTop: '8px' }}>
                🛡️ Customer Inspection Permitted. Please verify security seals before handover.
              </div>
            </div>

            <div className="waybill-modal__footer">
              <button
                type="button"
                className="button button--primary"
                onClick={printWaybill}
              >
                <Printer size={16} weight="bold" />
                Print Shipping Label / Invoice
              </button>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setPrintingOrder(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
