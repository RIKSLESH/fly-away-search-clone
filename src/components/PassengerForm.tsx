
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const passengerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  documentType: z.enum(["passport", "identity_card", "driving_license"]),
  documentNumber: z.string().min(4, { message: "Document number must be at least 4 characters" }),
});

export type PassengerFormValues = z.infer<typeof passengerSchema>;

interface PassengerFormProps {
  onSubmit: (data: PassengerFormValues) => void;
  defaultValues?: Partial<PassengerFormValues>;
  id?: string;
}

const PassengerForm: React.FC<PassengerFormProps> = ({ onSubmit, defaultValues, id = 'passenger-form' }) => {
  const form = useForm<PassengerFormValues>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      gender: defaultValues?.gender || 'other',
      dateOfBirth: defaultValues?.dateOfBirth || '',
      documentType: defaultValues?.documentType || 'passport',
      documentNumber: defaultValues?.documentNumber || '',
    },
  });

  return (
    <Form {...form}>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter first name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter last name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <label htmlFor="male" className="text-sm font-medium">Male</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <label htmlFor="female" className="text-sm font-medium">Female</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <label htmlFor="other" className="text-sm font-medium">Other</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="documentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="identity_card">Identity Card</SelectItem>
                  <SelectItem value="driving_license">Driving License</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="documentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter document number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PassengerForm;
