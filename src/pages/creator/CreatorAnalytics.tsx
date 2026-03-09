import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
const viewData = [
{
  name: 'Mon',
  views: 4000,
  watchTime: 2400
},
{
  name: 'Tue',
  views: 3000,
  watchTime: 1398
},
{
  name: 'Wed',
  views: 2000,
  watchTime: 9800
},
{
  name: 'Thu',
  views: 2780,
  watchTime: 3908
},
{
  name: 'Fri',
  views: 1890,
  watchTime: 4800
},
{
  name: 'Sat',
  views: 2390,
  watchTime: 3800
},
{
  name: 'Sun',
  views: 3490,
  watchTime: 4300
}];

export function CreatorAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Analytics
        </h1>
        <select className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-primary focus:border-primary outline-none bg-white shadow-sm">
          <option>Last 7 Days</option>
          <option>Last 28 Days</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Views</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">19,550</h3>
          <p className="text-sm text-green-500 mt-2 font-medium">
            +12% vs previous 7 days
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">
            Watch Time (hours)
          </p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">842.5</h3>
          <p className="text-sm text-green-500 mt-2 font-medium">
            +5% vs previous 7 days
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Subscribers</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">+124</h3>
          <p className="text-sm text-red-500 mt-2 font-medium">
            -2% vs previous 7 days
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Views Over Time
        </h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={viewData}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0
              }}>

              <defs>
                <linearGradient
                  id="colorViewsCreator"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1">

                  <stop offset="5%" stopColor="#0891B2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0891B2" stopOpacity={0} />
                </linearGradient>
              </defs>
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
                }} />

              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                }} />

              <Area
                type="monotone"
                dataKey="views"
                stroke="#0891B2"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorViewsCreator)" />

            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Top Performing Videos
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) =>
            <div
              key={i}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">

                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 bg-gray-200 rounded-md"></div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">
                      Awesome Video Title {i}
                    </p>
                    <p className="text-xs text-gray-500">
                      Published 2 days ago
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-gray-900">
                    {(5000 - i * 1000).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Views</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Audience Demographics
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                {
                  name: '18-24',
                  val: 30
                },
                {
                  name: '25-34',
                  val: 45
                },
                {
                  name: '35-44',
                  val: 15
                },
                {
                  name: '45+',
                  val: 10
                }]
                }
                layout="vertical"
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0
                }}>

                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#4B5563',
                    fontSize: 12
                  }}
                  width={50} />

                <Tooltip
                  cursor={{
                    fill: 'transparent'
                  }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />

                <Bar
                  dataKey="val"
                  fill="#134E4A"
                  radius={[0, 4, 4, 0]}
                  barSize={24} />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>);

}