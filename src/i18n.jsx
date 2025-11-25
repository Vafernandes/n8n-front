import { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  pt: {
    hero: {
      badge: 'Agente Mandacaru',
      title: 'O especialista financeiro que te ajuda a organizar sua vida financeira.',
      description:
        'Registre seus gastos e solicite relatórios com seu assiste, ele irá te ajudar a identificar os maiores gastos e como está suas movimentações financeiras.',
      liveStatus: 'Ativo 24/7',
      liveDescriptor: 'Seu assistente financeiro',
    },
    cta: {
      primary: 'Falar com o agente',
      secondary: 'Iniciar um chat no WhatsApp',
      whatsappMessage: 'Olá! Quero ativar o agente financeiro Mandacaru.',
    },
    playbook: {
      label: 'Como funciona?',
      title: 'Criado para ajudar pessoas comuns a analisar seus gastos com clareza e identificar onde poderiam economizar.',
      description:
        'O Agente Mandacaru consulta suas informações de despesas e consegue responder de forma clara onde seus gastos estão mais localizados.',
      bullets: [
        'Cadastre uma compra, seja ela por PIX ou cartões, botões.',
        'Solicite relatórios sobre seus gastos.',
        'Tenha uma visão geral das suas movimentações para conseguir economizar mais dinheiro.',
      ],
      dashboardTitle: 'Painel Momentum',
      dashboardDescription: 'Sinais principais atualizados a cada 15 minutos.',
    },
    getStarted: {
      label: 'Comece agora',
      title: 'Leve cada conversa com o cliente para o WhatsApp em um clique.',
      description:
        'Compartilhe sua planilha de cobranças ou conecte o ERP existente. Configuramos a base de conhecimento, os fluxos de pagamento e as regras de fallback, e enviamos um link pronto para lançamento com a sua marca.',
    },
    footer: '© {{year}} Mandacaru. Inteligência financeira automatizada para WhatsApp.',
    languageSwitcher: {
      label: 'Idioma',
      options: {
        pt: 'PT',
        en: 'EN',
      },
    },
    features: [
      {
        title: 'Respostas instantâneas',
        description:
          'Ao interagir com o agente, ele irá responder de forma rápida e independente do horário',
      },
      {
        title: 'Lembretes acionáveis',
        description:
          'Uma nova feature, ele irá lembrar de um gasto fixo ou conta futura que você tenha cadastrado',
      },
      {
        title: 'Segurança',
        description:
          'A conversa com seu agente é exclusiva, então fique tranquilo(a) que seus dados estão seguros',
      },
    ],
  },
  en: {
    hero: {
      badge: 'Mandacaru Agent',
      title: 'The financial expert that helps you organize your financial life.',
      description:
        'Log your expenses and request reports with your assistant; it will help you pinpoint your biggest costs and understand all of your financial movements.',
      liveStatus: 'Active 24/7',
      liveDescriptor: 'Your financial assistant',
      tagline: 'Launch in less than 48 hours · No engineers required',
    },
    cta: {
      primary: 'Talk to the agent',
      secondary: 'Start a WhatsApp chat',
      whatsappMessage: 'Hi! I want to activate the Mandacaru financial agent.',
    },
    playbook: {
      label: 'How does it work?',
      title: 'Built to help everyday people analyze their spending clearly and see where they could save.',
      description:
        'The Mandacaru Agent checks your expense information and clearly answers where your spending is most concentrated.',
      bullets: [
        'Register a purchase, whether it is via PIX or cards, with quick buttons.',
        'Request reports about your spending.',
        'Get an overview of your transactions so you can save more money.',
      ],
      dashboardTitle: 'Momentum Panel',
      dashboardDescription: 'Key signals updated every 15 minutes.',
    },
    getStarted: {
      label: 'Start now',
      title: 'Take every customer conversation to WhatsApp in one click.',
      description:
        'Share your billing spreadsheet or connect your existing ERP. We configure the knowledge base, payment flows, and fallback rules, and send you a ready-to-launch link with your branding.',
    },
    footer: '© {{year}} Mandacaru. Automated financial intelligence for WhatsApp.',
    languageSwitcher: {
      label: 'Language',
      options: {
        pt: 'PT',
        en: 'EN',
      },
    },
    features: [
      {
        title: 'Instant responses',
        description: 'When you interact with the agent, it replies quickly at any time of day.',
      },
      {
        title: 'Actionable reminders',
        description: 'A new feature: it reminds you about any fixed expense or upcoming bill you registered.',
      },
      {
        title: 'Security',
        description: 'Your conversation with the agent is private, so your data stays safe.',
      },
    ],
    stats: [
      { label: 'Response time', value: '5s avg.' },
      { label: 'Invoices processed', value: '18k+/month' },
      { label: 'Customer satisfaction', value: '97% CSAT' },
    ],
  },
};

const I18nContext = createContext({
  language: 'pt',
  changeLanguage: () => {},
  t: (path) => path,
});

const resolvePath = (language, path) => {
  const segments = path.split('.');
  return segments.reduce((acc, segment) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, segment)) {
      return acc[segment];
    }
    return undefined;
  }, translations[language]);
};

const applyVariables = (value, variables) => {
  if (!variables || typeof value !== 'string') {
    return value;
  }

  return Object.keys(variables).reduce((acc, key) => {
    const token = `{{${key}}}`;
    return acc.split(token).join(String(variables[key]));
  }, value);
};

const createTranslator = (language) => (path, options = {}) => {
  const resolvedValue = resolvePath(language, path);
  if (resolvedValue === undefined) {
    return path;
  }

  if (options.returnObjects) {
    return resolvedValue;
  }

  if (typeof resolvedValue === 'string') {
    return applyVariables(resolvedValue, options.variables);
  }

  return resolvedValue;
};

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState('pt');

  const translator = useMemo(() => createTranslator(language), [language]);

  const value = useMemo(
    () => ({
      language,
      changeLanguage: (nextLanguage) => {
        if (translations[nextLanguage]) {
          setLanguage(nextLanguage);
        }
      },
      t: (path, options) => translator(path, options),
    }),
    [language, translator],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used inside an I18nProvider');
  }
  return context;
}
