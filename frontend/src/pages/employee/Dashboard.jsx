import React, { useState } from 'react';
import { Search, X, Plane } from 'lucide-react';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmp, setSelectedEmp] = useState(null);

  const employees = [
    { id: 'OIJODO20220001', name: 'Alex Johnson', role: 'Software Engineer', dept: 'Engineering', status: 'present', email: 'alex@dayflow.com', phone: '+1 555-0192' },
    { id: 'OISAJE20230002', name: 'Sarah Jenkins', role: 'Product Manager', dept: 'Product', status: 'leave', email: 'sarah@dayflow.com', phone: '+1 555-0144' },
    { id: 'OIMICH20210003', name: 'Michael Chen', role: 'UX Designer', dept: 'Design', status: 'absent', email: 'michael@dayflow.com', phone: '+1 555-0188' },
    { id: 'OIDARO20240004', name: 'David Ross', role: 'Sales Executive', dept: 'Sales', status: 'present', email: 'david@dayflow.com', phone: '+1 555-0173' },
  ];

  const filtered = employees.filter(
    (e) => e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Employees Directory</h1>
          <p className="text-xs text-slate-500">View team members and real-time attendance status.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            onClick={() => setSelectedEmp(emp)}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md cursor-pointer transition-all relative"
          >
            <div className="absolute top-3 right-3">
              {emp.status === 'present' && <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block" title="Present"></span>}
              {emp.status === 'leave' && <Plane size={16} className="text-blue-500" title="On Leave" />}
              {emp.status === 'absent' && <span className="w-3 h-3 bg-amber-500 rounded-full inline-block" title="Absent"></span>}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold border border-slate-200">
                {emp.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">{emp.name}</h3>
                <p className="text-xs text-slate-500">{emp.role}</p>
                <span className="inline-block mt-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  {emp.dept}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEmp && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-sm font-bold text-slate-800">Employee Information (View-Only)</h2>
              <button onClick={() => setSelectedEmp(null)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                  {selectedEmp.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedEmp.name}</h3>
                  <p className="text-slate-500">{selectedEmp.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Login ID: {selectedEmp.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Department</span>
                  <span className="font-semibold">{selectedEmp.dept}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Email</span>
                  <span className="font-semibold">{selectedEmp.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Phone</span>
                  <span className="font-semibold">{selectedEmp.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Status</span>
                  <span className="capitalize font-semibold">{selectedEmp.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}