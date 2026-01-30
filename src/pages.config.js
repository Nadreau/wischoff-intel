import Alerts from './pages/Alerts';
import CompanyDetail from './pages/CompanyDetail';
import Dashboard from './pages/Dashboard';
import DealStage from './pages/DealStage';
import DealStageDetail from './pages/DealStageDetail';
import EarlyStage from './pages/EarlyStage';
import EarlyStageDetail from './pages/EarlyStageDetail';
import Integrations from './pages/Integrations';
import NewsDetail from './pages/NewsDetail';
import PortfolioList from './pages/PortfolioList';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Alerts": Alerts,
    "CompanyDetail": CompanyDetail,
    "Dashboard": Dashboard,
    "DealStage": DealStage,
    "DealStageDetail": DealStageDetail,
    "EarlyStage": EarlyStage,
    "EarlyStageDetail": EarlyStageDetail,
    "Integrations": Integrations,
    "NewsDetail": NewsDetail,
    "PortfolioList": PortfolioList,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};