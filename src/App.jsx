import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import Pricing from './pages/Pricing'
import UseCases from './pages/UseCases'
import About from './pages/About'
import Blog from './pages/Blog'
import DocsHome from './pages/docs/DocsHome'
import QuickStart from './pages/docs/QuickStart'
import SDKReference from './pages/docs/SDKReference'
import APIReference from './pages/docs/APIReference'
import AgentGuides from './pages/docs/AgentGuides'
import FHIRGuide from './pages/docs/FHIRGuide'
import DeploymentGuide from './pages/docs/DeploymentGuide'
import ConfigReference from './pages/docs/ConfigReference'
import Benchmarks from './pages/docs/Benchmarks'
import Playground from './pages/tools/Playground'
import FHIRBuilder from './pages/tools/FHIRBuilder'
import OutputInspector from './pages/tools/OutputInspector'
import Contributors from './pages/community/Contributors'
import Showcase from './pages/community/Showcase'
import Roadmap from './pages/community/Roadmap'
import Forum from './pages/community/Forum'
import SignUp from './pages/account/SignUp'
import Dashboard from './pages/account/Dashboard'

function App() {
    return (
        <AnimatePresence mode="wait">
            <Routes>
                <Route element={<Layout />}>
                    {/* Marketing */}
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/use-cases" element={<UseCases />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />

                    {/* Docs */}
                    <Route path="/docs" element={<DocsHome />} />
                    <Route path="/docs/quickstart" element={<QuickStart />} />
                    <Route path="/docs/sdk" element={<SDKReference />} />
                    <Route path="/docs/api" element={<APIReference />} />
                    <Route path="/docs/agents" element={<AgentGuides />} />
                    <Route path="/docs/fhir" element={<FHIRGuide />} />
                    <Route path="/docs/deployment" element={<DeploymentGuide />} />
                    <Route path="/docs/config" element={<ConfigReference />} />
                    <Route path="/docs/benchmarks" element={<Benchmarks />} />

                    {/* Tools */}
                    <Route path="/playground" element={<Playground />} />
                    <Route path="/tools/fhir-builder" element={<FHIRBuilder />} />
                    <Route path="/tools/inspector" element={<OutputInspector />} />

                    {/* Community */}
                    <Route path="/community/contributors" element={<Contributors />} />
                    <Route path="/community/showcase" element={<Showcase />} />
                    <Route path="/community/roadmap" element={<Roadmap />} />
                    <Route path="/community/forum" element={<Forum />} />

                    {/* Account */}
                    <Route path="/account/signup" element={<SignUp />} />
                    <Route path="/account/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default App
