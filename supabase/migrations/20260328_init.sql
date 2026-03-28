-- Módulo 1: DB Schema für Supabase (Kirma CRM)

-- 1. Tablas base y perfiles
CREATE TYPE user_role AS ENUM ('admin', 'project_manager', 'sales_agent', 'client');

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role user_role DEFAULT 'sales_agent' NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Leads (Prospección)
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  service_interest TEXT CHECK (service_interest IN ('automatizacion', 'plataformas', 'ia', 'consulta')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposed', 'converted', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- 3. Clients (Leads convertidos)
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_id UUID REFERENCES profiles(id),
  lead_id UUID REFERENCES leads(id),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Projects (Proyectos de automatización)
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  type TEXT CHECK (type IN ('rpa', 'web_app', 'ia_agent')),
  budget DECIMAL(12,2),
  deadline DATE,
  status TEXT DEFAULT 'discovery' CHECK (status IN ('discovery', 'design', 'development', 'testing', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tasks (Gestión de trabajo)
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'testing', 'done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Políticas de perfiles
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles" ON profiles ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Políticas de leads
CREATE POLICY "Agents and Admins can manage leads" ON leads ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'sales_agent')));

-- Políticas de proyectos
CREATE POLICY "Managers and Admins can manage projects" ON projects ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'project_manager')));
CREATE POLICY "Clients can view their own projects" ON projects FOR SELECT USING (EXISTS (SELECT 1 FROM clients WHERE id = projects.client_id AND contact_id = auth.uid()));

-- Políticas de tareas
CREATE POLICY "Team can manage tasks" ON tasks ALL USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'project_manager')));
CREATE POLICY "Assigned users can view their tasks" ON tasks FOR SELECT USING (assigned_to = auth.uid());
