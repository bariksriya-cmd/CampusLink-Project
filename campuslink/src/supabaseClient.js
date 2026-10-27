import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://beltyhcfatlpfrgnvcse.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlbHR5aGNmYXRscGZyZ252Y3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2MDkyOTcsImV4cCI6MjEwNzE4NTI5N30.qrYAOMpwcmFQbEjBQoEkYFW24xgRE-VFBJb5abpyfOQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);