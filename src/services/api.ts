import type { Agendamento, BookingStatus, DadosCliente, HorarioDisponivel } from '../types'

async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(
      (data as { error?: string }).error || 'Erro na requisição.',
    )
  }

  return data as T
}

export async function fetchAvailability(
  date: string,
): Promise<{ date: string; horarios: HorarioDisponivel[] }> {
  return request(`/api/availability?date=${encodeURIComponent(date)}`)
}

export async function createBooking(payload: {
  servicoId: string
  data: string
  horario: string
  cliente: DadosCliente
}): Promise<Agendamento> {
  return request('/api/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function adminLogin(password: string): Promise<void> {
  await request('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  })
}

export async function adminLogout(): Promise<void> {
  await request('/api/admin/logout', { method: 'POST' })
}

export async function checkAdminAuth(): Promise<boolean> {
  try {
    await request('/api/admin/me')
    return true
  } catch {
    return false
  }
}

export async function fetchAdminBookings(params?: {
  status?: BookingStatus
  date?: string
}): Promise<Agendamento[]> {
  const qs = new URLSearchParams()
  if (params?.status) qs.set('status', params.status)
  if (params?.date) qs.set('date', params.date)
  const query = qs.toString()
  return request(`/api/admin/bookings${query ? `?${query}` : ''}`)
}

export async function updateBookingStatus(
  id: string,
  status: 'confirmed' | 'cancelled',
): Promise<Agendamento> {
  return request(`/api/admin/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export function whatsappLink(telefone: string, nome: string): string {
  const digits = telefone.replace(/\D/g, '')
  const msg = encodeURIComponent(
    `Olá ${nome.split(' ')[0]}, aqui é da Gaby Nails! Sobre o seu agendamento...`,
  )
  return `https://wa.me/55${digits}?text=${msg}`
}
