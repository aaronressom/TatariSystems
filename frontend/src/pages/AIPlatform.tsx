import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

const AIPlatform = () => (
  <div className="min-h-screen bg-white pt-navbar">
    <Navbar />
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} viewport={{ once: true }} className="mb-16">
        <h1 className="text-4xl font-extrabold text-secondary-900 mb-6">Supercharge Your AI Startup with Reliable, Affordable Compute</h1>
        <p className="text-lg text-secondary-700 mb-8">Tatari gives you the power and flexibility to scale your models—without the enterprise price tag.</p>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-2xl font-bold text-primary-600 mb-6">The Challenge for AI Startups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-primary-50 rounded-lg p-6 shadow text-center">
            <div className="text-3xl font-extrabold text-primary-600 mb-2">70,000</div>
            <div className="text-secondary-700">AI startups are being priced out of AWS/GCP compute.</div>
          </div>
          <div className="bg-primary-50 rounded-lg p-6 shadow text-center">
            <div className="text-3xl font-extrabold text-primary-600 mb-2">4.4x</div>
            <div className="text-secondary-700">Demand for compute is exploding, but affordable, reliable options are scarce.</div>
          </div>
          <div className="bg-primary-50 rounded-lg p-6 shadow text-center">
            <div className="text-3xl font-extrabold text-primary-600 mb-2">26x</div>
            <div className="text-secondary-700">Global AI compute demand is projected to grow 26× by 2030—will your startup keep up?</div>
          </div>
        </div>
        <div className="bg-secondary-50 rounded-lg p-6">
          <p className="text-secondary-700 mb-2">AWS H200 = $10.6/hr vs. Vast.ai = $2.4/hr</p>
          <p className="text-secondary-700 mb-2">But cheap compute is unreliable and frequently fails—leaving your team stuck.</p>
          <p className="text-secondary-700 font-semibold">Tatari is built for founders who need to train and deploy faster—without breaking the bank.</p>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-2xl font-bold text-primary-600 mb-6">How Tatari Empowers AI Startups</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50 rounded-lg p-6 shadow">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Idle GPUs</h3>
            <p className="text-secondary-700">~50% of GPUs are idle globally at any given time. On-premise AI clusters often run at 15% utilization, leaving costly accelerators underused.</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6 shadow">
            <h3 className="text-xl font-bold text-green-600 mb-4">Carbon Aware Scheduling</h3>
            <p className="text-secondary-700">Intelligent workload placement can reduce emissions by up to 75%. Choosing low-carbon regions and off-peak renewable hours yields significant savings.</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 shadow">
            <h3 className="text-xl font-bold text-purple-600 mb-4">Aggregation</h3>
            <p className="text-secondary-700">New GPU cloud marketplaces are emerging to monetize idle GPUs. Tatari brokering this surplus unlocks significant capacity with proper SLAs.</p>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-2xl font-bold text-primary-600 mb-6">Why AI Startups Choose Tatari</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg p-6 shadow border">
            <h3 className="text-xl font-bold text-secondary-900 mb-4">1. Sourcing</h3>
            <p className="text-secondary-700">Aggregates trusted GPU vendors across marketplaces and private clouds.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow border">
            <h3 className="text-xl font-bold text-secondary-900 mb-4">2. Reliability</h3>
            <p className="text-secondary-700">Guarantees uptime via SLAs, monitors performance, and places workloads by region.</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow border">
            <h3 className="text-xl font-bold text-secondary-900 mb-4">3. Interface</h3>
            <p className="text-secondary-700">Launches with a white-labeled console UI and roadmap to green infrastructure.</p>
          </div>
        </div>
        <div className="bg-primary-50 rounded-lg p-6">
          <ul className="space-y-2 text-secondary-700">
            <li>• Partner SLAs will enforce 99.9% uptime (~4.4 hrs downtime/year)</li>
            <li>• Tatari will guarantee &lt;1 min session startup latency and 95%+ success rate</li>
            <li>• User → Tatari Broker → Region-aware infra → SLA Monitor</li>
          </ul>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-2xl font-bold text-primary-600 mb-6">Simple, Transparent Pricing for Startups</h2>
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Wholesale GPU</span>
              <span className="text-secondary-600">$1.00</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Infrastructure & Ops</span>
              <span className="text-secondary-600">$0.30</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Support & SLA</span>
              <span className="text-secondary-600">$0.10</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Payment Processing Fees</span>
              <span className="text-secondary-600">$0.10</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg">
                <span className="font-semibold">Total Cost</span>
                <span className="text-primary-600 font-bold">$1.50</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg mt-2">
                <span className="font-semibold">+ 20% Markup</span>
                <span className="text-secondary-600">$0.30</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg mt-2">
                <span className="font-semibold">Final Price to User</span>
                <span className="text-green-600 font-bold text-xl">$1.80</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-2xl font-bold text-primary-600 mb-6">See How Tatari Compares</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow overflow-hidden">
            <thead className="bg-secondary-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Provider</th>
                <th className="px-6 py-3 text-center">Price (H100/hr)</th>
                <th className="px-6 py-3 text-center">SLA/Uptime</th>
                <th className="px-6 py-3 text-center">Green Energy</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-6 py-3 font-semibold text-primary-600">Tatari</td>
                <td className="px-6 py-3 text-center">$1.80</td>
                <td className="px-6 py-3 text-center">99.9%</td>
                <td className="px-6 py-3 text-center">100% hydroelectric</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-3 font-semibold">Vast.ai</td>
                <td className="px-6 py-3 text-center">$0.89</td>
                <td className="px-6 py-3 text-center">No centralized SLA</td>
                <td className="px-6 py-3 text-center">Host-dependent</td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-3 font-semibold">Coreweave</td>
                <td className="px-6 py-3 text-center">$2.25</td>
                <td className="px-6 py-3 text-center">99.9%</td>
                <td className="px-6 py-3 text-center">Partial clean sourcing</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-3 font-semibold">AWS/GCP</td>
                <td className="px-6 py-3 text-center">$3.06</td>
                <td className="px-6 py-3 text-center">99.9%</td>
                <td className="px-6 py-3 text-center">Partial REC-backed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.5 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-2xl font-bold text-primary-600 mb-6">Built for AI Innovators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-lg p-6 shadow">
            <h3 className="text-xl font-bold text-blue-600 mb-4">AI/ML Startups</h3>
            <ul className="space-y-2 text-secondary-700">
              <li>• Need scalable, cost-effective inference & training compute</li>
              <li>• Prefer flexible, low-commitment infrastructure</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-6 shadow">
            <h3 className="text-xl font-bold text-green-600 mb-4">Academic Labs & Research</h3>
            <ul className="space-y-2 text-secondary-700">
              <li>• Require access to powerful GPUs for experimentation</li>
              <li>• Value latency and geographic proximity</li>
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.6 }} viewport={{ once: true }} className="mb-16">
        <h2 className="text-2xl font-bold text-primary-600 mb-6">Ready to Scale Your AI Startup?</h2>
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-8 shadow">
          <ul className="space-y-4 text-secondary-700 mb-6">
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              <span>Can we deliver low-cost compute without sacrificing uptime or support? ($3.2B of idle/unutilized global GPU capacity)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              <span>Is there a way to aggregate underutilized GPU capacity and package it with SLAs?</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 font-bold mr-2">•</span>
              <span>Can we build a global-first infrastructure that's also green and regulation-friendly?</span>
            </li>
          </ul>
          <p className="text-lg font-semibold text-secondary-900 mt-6">Get started with Tatari and unlock the compute your team needs to innovate and grow.</p>
        </div>
      </motion.section>
    </div>
  </div>
)

export default AIPlatform 