
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  School,
  Calendar,
  MapPin,
  Camera,
  Shield,
  Key,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload,
  Edit3,
  Save,
  AlertTriangle,
  Pencil
} from "lucide-react";
import axiosInstance from '@/api/axios';
import { setCurrentUser } from '@/state/auth';
import { toast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';

interface AccountSettingsProps {
  user: any;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    university: false,
    graduationYear: false,
    major: false,
    studentId: false,
    bio: false,
    location: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    university: user.university,
    graduationYear: user.graduationYear,
    major: user.major,
    studentId: user.studentId,
    bio: user.bio || '',
    location: user.location || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = async () => {
    // Save account settings logic here
    try {
      setIsEditing({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        university: false,
        graduationYear: false,
        major: false,
        studentId: false,
        bio: false,
        location: false,
      })
      setSaving(true);
      const response = await axiosInstance.put('/user/me', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        university: formData.university,
        graduation_year: formData.graduationYear,
        major: formData.major,
        student_id: formData.studentId,
        bio: formData.bio,
        location: formData.location,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error(response.data.message || 'Error updating profile');
      }
      const updatedUser = response.data.data;
      setFormData({
        ...updatedUser,
      })
      // dispatch(setCurrentUser({
      //   user: formData,
      //   role: 'consumer',
      // }));
      toast({
        title: "Profile updated successfully",
        description: "Your profile information has been updated.",
      });

    } catch (error) {
      toast({
        title: error.response.data?.message || error.message || "Error updating profile",
        description: error.response.data?.description || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }

  };

  const handlePasswordChange = () => {
    // Password change logic here

  };

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card className="border-neutral-lighter">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-brand-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and student details
              </CardDescription>
            </div>

          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="text-2xl font-bold">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-primary">Profile Photo</h3>
              <p className="text-sm text-neutral-medium mb-3">
                Upload a new photo to personalize your profile
              </p>
              {isEditing && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className='relative'>
              <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  firstName: e.target.value
                }))}
                disabled={!isEditing.firstName}
                className="mt-1"
              />
              <Pencil className="absolute right-2 top-1/2 transform translate-y-1/2 text-neutral-medium h-4 w-4 cursor-pointer"
                onClick={() => setIsEditing(prev => ({ ...prev, firstName: !isEditing.firstName }))}
              />
            </div>
            <div className='relative'>
              <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  lastName: e.target.value
                }))} disabled={!isEditing.lastName}
                className="mt-1"
              />
              <Pencil className="absolute right-2 top-1/2 transform translate-y-1/2 text-neutral-medium h-4 w-4 cursor-pointer"
                onClick={() => setIsEditing(prev => ({ ...prev, lastName: !isEditing.lastName }))}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))} disabled={!isEditing.email}
                  className="pl-10"
                />
                <Pencil className="absolute right-2 top-1 transform translate-y-1/2 text-neutral-medium h-4 w-4 cursor-pointer"
                onClick={() => setIsEditing(prev => ({ ...prev, email: !isEditing.email }))}
              />
              </div>
              
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))} disabled={!isEditing.phone}
                  className="pl-10"
                />
                <Pencil className="absolute right-2 top-1 transform translate-y-1/2 text-neutral-medium h-4 w-4 cursor-pointer"
                  onClick={() => setIsEditing(prev => ({ ...prev, phone: !isEditing.phone }))}
                />
              </div>
            </div>
          </div>

          {/* Student Information */}
          <div className="pt-4 border-t border-neutral-lighter">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="university" className="text-sm font-medium">University</Label>
                <div className="relative">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      university: e.target.value
                    }))} disabled={!isEditing.university}
                    className="pl-10"
                  />
                  <Pencil className="absolute right-2 top-1/2 transform translate-y-1/2 text-neutral-medium h-4 w-4 cursor-pointer"
                    onClick={() => setIsEditing(prev => ({ ...prev, university: !isEditing.university }))}
                  />
                </div>

              </div>
              <div>
                <Label htmlFor="graduationYear" className="text-sm font-medium">Expected Graduation</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                  <input
                    type="month"
                    id="graduationYear"
                    min={`${new Date().getFullYear()}-01`}
                    max={`${new Date().getFullYear() + 8}-12`}
                    pattern="\d{4}-\d{2}"
                    placeholder="YYYY-MM"
                    value={new Date(formData.graduationYear).toISOString().slice(0, 7)}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      graduationYear: e.target.value
                    }))}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className='relative'>
                <Label htmlFor="major" className="text-sm font-medium">Major</Label>
                <Input
                  id="major"
                  value={formData.major}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    major: e.target.value
                  }))}
                  disabled={!isEditing.major}
                  className="mt-1"
                />
                <Pencil className="absolute right-2 top-1/2 transform translate-y-1/2 text-neutral-medium h-4 w-4 cursor-pointer"
                  onClick={() => setIsEditing(prev => ({ ...prev, major: !isEditing.major }))}
                />
              </div>
              <div className='relative'>
                <Label htmlFor="studentId" className="text-sm font-medium">Student ID</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    studentId: e.target.value
                  }))}
                  disabled={!isEditing.studentId}
                  className="mt-1"
                />
                <Pencil className="absolute right-2 top-1/2 transform translate-y-1/2 text-neutral-medium h-4 w-4 cursor-pointer"
                  onClick={() => setIsEditing(prev => ({ ...prev, studentId: !isEditing.studentId }))}
                />
              </div>
            </div>
          </div>

          {/* Bio and Location */}
          <div className="pt-4 border-t border-neutral-lighter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className='relative'>
                <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    bio: e.target.value
                  }))}
                  disabled={!isEditing.bio}
                  placeholder="Tell us about yourself..."
                  className="mt-1 min-h-[100px]"
                />
                <Pencil className="absolute right-2 top-10 text-neutral-medium h-4 w-4 cursor-pointer"
                  onClick={() => setIsEditing(prev => ({ ...prev, bio: !isEditing.bio }))}
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      location: e.target.value
                    }))}
                    disabled={!isEditing.location}
                    className="pl-10"
                  />
                  <Pencil className="absolute right-2 top-1 transform translate-y-1/2 text-neutral-medium h-4 w-4 cursor-pointer"
                    onClick={() => setIsEditing(prev => ({ ...prev, location: !isEditing.location }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2 pt-4 border-t border-neutral-lighter">
              <Button variant="outline" onClick={() => setIsEditing({
                firstName: false,
                lastName: false,
                email: false,
                phone: false,
                university: false,
                graduationYear: false,
                major: false,
                studentId: false,
                bio: false,
                location: false,
              })}>
                Cancel
              </Button>
              <Button disabled={saving} onClick={handleSave} className="bg-brand-primary hover:bg-brand-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-neutral-lighter">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Manage your password and security preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="currentPassword" className="text-sm font-medium">Current Password</Label>
              <div className="relative mt-1">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    currentPassword: e.target.value
                  }))}
                  className="pl-10 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  newPassword: e.target.value
                }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  confirmPassword: e.target.value
                }))}
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={handlePasswordChange} className="bg-brand-primary hover:bg-brand-primary/90 text-white">
            <Key className="h-4 w-4 mr-2" />
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="border-neutral-lighter">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-brand-primary" />
            Data Management
          </CardTitle>
          <CardDescription>
            Export or delete your account data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-neutral-lighter rounded-lg">
            <div>
              <h3 className="font-medium text-text-primary">Export Data</h3>
              <p className="text-sm text-neutral-medium">Request a copy of your data</p>
            </div>
            <Button variant="outline" className="hover:border-brand-primary hover:text-brand-primary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
            <div>
              <h3 className="font-medium text-destructive flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Delete Account
              </h3>
              <p className="text-sm text-neutral-medium">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};