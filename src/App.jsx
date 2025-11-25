import { useMemo } from 'react';
import { useTranslation } from './i18n.jsx';

const languageOptions = ['pt', 'en'];

function App() {
  const { t, language, changeLanguage } = useTranslation();
  const features = t('features', { returnObjects: true }) ?? [];
  const stats = t('stats', { returnObjects: true }) ?? [];
  const playbookBullets = t('playbook.bullets', { returnObjects: true }) ?? [];
  const whatsappMessage = t('cta.whatsappMessage');

  const whatsappUrl = useMemo(() => {
    const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? '';
    const sanitized = rawNumber.replace(/[^\d]/g, '');
    if (!sanitized) {
      return '#';
    }

    const encodedMessage = encodeURIComponent(whatsappMessage);
    return `https://wa.me/${sanitized}?text=${encodedMessage}`;
  }, [whatsappMessage]);

  const footerText = t('footer', { variables: { year: new Date().getFullYear() } });

  const handleLanguageChange = (code) => {
    if (code !== language) {
      changeLanguage(code);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-[#151C2A] to-[#0E141F] text-white">
      <header className="section-container py-12 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent font-semibold">{t('hero.badge')}</p>
            <h1 className="text-3xl md:text-5xl font-bold mt-3 max-w-2xl">{t('hero.title')}</h1>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <p className="text-lg font-semibold">{t('hero.liveDescriptor')}</p>
            </div>
            <div className="flex flex-col items-end gap-2" aria-label={t('languageSwitcher.label')}>
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">{t('languageSwitcher.label')}</span>
              <div className="flex gap-2">
                {languageOptions.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleLanguageChange(code)}
                    className={`rounded-full border px-4 py-1 text-sm font-semibold transition hover:opacity-90 ${
                      language === code
                        ? 'bg-accent text-primary border-accent'
                        : 'border-white/30 text-white/70'
                    }`}
                  >
                    {t(`languageSwitcher.options.${code}`)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-lg text-white/80 max-w-2xl">{t('hero.description')}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-primary font-semibold transition hover:opacity-90"
          >
            {t('cta.primary')}
          </a>
          {/* <span className="inline-flex items-center text-white/70">{t('hero.tagline')}</span> */}
        </div>
      </header>

      <main className="section-container space-y-16 pb-20">
        <section className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl bg-white/5 p-6 backdrop-blur border border-white/10">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-white/70">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl bg-gradient-to-r from-[#1F2A3E] to-[#172033] p-8 md:p-12 border border-white/5">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-accent">{t('playbook.label')}</p>
              <h2 className="mt-4 text-3xl font-bold">{t('playbook.title')}</h2>
              <p className="mt-4 text-white/80">{t('playbook.description')}</p>
              <ul className="mt-6 space-y-3 text-white/80 list-disc list-inside">
                {playbookBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
        </section>

        <section className="rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-accent">{t('getStarted.label')}</p>
          <h2 className="mt-4 text-3xl font-bold">{t('getStarted.title')}</h2>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">{t('getStarted.description')}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-10 py-3 text-primary font-semibold transition hover:opacity-90"
          >
            {t('cta.secondary')}
          </a>
        </section>
      </main>

      <footer className="section-container pb-12 text-white/50 text-sm">
        <p>{footerText}</p>
      </footer>
    </div>
  );
}

export default App;
