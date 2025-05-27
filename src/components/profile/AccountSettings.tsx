
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
  AlertTriangle
} from "lucide-react";

interface AccountSettingsProps {
  user: any;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    university: user.university,
    graduationYear: user.graduationYear,
    major: user.major,
    studentId: user.studentId,
    bio: '',
    location: 'Boston, MA',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save account settings logic here
    console.log('Saving account settings:', formData);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    // Password change logic here
    console.log('Changing password');
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
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="hover:border-brand-primary hover:text-brand-primary"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
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
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
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
                <div className="relative mt-1">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="graduationYear" className="text-sm font-medium">Graduation Year</Label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                  <Select
                    value={formData.graduationYear}
                    onValueChange={(value) => handleInputChange('graduationYear', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="major" className="text-sm font-medium">Major</Label>
                <Input
                  id="major"
                  value={formData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="studentId" className="text-sm font-medium">Student ID</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Bio and Location */}
          <div className="pt-4 border-t border-neutral-lighter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium h-4 w-4" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-2 pt-4 border-t border-neutral-lighter">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-brand-primary hover:bg-brand-primary/90">
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
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
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
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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