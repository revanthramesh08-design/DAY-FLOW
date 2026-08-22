import React from 'react';
import { DollarSign, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function Payroll() {
  const payslips = [
    { id: 'PAY-2026-07', month: 'July 2026', gross: '$5,000.00', deductions: '$850.00', net: '$4,150.00', status: 'Paid' },
    { id: 'PAY-2026-06', month: 'June 2026', gross: '$5,000.00', deductions: '$850.00', net: '$4,150.00', status: 'Paid' },
    { id: 'PAY-2026-05', month: 'May 2026', gross: '$5,000.00', deductions: '$850.00', net: '$4,150.00', status: 'Paid' },
    { id: 'PAY-2026-04', month: 'April 2026', gross: '$4,800.00', deductions: '$800.00', net: '$4,000.00', status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Payroll & Payslips</h1>
          <p className="text-sm text-slate-500 mt-1">View your monthly salary structure and download official pay stubs.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors">
          <Download size={16} />
          <span>Download Latest Payslip</span>
        </button>
      </div>

      {/* Salary Overview & Itemized Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Net Pay Card */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Net Salary</span>
            <h2 className="text-4xl font-bold mt-2">$4,150.00</h2>
            <p className="text-xs text-slate-400 mt-1">Disbursed on July 31, 2026</p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Gross Pay</span>
              <span className="font-semibold">$5,000.00</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span>Total Deductions</span>
              <span className="font-semibold text-rose-400">-$850.00</span>
            </div>
          </div>
        </div>

        {/* Itemized Structure */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">Monthly Breakdown (July 2026)</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase text-slate-400">Earnings</h3>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Basic Salary</span>
                <span className="font-medium text-slate-800">$3,500.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">House Rent Allowance</span>
                <span className="font-medium text-slate-800">$1,000.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Special Allowance</span>
                <span className="font-medium text-slate-800">$500.00</span>
              </div>
            </div>

            {/* Deductions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase text-slate-400">Deductions</h3>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Income Tax (TDS)</span>
                <span className="font-medium text-slate-800">$500.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Provident Fund</span>
                <span className="font-medium text-slate-800">$250.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Health Insurance</span>
                <span className="font-medium text-slate-800">$100.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payslip History Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800">Payslip History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                <th className="p-4">Pay Period</th>
                <th className="p-4">Gross Salary</th>
                <th className="p-4">Deductions</th>
                <th className="p-4">Net Salary</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {payslips.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{item.month}</td>
                  <td className="p-4">{item.gross}</td>
                  <td className="p-4 text-rose-600">{item.deductions}</td>
                  <td className="p-4 font-bold text-slate-900">{item.net}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full inline-flex items-center gap-1">
                      <CheckCircle2 size={12} /> {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center justify-end gap-1 ml-auto">
                      <FileText size={14} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}