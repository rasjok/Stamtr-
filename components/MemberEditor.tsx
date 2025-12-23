
import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../types';

interface MemberEditorProps {
  member?: FamilyMember;
  allMembers: FamilyMember[];
  onSave: (member: FamilyMember) => void;
  onCancel: () => void;
}

const MemberEditor: React.FC<MemberEditorProps> = ({ member, allMembers, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<FamilyMember>>({
    name: '',
    birthDate: '',
    deathDate: '',
    bio: '',
    parentId: '',
    gender: 'other',
    photoUrl: ''
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
        setFormData({ name: '', gender: 'other' });
    }
  }, [member]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: member?.id || Math.random().toString(36).substr(2, 9),
      ...formData
    } as FamilyMember);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          required
          value={formData.name || ''}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Birth Date</label>
          <input
            type="date"
            value={formData.birthDate || ''}
            onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Death Date (Optional)</label>
          <input
            type="date"
            value={formData.deathDate || ''}
            onChange={e => setFormData({ ...formData, deathDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Parent</label>
        <select
          value={formData.parentId || ''}
          onChange={e => setFormData({ ...formData, parentId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        >
          <option value="">None (Root)</option>
          {allMembers.filter(m => m.id !== member?.id).map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Short Bio / Notes</label>
        <textarea
          rows={3}
          value={formData.bio || ''}
          onChange={e => setFormData({ ...formData, bio: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {member ? 'Update Member' : 'Add Member'}
        </button>
      </div>
    </form>
  );
};

export default MemberEditor;
