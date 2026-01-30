import { portfolioCompanies } from './portfolioCompanies';
import { earlyStageCompanies } from './earlyStageCompanies';
import { dealStageCompanies } from './dealStageCompanies';
import { alerts } from './alerts';

// Mock API that mimics base44.entities.X.list() / .filter() / .get() / .update()
const createEntity = (data) => ({
  list: (sortField, limit) => {
    let result = [...data];
    if (sortField && sortField.startsWith('-')) {
      const field = sortField.slice(1);
      result.sort((a, b) => new Date(b[field] || 0) - new Date(a[field] || 0));
    }
    if (limit) result = result.slice(0, limit);
    return Promise.resolve(result);
  },
  filter: (criteria) => {
    const result = data.filter(item => {
      return Object.entries(criteria).every(([key, value]) => {
        // Loose comparison to handle string/number mismatch (e.g. URL params)
        return String(item[key]) === String(value);
      });
    });
    return Promise.resolve(result);
  },
  get: (id) => {
    return Promise.resolve(data.find(item => item.id === id));
  },
  update: (id, updates) => {
    const item = data.find(item => String(item.id) === String(id));
    if (item) Object.assign(item, updates);
    return Promise.resolve(item);
  }
});

// Mock LLM integration
const mockLLM = {
  InvokeLLM: async ({ prompt }) => {
    return "AI analysis is available in the full version. This is a demo deployment with sample data.";
  }
};

export const base44 = {
  entities: {
    PortfolioCompany: createEntity(portfolioCompanies),
    EarlyStageCompany: createEntity(earlyStageCompanies),
    DealStageCompany: createEntity(dealStageCompanies),
    Alert: createEntity(alerts),
  },
  integrations: {
    Core: mockLLM
  },
  auth: {
    me: () => Promise.resolve({ name: "Nichole Wischoff", email: "nichole@wischoff.vc" }),
    logout: () => {},
    redirectToLogin: () => {}
  }
};
