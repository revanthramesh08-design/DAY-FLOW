import React, { useState } from 'react';
import { Plus, Upload, X } from 'lucide-react';

export default function Leave() {
  const [showModal, setShowModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Paid time off');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase">Paid time Off</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">24 Days Available</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase">Sick time off</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">07 Days Available</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={16} /> NEW Time Off Request
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-sm font-bold text-slate-800">Time off Type Request</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            
            <form className="p-5 space-y-4 text-xs" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Time off Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Paid time off">Paid time off</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Unpaid Leaves">Unpaid Leaves</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Validity Period (From)</label>
                  <input type="date" className="w-full p-2 border border-slate-200 rounded-lg" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">To</label>
                  <input type="date" className="w-full p-2 border border-slate-200 rounded-lg" />
                </div>
              </div>

              {leaveType === 'Sick Leave' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Attachment (For sick leave certificate)</label>
                  <label className="border-2 border-dashed border-slate-200 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer hover:border-blue-400 text-slate-500">
                    <Upload size={16} />
                    <span>Upload Certificate</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}