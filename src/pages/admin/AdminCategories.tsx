import React, { useState, Component } from 'react';
import { CATEGORIES, Category } from '../../data/mockData';
import { PlusIcon, Edit2Icon, Trash2Icon } from 'lucide-react';
import * as Icons from 'lucide-react';
export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-heading font-bold text-gray-900">
          Categories
        </h1>
        <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2">
          <PlusIcon className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-w-0">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium w-16">Icon</th>
                <th className="p-4 font-medium">Name & Slug</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => {
                const IconComponent = (Icons as any)[cat.icon] || Icons.Folder;
                return (
                  <tr
                    key={cat.id}
                    className="hover:bg-gray-50 transition-colors">

                    <td className="p-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 text-primary flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{cat.name}</p>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">
                        /{cat.slug}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-md">
                      {cat.description}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2Icon className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>);

              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}