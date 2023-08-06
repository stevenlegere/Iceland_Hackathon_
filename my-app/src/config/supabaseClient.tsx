import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? 'default-supabase-url'
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY ?? 'default-supabase-key'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;