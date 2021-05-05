import { useQuery } from "react-query";

import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('users', {
    params: {
      page,
    }
  })
  
  const totalCount = Number(headers['x-total-count']);

  const users = data.users.map(user => {
    console.log(user);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      // createdAt: Intl.DateTimeFormat('pt-BR', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(user.createdAt)),
      createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      // createdAt: user.created_at,
    }
  });

  return {
    totalCount,
    users,
  };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 min
  })
}