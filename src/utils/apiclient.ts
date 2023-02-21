import { API_ENDPOINT } from "./constants";
import type { TEndpointResponse, TEvent } from "./schema";

export async function getEvents(): Promise<TEvent[]> {
  const response = await fetch(API_ENDPOINT);
  const data: TEndpointResponse = await response.json();

  // @ts-ignore - it must be an array or an object with field `id`.
  // if `id` exists, it must be a TEvent, right??
  return data.id ? [data] : data;
}

export async function getEvent(id: string): Promise<TEvent> {
  const response = await fetch(`${API_ENDPOINT}/${id}`);
  const data: TEndpointResponse = await response.json();
  return data as TEvent;
}
