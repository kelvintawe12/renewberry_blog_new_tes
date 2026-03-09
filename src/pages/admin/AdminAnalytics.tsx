import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend } from
'recharts';
const viewData = [
{
  name: 'Jan',
  views: 40000,
  unique: 24000
},
{
  name: 'Feb',
  views: 30000,
  unique: 13980
},
{
  name: 'Mar',
  views: 20000,
  unique: 9800
},
{
  name: 'Apr',
  views: 27800,
  unique: 39080
},
{
  name: 'May',
  views: 18900,
  unique: 48000
},
{
  name: 'Jun',
  views: 23900,
  unique: 38000
},
{
  name: 'Jul',
  views: 34900,
  unique: 43000
}];

const categoryData = [
{
  name: 'Education',
  value: 400
},
{
  name: 'Entertainment',
  value: 300
},
{
  name: 'Tech',
  value: 300
},
{
  name: 'Business',
  value: 200
}];

const COLORS = ['#0891B2', '#134E4A', '#8B5CF6', '#F59E0B'];
export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Platform Analytics
        </h1>
        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-primary focus:border-primary outline-none bg-white">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Area Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Traffic Overview
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={viewData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0
                }}>

                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891B2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0891B2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB" />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }} />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }}
                  tickFormatter={(val) => `${val / 1000}k`} />

                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />

                <Legend iconType="circle" />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Total Views"
                  stroke="#0891B2"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorViews)" />

                <Area
                  type="monotone"
                  dataKey="unique"
                  name="Unique Visitors"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fill="none" />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            Content Distribution
          </h3>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none">

                  {categoryData.map((entry, index) =>
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]} />

                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />

                <Legend
                  iconType="circle"
                  layout="vertical"
                  verticalAlign="middle"
                  align="right" />

              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-6">
            User Engagement (Likes & Comments)
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={viewData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0
                }}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB" />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }} />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: '#6B7280',
                    fontSize: 12
                  }} />

                <Tooltip
                  cursor={{
                    fill: '#F3F4F6'
                  }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />

                <Legend iconType="circle" />
                <Bar
                  dataKey="views"
                  name="Likes"
                  fill="#134E4A"
                  radius={[4, 4, 0, 0]}
                  barSize={20} />

                <Bar
                  dataKey="unique"
                  name="Comments"
                  fill="#4ADE80"
                  radius={[4, 4, 0, 0]}
                  barSize={20} />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>);

}