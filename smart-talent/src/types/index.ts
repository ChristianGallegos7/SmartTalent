export type Role = 'empresa' | 'empleado'
export type JobType = 'full-time' | 'part-time' | 'remote' | 'hybrid'
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected'

export interface CVExtractedData {
  skills: string[]
  education: string[]
  languages: string[]
  experienceYears?: number
  summary: string
}

export interface CVData {
  fileName: string
  fileSize: number
  base64: string
  uploadedAt: string
  extractedData?: CVExtractedData
}

export interface BaseUser {
  id: string
  email: string
  password: string
  createdAt: string
}

export interface EmpresaUser extends BaseUser {
  role: 'empresa'
  companyName: string
}

export interface EmpleadoUser extends BaseUser {
  role: 'empleado'
  name: string
  phone?: string
  cv?: CVData
}

export type AppUser = EmpresaUser | EmpleadoUser

export type RegisterInput =
  | { role: 'empresa'; email: string; password: string; companyName: string }
  | { role: 'empleado'; email: string; password: string; name: string }

export interface Vacancy {
  id: string
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
  salary: string
  type: JobType
  createdAt: string
}

export interface Application {
  id: string
  vacancyId: string
  applicantName: string
  email: string
  phone: string
  coverLetter: string
  cvFileName?: string
  cvBase64?: string
  cvExtractedData?: CVExtractedData
  appliedAt: string
  status: ApplicationStatus
}
