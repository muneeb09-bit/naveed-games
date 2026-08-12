import {
  Truck,
  ShieldCheck,
  WhatsappLogo,
  Certificate,
} from '@phosphor-icons/react/dist/ssr';

export function ServiceStrip() {
  const services = [
    {
      icon: <Truck size={28} weight="bold" />,
      label: 'Fast Delivery',
      desc: 'Across Pakistan',
    },
    {
      icon: <ShieldCheck size={28} weight="bold" />,
      label: 'Genuine Products',
      desc: '100% Authentic',
    },
    {
      icon: <Certificate size={28} weight="bold" />,
      label: 'Warranty',
      desc: 'Official Coverage',
    },
    {
      icon: <WhatsappLogo size={28} weight="fill" />,
      label: 'WhatsApp Support',
      desc: 'Quick Response',
    },
  ];

  return (
    <section id="services">
      <div className="service-strip">
        {services.map((service) => (
          <div key={service.label} className="service-strip__item">
            <span className="service-strip__icon">{service.icon}</span>
            <span className="service-strip__label">{service.label}</span>
            <span className="service-strip__desc">{service.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
