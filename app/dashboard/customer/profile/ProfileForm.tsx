'use client';

import { useState, useTransition } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const supabase = createSupabaseBrowserClient();

// Full list of Nigerian states + FCT (alphabetical)
const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT - Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

type ProfileData = {
  full_name: string;
  phone: string;
  avatar_url: string | null;
  state: string;
  lga: string;
  address: string;
};

export default function ProfileForm({
  initialData,
  userId,
  email,
}: {
  initialData: ProfileData;
  userId: string;
  email: string;
}) {
  const [formData, setFormData] = useState<ProfileData>(initialData);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.avatar_url);

  // Edit mode toggles (one per major section)
  const [editMode, setEditMode] = useState({
    basic: false,      // name, phone, location
    photo: false,
  });

  // Password change fields
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Handle profile field changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Avatar preview
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setEditMode(prev => ({ ...prev, photo: true })); // auto-enable if uploading
    }
  };

  // Password strength checker (simple)
  const checkPasswordStrength = (pass: string) => {
    if (pass.length < 8) return 'Weak – at least 8 characters';
    if (!/[A-Z]/.test(pass) || !/[a-z]/.test(pass) || !/[0-9]/.test(pass)) return 'Medium – add uppercase, lowercase, number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) return 'Strong – consider adding special character';
    return 'Strong';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (name === 'newPassword') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  // Submit profile updates
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    startTransition(async () => {
      let newAvatarUrl = formData.avatar_url;

      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop() || 'jpg';
        const filePath = `${userId}/profile.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, { upsert: true });

        if (uploadError) {
          setStatus({ message: `Image upload failed: ${uploadError.message}`, type: 'error' });
          return;
        }

        const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
        newAvatarUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name.trim(),
          phone: formData.phone.trim() || null,
          address: formData.address.trim() || null,
          state: formData.state.trim() || null,
          lga: formData.lga.trim() || null,
          avatar_url: newAvatarUrl,
        })
        .eq('id', userId);

      if (error) {
        setStatus({ message: `Update failed: ${error.message}`, type: 'error' });
      } else {
        setStatus({ message: 'Profile updated!', type: 'success' });
        setEditMode({ basic: false, photo: false }); // exit edit mode
      }
    });
  };

  // Submit password change
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordMessage('Password must be at least 8 characters');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: passwordData.newPassword,
    });

    if (error) {
      setPasswordMessage(`Error: ${error.message}`);
    } else {
      setPasswordMessage('Password updated successfully! Please log in again.');
      setPasswordData({ newPassword: '', confirmPassword: '' });
      // Optional: sign out after password change
      // await supabase.auth.signOut(); window.location.href = '/login';
    }
  };

  const toggleEdit = (section: 'basic' | 'photo') => {
    setEditMode(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-10">
      {/* Profile Form */}
      <form onSubmit={handleProfileSubmit}>
        {/* Profile Photo Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <button
              type="button"
              onClick={() => toggleEdit('photo')}
              className="text-orange-600 hover:text-orange-800 text-sm font-medium"
            >
              {editMode.photo ? 'Cancel' : 'Edit Photo'}
            </button>
          </div>

          <div className="flex items-center gap-5">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="h-20 w-20 rounded-full object-cover border-2 border-orange-400" />
            ) : (
              <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-2xl font-bold">
                {formData.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}

            {editMode.photo && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
            )}
          </div>
        </div>

        {/* Basic Info Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            <button
              type="button"
              onClick={() => toggleEdit('basic')}
              className="text-orange-600 hover:text-orange-800 text-sm font-medium"
            >
              {editMode.basic ? 'Cancel' : 'Edit Details'}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleProfileChange}
                disabled={!editMode.basic}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${!editMode.basic ? 'bg-gray-50' : 'focus:border-orange-500 focus:ring-orange-500'}`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleProfileChange}
                disabled={!editMode.basic}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${!editMode.basic ? 'bg-gray-50' : 'focus:border-orange-500 focus:ring-orange-500'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                value={email}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleProfileChange}
                disabled={!editMode.basic}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${!editMode.basic ? 'bg-gray-50' : 'focus:border-orange-500 focus:ring-orange-500'}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleProfileChange}
                disabled={!editMode.basic}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${!editMode.basic ? 'bg-gray-50' : 'focus:border-orange-500 focus:ring-orange-500'}`}
              >
                <option value="">Select State</option>
                {NIGERIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">LGA / Area</label>
              <input
                name="lga"
                value={formData.lga}
                onChange={handleProfileChange}
                disabled={!editMode.basic}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm ${!editMode.basic ? 'bg-gray-50' : 'focus:border-orange-500 focus:ring-orange-500'}`}
              />
            </div>
          </div>

          {editMode.basic || editMode.photo ? (
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex justify-center rounded-md bg-orange-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50"
              >
                {isPending ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </div>
          ) : null}
        </div>
      </form>

      {status && (
        <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {status.message}
        </p>
      )}

      {/* Password Change Section */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
              required
              minLength={8}
            />
            {passwordData.newPassword && (
              <p className={`mt-1 text-xs ${passwordStrength.includes('Strong') ? 'text-green-600' : passwordStrength.includes('Medium') ? 'text-yellow-600' : 'text-red-600'}`}>
                {passwordStrength}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-orange-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-orange-700"
          >
            Update Password
          </button>

          {passwordMessage && (
            <p className={`text-sm ${passwordMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {passwordMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}