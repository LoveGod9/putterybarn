// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qwtkwbbuxnaaqesfnkje.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3dGt3YmJ1eG5hYXFlc2Zua2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MzEyNzYsImV4cCI6MjA1ODEwNzI3Nn0.77HsGuwiS_CJIBNO38Mfa4LWxIJnvWq3_hLkvUmLbMs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);