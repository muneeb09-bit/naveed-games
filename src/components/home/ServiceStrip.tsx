import {
  Truck,
  ShieldCheck,
  Certificate,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr';

export function ServiceStrip() {
  const benefits = [
    {
      icon: <Truck size={24} weight="fill" />,
      title: 'Fast Delivery',
      desc: 'Safe & tracked shipping across all cities in Pakistan',
    },
    {
      icon: <ShieldCheck size={24} weight="fill" />,
      title: 'Genuine Products',
      desc: '100% authentic, sealed factory-direct stock',
    },
    {
      icon: <Certificate size={24} weight="fill" />,
      title: 'Official Warranty',
      desc: 'Verified coverage and dedicated customer support',
    },
    {
      icon: <WhatsappLogo size={24} weight="fill" />,
      title: 'WhatsApp Support',
      desc: 'Instant assistance from gaming specialists',
    },
  ];

  return (
    <section className="section-clean section-clean--benefits" id="why-naveed-games">
      <div className="container">
        <div className="benefits-clean-grid">
          {benefits.map((b) => (
            <div key={b.title} className="benefit-clean-card">
              <div className="benefit-clean-card__icon-wrap">
                {b.icon}
              </div>
              <div className="benefit-clean-card__content">
                <h3 className="benefit-clean-card__title">{b.title}</h3>
                <p className="benefit-clean-card__desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
