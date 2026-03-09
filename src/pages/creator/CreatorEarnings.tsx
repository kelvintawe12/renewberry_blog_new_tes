import React from 'react';
import { DollarSignIcon, ArrowUpRightIcon, DownloadIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
const earningsData = [
{
  name: 'Aug',
  amount: 850
},
{
  name: 'Sep',
  amount: 920
},
{
  name: 'Oct',
  amount: 1100
},
{
  name: 'Nov',
  amount: 1050
},
{
  name: 'Dec',
  amount: 1240
},
{
  name: 'Jan',
  amount: 1450
}];

export function CreatorEarnings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold text-gray-900">
        Earnings & Monetization
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gradient-to-br from-secondary to-primary p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="relative z-10">
            <p className="text-teal-100 font-medium mb-2">Available Balance</p>
            <h2 className="text-5xl font-heading font-bold mb-6">$1,450.50</h2>

            <div className="flex gap-4">
              <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-teal-50 transition-colors shadow-sm">
                Withdraw Funds
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-colors backdrop-blur-sm border border-white/20">
                Payment Settings
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
          <h3 className="font-bold text-gray-900 mb-4">Next Payout</h3>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            Feb 15, 2026
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Automatic transfer to bank ending in 4242
          </p>

          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{
                width: '70%'
              }}>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-right">
            Threshold met ($100 min)
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-w-0">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Revenue History</h3>
          <button className="text-gray-500 hover:text-primary p-2 rounded-lg hover:bg-teal-50 transition-colors">
            <DownloadIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={earningsData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0
              }}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F3F4F6" />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#9CA3AF',
                  fontSize: 12
                }}
                dy={10} />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: '#9CA3AF',
                  fontSize: 12
                }}
                tickFormatter={(val) => `$${val}`} />

              <Tooltip
                cursor={{
                  fill: '#F9FAFB'
                }}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                }}
                formatter={(val) => [`$${val}`, 'Revenue']} />

              <Bar
                dataKey="amount"
                fill="#0891B2"
                radius={[6, 6, 0, 0]}
                barSize={40} />

            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">
            Recent Transactions
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3].map((i) =>
          <div
            key={i}
            className="p-4 sm:px-6 flex items-center justify-between hover:bg-gray-50 transition-colors">

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <ArrowUpRightIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    Payout to Bank Account
                  </p>
                  <p className="text-xs text-gray-500">
                    Processed on Jan 15, 2026
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  ${(1240 - i * 100).toFixed(2)}
                </p>
                <p className="text-xs text-green-600 font-medium">Completed</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}